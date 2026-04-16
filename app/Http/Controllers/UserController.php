<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class UserController extends Controller
{
    public function index()
    {
        if (Auth::user()->role !== 'admin') {
            return response()->json(['message' => 'Hanya Admin yang punya akses!'], 403);
        }

        $users = User::orderBy('created_at', 'desc')->get();
        // Append counts for Admin Dashboard
        $users->each(function($u) {
            $u->followers = is_array($u->follower_ids) ? count($u->follower_ids) : 0;
            $u->followings = is_array($u->following_ids) ? count($u->following_ids) : 0;
        });

        return response()->json([
            'message' => 'Berhasil mengambil daftar seluruh pengguna',
            'data' => $users
        ], 200);
    }

    public function updateProfile(Request $request)
    {
        $user = Auth::user();

        $validated = $request->validate([
            'name' => 'sometimes|string|max:255',
            'bio' => 'nullable|string|max:255',
            'jenjang_pendidikan' => 'sometimes|string|in:SD,SMP,SMA,Kuliah',
            'school' => 'nullable|string|max:255',
            'phone' => 'nullable|string|max:20',
            'avatar' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);

        if ($request->hasFile('avatar')) {
            $file = $request->file('avatar');
            $filename = time() . '_' . $file->getClientOriginalName();
            // Store the file in public/avatars folder
            $file->move(public_path('avatars'), $filename);
            
            // App URL setup (dynamically getting url or setting relative path)
            $avatarUrl = asset('avatars/' . $filename);
            
            $validated['avatar'] = $avatarUrl;
        }

        $user->update($validated);

        return response()->json([
            'message' => 'Profil berhasil diperbarui',
            'data' => $user
        ], 200);
    }

    public function show($id)
    {
        $user = User::find($id);

        if (!$user) {
            return response()->json(['message' => 'Pengguna tidak ditemukan'], 404);
        }

        $user->setAttribute('followers_count', is_array($user->follower_ids) ? count($user->follower_ids) : 0);
        $user->setAttribute('following_count', is_array($user->following_ids) ? count($user->following_ids) : 0);

        // Hide private info
        $user->makeHidden(['email', 'phone', 'is_verified']); 

        $userId = null;
        try { $userId = Auth::guard('sanctum')->id(); } catch (\Exception $e) {}
        if (!$userId) { try { $userId = Auth::guard('api')->id(); } catch (\Exception $e) {} }
        if (!$userId) { $userId = Auth::id(); }

        if ($userId) {
            $loggedInUser = User::find((string)$userId);
            $isFollowed = $loggedInUser ? $loggedInUser->isFollowing($user->id) : false;
            $user->setAttribute('is_followed_by_me', $isFollowed);
        } else {
            $user->setAttribute('is_followed_by_me', false);
        }

        return response()->json([
            'message' => 'Berhasil mengambil profil pengguna',
            'data' => $user
        ], 200);
    }

    public function activities($id)
    {
        $user = User::find($id);

        if (!$user) {
            return response()->json(['message' => 'Pengguna tidak ditemukan'], 404);
        }

        $activities = \App\Models\Comment::with(['post' => function($query) {
            $query->select('id', 'title'); 
        }])
        ->where('user_id', $id)
        ->orderBy('created_at', 'desc')
        ->get();

        return response()->json([
            'message' => 'Berhasil mengambil aktivitas pengguna',
            'data' => $activities
        ], 200);
    }

    public function experts()
    {
        $experts = User::where('role', 'pakar')->get();

        // Detect logged-in user (optional auth)
        $userId = null;
        try { $userId = Auth::guard('sanctum')->id(); } catch (\Exception $e) {}
        if (!$userId) { try { $userId = Auth::guard('api')->id(); } catch (\Exception $e) {} }
        if (!$userId) { $userId = Auth::id(); }

        $loggedInUser = $userId ? User::find((string)$userId) : null;

        $experts->each(function ($expert) use ($loggedInUser) {
            $expert->followers_count = is_array($expert->follower_ids) ? count($expert->follower_ids) : 0;
            $expert->is_followed_by_me = $loggedInUser ? $loggedInUser->isFollowing($expert->id) : false;
            $expert->makeHidden(['email', 'phone', 'password', 'remember_token']);
        });

        return response()->json([
            'message' => 'Berhasil mengambil daftar pakar',
            'data' => $experts
        ], 200);
    }
}