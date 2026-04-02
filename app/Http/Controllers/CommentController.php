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
            'content' => $request->input('content'),
            'parent_comment_id' => $request->input('parent_comment_id')
        ]);

        if ($post) {
             // We just add +1 to comment counts, no complex relations map 
             $count = $post->comments_count ?? 0;
             $post->update(['comments_count' => $count + 1]);

             if ($request->parent_comment_id) {
                 $parentComment = \App\Models\Comment::find($request->parent_comment_id);
                 if ($parentComment && $parentComment->user_id && $parentComment->user_id !== Auth::id()) {
                     $parentUserIdStr = is_array($parentComment->user_id) ? (string) current($parentComment->user_id) : (string) $parentComment->user_id;
                     /** @var \App\Models\User $authUser */
                     $authUser = Auth::user();
                     \App\Models\Notification::create([
                         'user_id' => $parentUserIdStr,
                         'title'   => 'Seseorang membalas komentarmu',
                         'message' => $authUser->name . ' membalas: "' . substr($request->input('content'), 0, 50) . '..."',
                         'type'    => 'comment',
                         'link'    => '/note/' . $postId . '#comment-' . $comment->_id,
                         'is_read' => false,
                     ]);
                 }
             } else {
                 if ($post->user_id) {
                     $postUserIdStr = is_array($post->user_id) ? (string) current($post->user_id) : (string) $post->user_id;
                     if ($postUserIdStr !== (string) Auth::id()) {
                         /** @var \App\Models\User $authUser */
                         $authUser = Auth::user();
                         \App\Models\Notification::create([
                             'user_id' => $postUserIdStr,
                             'title'   => 'Komentar Baru di Catatanmu',
                             'message' => $authUser->name . ' berkomentar: "' . substr($request->input('content'), 0, 50) . '..."',
                             'type'    => 'comment',
                             'link'    => '/note/' . $postId . '#comment-' . $comment->_id,
                             'is_read' => false,
                         ]);
                     }
                 }
             }
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

        if ((string)$comment->user_id !== (string)Auth::id() && Auth::user()->role !== 'admin') {
            return response()->json(['message' => 'Akses ditolak'], 403);
        }

        $postId = $comment->post_id;
        
        // Recursively find all descendant replies
        $idsToDelete = [$comment->_id];
        $findChildren = function($parentId) use (&$findChildren, &$idsToDelete) {
            $children = \App\Models\Comment::where('parent_comment_id', (string)$parentId)->get(['_id']);
            foreach ($children as $child) {
                $idsToDelete[] = $child->_id;
                $findChildren($child->_id);
            }
        };
        $findChildren($comment->_id);

        // Delete comment and all its nested replies
        \App\Models\Comment::whereIn('_id', $idsToDelete)->delete();

        if ($postId) {
             $post = Post::find($postId);
             if ($post) {
                  $actualCount = \App\Models\Comment::where('post_id', $postId)->count();
                  $post->update(['comments_count' => $actualCount]);
             }
        }

        return response()->json(['message' => 'Komentar berhasil dihapus'], 200);
    }
}
