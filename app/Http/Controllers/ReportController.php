<?php

namespace App\Http\Controllers;

use App\Models\Report;
use App\Models\Post;
use App\Models\User;
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

        $report = Report::create([
            'reporter_id' => Auth::id(),
            'post_id' => $postId,
            'reason' => $request->reason,
            'description' => $request->description,
        ]);

        return response()->json([
            'message' => 'Report berhasil dikirim',
            'data' => $report
        ], 201);
    }

    public function index()
    {
        if (Auth::user()->role !== 'admin') {
            return response()->json(['message' => 'Akses ditolak'], 403);
        }

        $reports = Report::with(['reporter', 'post'])->orderBy('created_at', 'desc')->get();

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

        } elseif ($action === 'takedown') {
            Post::where('id', $report->post_id)->delete();
            
            $report->update(['status' => 'resolved', 'admin_note' => $request->admin_note]);
            $pesan = 'BAM! Catatan ngawur berhasil di-Take Down! 💥';

        } elseif ($action === 'banned') {
            $post = Post::find($report->post_id);
            if ($post) {
                User::where('id', $post->user_id)->update(['role' => 'banned']);
                $post->delete();
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
