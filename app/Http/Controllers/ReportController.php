<?php

namespace App\Http\Controllers;

use App\Models\Report;
use App\Models\Post;
use App\Models\User;
use App\Models\Notification;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ReportController extends Controller
{
    public function store(Request $request, $postId)
    {
        $request->validate([
            'reason' => 'required|string|max:255',
            'description' => 'required|string',
        ]);

        $post = Post::find($postId);
        if (!$post) {
            return response()->json(['message' => 'Post tidak ditemukan'], 404);
        }

        $userId = (string) Auth::id();

        $report = Report::create([
            'reporter_id' => $userId,
            'post_id' => (string) $postId,
            'reason' => $request->reason,
            'description' => $request->description,
        ]);

        $reporter = Auth::user();

        // Notif ke pelapor
        Notification::create([
            'user_id' => $userId,
            'title'   => 'Laporan Diterima',
            'message' => 'Laporan kamu untuk catatan "' . $post->title . '" sedang direview oleh tim kami.',
            'type'    => 'report',
            'link'    => '/note/' . $postId,
            'is_read' => false,
        ]);

        // Notif ke terlapor
        if ($post->user_id) {
            $postUserIdStr = is_array($post->user_id) ? current($post->user_id) : $post->user_id;
            Notification::create([
                'user_id' => (string) $postUserIdStr,
                'title'   => 'Peringatan: Catatan Dilaporkan',
                'message' => 'Catatan kamu "' . $post->title . '" dilaporkan karena: ' . $request->reason . '. Tim pakar/admin akan mereviewnya.',
                'type'    => 'report',
                'link'    => '/note/' . $postId,
                'is_read' => false,
            ]);
        }

        $admins = User::where('role', 'admin')->get();
        foreach ($admins as $admin) {
            Notification::create([
                'user_id' => (string) $admin->id,
                'title'   => 'Laporan Konten Baru',
                'message' => 'Ada laporan masuk dengan alasan: ' . $request->reason . '. Segera periksa di Dasbor Admin.',
                'type'    => 'report',
                'is_read' => false,
            ]);
        }


        return response()->json([
            'message' => 'Report berhasil dikirim',
            'data' => $report
        ], 201);
    }

    public function storeCommentReport(Request $request, $commentId)
    {
        $request->validate([
            'reason' => 'required|string|max:255',
            'description' => 'required|string',
        ]);

        $comment = \App\Models\Comment::find($commentId);
        if (!$comment) {
            return response()->json(['message' => 'Komentar tidak ditemukan'], 404);
        }

        $userId = (string) Auth::id();

        $report = Report::create([
            'reporter_id' => $userId,
            'comment_id' => (string) $commentId,
            'post_id' => (string) $comment->post_id,
            'reason' => $request->reason,
            'description' => $request->description,
        ]);

        $reporter = Auth::user();

        // Notif pelapor
        Notification::create([
            'user_id' => $userId,
            'title'   => 'Laporan Komentar Diterima',
            'message' => 'Terima kasih, laporan kamu untuk sebuah komentar sedang direview oleh admin.',
            'type'    => 'report',
            'link'    => '/note/' . $comment->post_id,
            'is_read' => false,
        ]);

        // Notif terlapor
        if ($comment->user_id) {
            $commentUserIdStr = is_array($comment->user_id) ? current($comment->user_id) : $comment->user_id;
            Notification::create([
                'user_id' => (string) $commentUserIdStr,
                'title'   => 'Peringatan: Komentar Dilaporkan',
                'message' => 'Komentar kamu dilaporkan atas alasan: ' . $request->reason . '. Harap selalu jaga etika berdiskusi yang sehat.',
                'type'    => 'report',
                'link'    => '/note/' . $comment->post_id,
                'is_read' => false,
            ]);
        }

        $admins = User::where('role', 'admin')->get();
        foreach ($admins as $admin) {
            Notification::create([
                'user_id' => (string) $admin->id,
                'title'   => 'Laporan Komentar Baru',
                'message' => 'Ada komentar toxic dilaporkan: ' . $request->reason . '. Segera periksa.',
                'type'    => 'report',
                'is_read' => false,
            ]);
        }

        return response()->json([
            'message' => 'Laporan komentar berhasil dikirim',
            'data' => $report
        ], 201);
    }

    public function index()
    {
        if (Auth::user()->role !== 'admin') {
            return response()->json(['message' => 'Akses ditolak'], 403);
        }

        $reports = Report::with(['reporter', 'post'])
            ->where('status', 'pending')
            ->orderBy('created_at', 'desc')->get();

        return response()->json([
            'message' => 'Berhasil mengambil data report',
            'data' => $reports
        ], 200);
    }

    public function update(Request $request, $id)
    {
        if (Auth::user()->role !== 'admin') {
            return response()->json(['message' => 'Akses ditolak'], 403);
        }

        $request->validate([
            'action' => 'required|in:abaikan,takedown,banned',
            'admin_note' => 'nullable|string'
        ]);

        $report = Report::find($id);
        if (!$report) {
            return response()->json(['message' => 'Report tidak ditemukan'], 404);
        }

        $action = $request->action;
        $pesan = '';

        if ($action === 'abaikan') {
            $report->update(['status' => 'rejected', 'admin_note' => $request->admin_note]);
            $pesan = 'Laporan aman, berhasil diabaikan. 🛡️';

            // Notify reporter
            if ($report->reporter_id) {
                Notification::create([
                    'user_id' => (string) $report->reporter_id,
                    'title'   => 'Laporan Ditolak',
                    'message' => 'Laporan kamu ditolak oleh admin dengan alasan: ' . ($request->admin_note ?: 'Tidak ada alasan khusus.'),
                    'type'    => 'report',
                    'link'    => $report->post_id ? '/note/' . $report->post_id : null,
                    'is_read' => false,
                ]);
            }

        } elseif ($action === 'takedown') {
            if ($report->comment_id) {
                $comment = \App\Models\Comment::find($report->comment_id);
                if ($comment) {
                    $postId = $comment->post_id;
                    $commentIdStr = (string)$comment->_id;
                    
                    \App\Models\Comment::where('parent_comment_id', $commentIdStr)->delete();
                    $comment->delete();
                    
                    if ($postId) {
                        $post = Post::find($postId);
                        if ($post) {
                            $post->update(['comments_count' => \App\Models\Comment::where('post_id', $postId)->count()]);
                        }
                    }
                }
                $pesan = 'BAM! Komentar ngawur berhasil di-Take Down! 💥';
            } else {
                Post::where('id', $report->post_id)->delete();
                $pesan = 'BAM! Catatan ngawur berhasil di-Take Down! 💥';
            }
            $report->update(['status' => 'resolved', 'admin_note' => $request->admin_note]);

        } elseif ($action === 'banned') {
            if ($report->comment_id) {
                $comment = \App\Models\Comment::find($report->comment_id);
                if ($comment) {
                    User::where('id', $comment->user_id)->update(['role' => 'banned']);
                    $postId = $comment->post_id;
                    $commentIdStr = (string)$comment->_id;
                    
                    \App\Models\Comment::where('parent_comment_id', $commentIdStr)->delete();
                    $comment->delete();
                    
                    if ($postId) {
                        $post = Post::find($postId);
                        if ($post) {
                            $post->update(['comments_count' => \App\Models\Comment::where('post_id', $postId)->count()]);
                        }
                    }
                }
            } else {
                $post = Post::find($report->post_id);
                if ($post) {
                    User::where('id', $post->user_id)->update(['role' => 'banned']);
                    $post->delete();
                }
            }
            $report->update(['status' => 'resolved', 'admin_note' => $request->admin_note]);
            $pesan = 'MAMPUS! User toxic berhasil di-Banned permanen! 🔨';
        }

        return response()->json([
            'message' => $pesan,
            'data' => $report
        ], 200);
    }
}
