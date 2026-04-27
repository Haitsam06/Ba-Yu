<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Cloudinary\Cloudinary;

class UserController extends Controller
{
    public function index()
    {
        if (Auth::user()->role !== 'admin') {
            return response()->json(['message' => 'Hanya Admin yang punya akses!'], 403);
        }

        $users = User::orderBy('created_at', 'desc')->get();
        
        $users->each(function($u) {
            $u->followers = $u->followers()->count();
            $u->followings = $u->followings()->count();
        });

        return response()->json([
            'message' => 'Berhasil mengambil daftar seluruh pengguna',
            'data' => $users
        ], 200);
    }

    public function updateProfile(Request $request)
    {
        $validated = $request->validate([
            'name' => 'sometimes|string|max:255',
            'bio' => 'nullable|string|max:255',
            'jenjang_pendidikan' => 'sometimes|string|in:SD,SMP,SMA,Kuliah',
            'school' => 'nullable|string|max:255',
            'phone' => 'nullable|string|max:20',
            'avatar' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);

        if ($request->hasFile('avatar')) {
            $cloudinary = new Cloudinary(env('CLOUDINARY_URL'));
            
            $upload = $cloudinary->uploadApi()->upload($request->file('avatar')->getRealPath(), [
                'folder' => 'ba-yu-avatars'
            ]);
            
            $validated['avatar'] = $upload['secure_url'];
        }
        $user = Auth::user();
        $user->fill($validated);
        $user->save();

        return response()->json([
            'message' => 'Profil berhasil diperbarui',
            'user' => $user
        ], 200);
    }

    public function show($id)
    {
        $user = User::find($id);

        if (!$user) {
            return response()->json(['message' => 'Pengguna tidak ditemukan'], 404);
        }

        // 🔥 SULAP 2: Ngitung dari tabel Follows buat Halaman Profil
        $user->setAttribute('followers_count', $user->followers()->count());
        $user->setAttribute('following_count', $user->followings()->count());

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

        $userId = null;
        try { $userId = Auth::guard('sanctum')->id(); } catch (\Exception $e) {}
        if (!$userId) { try { $userId = Auth::guard('api')->id(); } catch (\Exception $e) {} }
        if (!$userId) { $userId = Auth::id(); }

        $loggedInUser = $userId ? User::find((string)$userId) : null;

        $experts->each(function (User $expert) use ($loggedInUser) {
            $expert->setAttribute('followers_count', $expert->followers()->count());
            $expert->is_followed_by_me = $loggedInUser ? $loggedInUser->isFollowing($expert->id) : false;
            $expert->makeHidden(['email', 'phone', 'password', 'remember_token']);
        });

        return response()->json([
            'message' => 'Berhasil mengambil daftar pakar',
            'data' => $experts
        ], 200);
    }
}