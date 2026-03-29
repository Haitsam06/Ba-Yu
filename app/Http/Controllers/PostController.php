<?php

namespace App\Http\Controllers;

use App\Models\Post;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class PostController extends Controller
{
    public function index()
    {
        $posts = Post::with(['user', 'topic', 'category', 'comments', 'likes'])
                     ->where('visibility', 'public')
                     ->orderBy('created_at', 'desc')
                     ->get();

        return response()->json([
            'message' => 'Berhasil mengambil daftar post',
            'data' => $posts
        ], 200);
    }

    public function store(Request $request)
    {
        $request->validate([
            'topic_id' => 'required',
            'category_id' => 'required',
            'title' => 'required|string|max:255',
            'content' => 'required|string',
            'visibility' => 'in:public,private',
            'images' => 'nullable|array'
        ]);

        $post = Post::create([
            'user_id' => Auth::id(),
            'topic_id' => $request->topic_id,
            'category_id' => $request->category_id,
            'title' => $request->title,
            'content' => $request->content,
            'visibility' => $request->visibility ?? 'public',
            'images' => $request->images ?? [],
        ]);

        return response()->json([
            'message' => 'Post berhasil dibuat',
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
