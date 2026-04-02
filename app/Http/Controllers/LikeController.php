<?php

namespace App\Http\Controllers;

use App\Models\Like;
use App\Models\Post;
use App\Models\Comment;
use App\Models\Notification;
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

        $userId = (string) Auth::id();
        $postIdStr = (string) $postId;
        $like = Like::where('post_id', $postIdStr)->where('user_id', $userId)->first();

        if ($like) {
            // Unlike
            $like->delete();
            $post->decrement('likes_count');
            return response()->json(['message' => 'Berhasil unlike post'], 200);
        } else {
            // Like
            Like::create([
                'post_id' => $postIdStr,
                'user_id' => $userId
            ]);
            $post->increment('likes_count');

            if ($post->user_id) { 
                $postUserIdStr = is_array($post->user_id) ? (string) current($post->user_id) : (string) $post->user_id;
                if ($postUserIdStr !== $userId) {
                    Notification::create([
                        'user_id' => $postUserIdStr,
                        'title'   => 'Seseorang Menyukai Catatanmu',
                        'message' => Auth::user()->name . ' menyukai catatanmu "' . $post->title . '".',
                        'type'    => 'like',
                        'link'    => '/note/' . $postIdStr,
                        'is_read' => false,
                    ]);
                }
            }

            return response()->json(['message' => 'Berhasil like post'], 201);
        }
    }

    public function toggleCommentLike($commentId)
    {
        $comment = Comment::find($commentId);
        if (!$comment) {
            return response()->json(['message' => 'Komentar tidak ditemukan'], 404);
        }

        $userId = (string) Auth::id();
        $commentIdStr = (string) $commentId;
        $like = Like::where('comment_id', $commentIdStr)->where('user_id', $userId)->first();

        if ($like) {
            // Unlike Komentar
            $like->delete();
            $comment->decrement('likes_count');
            return response()->json(['message' => 'Berhasil unlike komentar'], 200);
        } else {
            // Like Komentar
            Like::create([
                'comment_id' => $commentIdStr,
                'user_id' => $userId
            ]);
            $comment->increment('likes_count');

            if ($comment->user_id) {
                $commentUserIdStr = is_array($comment->user_id) ? (string) current($comment->user_id) : (string) $comment->user_id;
                if ($commentUserIdStr !== $userId) {
                    Notification::create([
                        'user_id' => $commentUserIdStr,
                        'title'   => 'Seseorang Menyukai Komentarmu',
                        'message' => Auth::user()->name . ' menyukai komentarmu.',
                        'type'    => 'like',
                        'link'    => '/note/' . $comment->post_id . '#comment-' . $commentIdStr,
                        'is_read' => false,
                    ]);
                }
            }

            return response()->json(['message' => 'Berhasil like komentar! 👍'], 201);
        }
    }
}
