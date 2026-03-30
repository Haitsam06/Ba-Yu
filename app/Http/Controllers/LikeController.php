<?php

namespace App\Http\Controllers;

use App\Models\Like;
use App\Models\Post;
use App\Models\Comment;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class LikeController extends Controller
{
    public function toggle($postId)
    {
        $post = Post::find($postId);
        if (!$post) {
            return response()->json(['message' => 'Post tidak ditemukan'], 404);
        }

        $userId = Auth::id();
        $like = Like::where('post_id', $postId)->where('user_id', $userId)->first();

        if ($like) {
            // Unlike
            $like->delete();
            $count = max(0, ($post->likes_count ?? 0) - 1);
            $post->update(['likes_count' => $count]);
            return response()->json(['message' => 'Berhasil unlike post'], 200);
        } else {
            // Like
            Like::create([
                'post_id' => $postId,
                'user_id' => $userId
            ]);
            $count = ($post->likes_count ?? 0) + 1;
            $post->update(['likes_count' => $count]);
            return response()->json(['message' => 'Berhasil like post'], 201);
        }
    }
    public function toggleCommentLike($commentId)
    {
        $comment = Comment::find($commentId);
        if (!$comment) {
            return response()->json(['message' => 'Komentar tidak ditemukan'], 404);
        }

        $userId = Auth::id();
        $like = Like::where('comment_id', $commentId)->where('user_id', $userId)->first();

        if ($like) {
            // Unlike Komentar
            $like->delete();
            $count = max(0, ($comment->likes_count ?? 0) - 1);
            $comment->update(['likes_count' => $count]);
            return response()->json(['message' => 'Berhasil unlike komentar'], 200);
        } else {
            // Like Komentar
            Like::create([
                'comment_id' => $commentId,
                'user_id' => $userId
            ]);
            $count = ($comment->likes_count ?? 0) + 1;
            $comment->update(['likes_count' => $count]);
            return response()->json(['message' => 'Berhasil like komentar! 👍'], 201);
        }
    }
}
