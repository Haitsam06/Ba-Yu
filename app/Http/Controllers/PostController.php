<?php

namespace App\Http\Controllers;

use App\Models\Post;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class PostController extends Controller
{
    public function index(Request $request)
    {
        $query = Post::with(['user', 'topic', 'category', 'comments', 'likes'])->where('visibility', 'public');

        if ($request->has('is_verified')) {
            $isVerified = filter_var($request->query('is_verified'), FILTER_VALIDATE_BOOLEAN);
            $query->where('is_verified', $isVerified);
        }

        $posts = $query->orderBy('created_at', 'desc')->get();

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
            'mapel' => 'nullable|string',
            'jenjang' => 'nullable|string',
            'kelas' => 'nullable|string',
            'semester' => 'nullable|string',
            'tags' => 'nullable|array',
            'topic_id' => 'nullable|string',
            'category_id' => 'nullable|string',
            'visibility' => 'in:public,private',
        ]);

        $post = Post::create([
            'user_id' => Auth::id(),
            'title' => $request->title,
            'content' => $request->content,
            'mapel' => $request->mapel,
            'jenjang' => $request->jenjang,
            'kelas' => $request->kelas,
            'semester' => $request->semester,
            'tags' => $request->tags ?? [],
            'topic_id' => $request->topic_id,
            'category_id' => $request->category_id,
            'visibility' => $request->visibility ?? 'public',
        ]);

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

        return response()->json([
            'message' => 'Berhasil mengambil post',
            'data' => $post
        ], 200);
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
