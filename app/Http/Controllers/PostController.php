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

        if ($request->filled('is_verified')) {
            $isVerified = filter_var($request->query('is_verified'), FILTER_VALIDATE_BOOLEAN);
            $query->where('is_verified', $isVerified);
        }

        if ($request->filled('user_id')) {
            $query->where('user_id', $request->query('user_id'));
        }

        if ($request->filled('search')) {
            $search = $request->query('search');
            $query->where(function($q) use ($search) {
                $q->where('title', 'like', '%' . $search . '%')
                  ->orWhere('content', 'like', '%' . $search . '%')
                  ->orWhere('mapel', 'like', '%' . $search . '%');
            });
        }

        $isRandom = false;

        if ($request->filled('sort')) {
            $sort = $request->query('sort');
            
            if ($sort === 'populer') {
                $query->orderBy('likes_count', 'desc')->orderBy('comments_count', 'desc');
            } elseif ($sort === 'terbaru') {
                $query->orderBy('created_at', 'desc');
            } else {
                $query->orderBy('created_at', 'desc'); 
                $isRandom = true;
            }
        } else {
            $query->orderBy('created_at', 'desc');
            $isRandom = true;
        }

        $posts = $query->get();

        if ($isRandom) {
            $posts = $posts->shuffle()->values();
        }

        $posts->each(function ($post) {
            $realLikes = $post->likes ? $post->likes->count() : 0;
            $realComments = $post->comments ? $post->comments->count() : 0;

            $post->setAttribute('likes_count', $realLikes);
            $post->setAttribute('comments_count', $realComments);

            if ($post->isDirty(['likes_count', 'comments_count'])) {
                $post->save();
            }

            $post->is_liked = $post->likes ? $post->likes->where('user_id', Auth::id())->isNotEmpty() : false;
        });

        return response()->json([
            'message' => 'Berhasil mengambil daftar post',
            'data' => $posts
        ], 200);

    }    public function store(Request $request)
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
                    'title' => 'Verifikasi Catatan Baru',
                    'message' => 'Catatan "' . $post->title . '" dipublikasikan dan menunggu ulasan pakar.',
                    'type' => 'verifikasi',
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

        $userId = null;
        try { 
            $userId = Auth::guard('sanctum')->id(); 
        } catch (\Exception $e) {}

        if (!$userId) {
            try { 
                $userId = Auth::guard('api')->id(); 
            } catch (\Exception $e) {}
        }
        
        if (!$userId) {
            $userId = Auth::id();
        }

        $userIdStr = (string) $userId;

        if ($userIdStr !== "") {
            $post->is_liked = \App\Models\Like::where('post_id', (string) $id)->where('user_id', $userIdStr)->exists();
        } else {
            $post->is_liked = false;
        }

        if ($post->comments) {
            $post->comments->each(function ($comment) use ($userIdStr) {
                $commentIdStr = (string) $comment->id;

                $comment->likes_count = \App\Models\Like::where('comment_id', $commentIdStr)->count();

                if ($userIdStr !== "") {
                    $comment->is_liked = \App\Models\Like::where('comment_id', $commentIdStr)->where('user_id', $userIdStr)->exists();
                } else {
                    $comment->is_liked = false;
                }
            });
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
