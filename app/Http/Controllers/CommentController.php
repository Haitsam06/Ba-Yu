<?php

namespace App\Http\Controllers;

use App\Models\Comment;
use App\Models\Post;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class CommentController extends Controller
{
    public function store(Request $request, $postId)
    {
        $request->validate([
            'content' => 'required|string',
            'parent_comment_id' => 'nullable|string'
        ]);

        $post = Post::find($postId);
        if (!$post) {
            return response()->json(['message' => 'Post tidak ditemukan'], 404);
        }

        $comment = Comment::create([
            'post_id' => $postId,
            'user_id' => Auth::id(),
            'content' => $request->content,
            'parent_comment_id' => $request->parent_comment_id
        ]);

        if ($post) {
             // We just add +1 to comment counts, no complex relations map 
             $count = $post->comments_count ?? 0;
             $post->update(['comments_count' => $count + 1]);
        }

        return response()->json([
            'message' => 'Komentar berhasil ditambahkan',
            'data' => $comment
        ], 201);
    }

    public function destroy($id)
    {
        $comment = Comment::find($id);

        if (!$comment) {
            return response()->json(['message' => 'Komentar tidak ditemukan'], 404);
        }

        if ($comment->user_id !== Auth::id() && Auth::user()->role !== 'admin') {
            return response()->json(['message' => 'Akses ditolak'], 403);
        }

        $postId = $comment->post_id;
        $comment->delete();

        if ($postId) {
             $post = Post::find($postId);
             if ($post) {
                  $count = max(0, ($post->comments_count ?? 0) - 1);
                  $post->update(['comments_count' => $count]);
             }
        }

        return response()->json(['message' => 'Komentar berhasil dihapus'], 200);
    }
}
