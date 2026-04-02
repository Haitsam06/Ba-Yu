<?php

namespace App\Http\Controllers;

use App\Models\Post;
use App\Models\User;
use App\Models\Notification;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class PostController extends Controller
{
    public function index(Request $request)
    {
        $query = Post::with(['user', 'topic', 'category', 'comments', 'likes'])
            ->where('visibility', 'public');

        if ($request->has('is_verified')) {
            $isVerified = filter_var($request->query('is_verified'), FILTER_VALIDATE_BOOLEAN);
            $query->where('is_verified', $isVerified);
        }

        if ($request->has('user_id')) {
            $query->where('user_id', $request->query('user_id'));
        }

        $posts = $query->orderBy('created_at', 'desc')->get();

        // Compute real counts from loaded relations and auto-sync
        $posts->each(function ($post) {
            $realLikes = $post->likes ? $post->likes->count() : 0;
            $realComments = $post->comments ? $post->comments->count() : 0;

            // Overwrite with real counts
            $post->likes_count = $realLikes;
            $post->comments_count = $realComments;
            if ($post->isDirty(['likes_count', 'comments_count'])) {
                $post->save();
            }
        });

        return response()->json([
            'message' => 'Berhasil mengambil daftar post',
            'data' => $posts
        ], 200);
    }
    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'content' => 'required|string',
            'description' => 'nullable|string',
            'mapel' => 'nullable|string',
            'jenjang' => 'nullable|string',
            'kelas' => 'nullable|string',
            'semester' => 'nullable|string',
            'tags' => 'nullable|array',
            'thumbnail' => 'nullable|string',
            'thumbnail_fit' => 'nullable|in:cover,contain',
            'topic_id' => 'nullable|string',
            'category_id' => 'nullable|string',
            'visibility' => 'in:public,private',
        ]);

        $post = Post::create([
            'user_id' => Auth::id(),
            'title' => $request->title,
            'content' => $request->content,
            'description' => $request->description,
            'mapel' => $request->mapel,
            'jenjang' => $request->jenjang,
            'kelas' => $request->kelas,
            'semester' => $request->semester,
            'tags' => $request->tags ?? [],
            'thumbnail' => $request->thumbnail,
            'thumbnail_fit' => $request->thumbnail_fit ?? 'cover',
            'topic_id' => $request->topic_id,
            'category_id' => $request->category_id,
            'visibility' => $request->visibility ?? 'public',
        ]);

        if ($post->visibility === 'public') {
            $pakars = User::where('role', 'pakar')->get();
            foreach ($pakars as $pakar) {
                Notification::create([
                    'user_id' => $pakar->id,
                    'title'   => 'Verifikasi Catatan Baru',
                    'message' => 'Catatan "' . $post->title . '" dipublikasikan dan menunggu ulasan pakar.',
                    'type'    => 'verifikasi',
                    'is_read' => false,
                ]);
            }
        }

        return response()->json([
            'message' => 'Catatan berhasil masuk ke awan',
            'data' => $post
        ], 201);
    }

    public function show($id)
    {
        $post = Post::with(['user', 'topic', 'category', 'comments.user', 'likes'])->find($id);

        if (!$post) {
            return response()->json(['message' => 'Post tidak ditemukan'], 404);
        }

        // Sync real counts from relations
        $realLikes = $post->likes ? $post->likes->count() : 0;
        $realComments = $post->comments ? $post->comments->count() : 0;

        $post->likes_count = $realLikes;
        $post->comments_count = $realComments;
        if ($post->isDirty(['likes_count', 'comments_count'])) {
            $post->save();
        }

        return response()->json([
            'message' => 'Berhasil mengambil post',
            'data' => $post
        ], 200);
    }

    public function verify($id)
    {
        $post = Post::find($id);

        if (!$post) {
            return response()->json(['message' => 'Post tidak ditemukan'], 404);
        }

        if (Auth::user()->role !== 'admin' && Auth::user()->role !== 'pakar') {
            return response()->json(['message' => 'Akses ditolak'], 403);
        }

        $post->update(['is_verified' => true]);

        return response()->json(['message' => 'Catatan berhasil diverifikasi!'], 200);
    }

    public function destroy($id)
    {
        $post = Post::find($id);

        if (!$post) {
            return response()->json(['message' => 'Post tidak ditemukan'], 404);
        }

        if ($post->user_id !== Auth::id() && Auth::user()->role !== 'admin') {
            return response()->json(['message' => 'Akses ditolak'], 403);
        }

        $post->delete();

        return response()->json(['message' => 'Post berhasil dihapus'], 200);
    }
}
