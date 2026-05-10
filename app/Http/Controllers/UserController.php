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

    public function search(Request $request)
    {
        $query = $request->input('q', '');
        $limit = (int) $request->input('limit', 12);

        $usersQuery = User::where(function ($q) {
            $q->where('is_dormant', false)->orWhereNull('is_dormant');
        });

        if (strlen($query) > 0) {
            $usersQuery->where(function ($q) use ($query) {
                $q->where('name', 'like', "%{$query}%")
                  ->orWhere('username', 'like', "%{$query}%");
            });
        }

        $paginator = $usersQuery->orderBy('created_at', 'desc')->paginate($limit);
        $users = collect($paginator->items());

        $viewerId = null;
        try { $viewerId = Auth::guard('sanctum')->id(); } catch (\Exception $e) {}
        if (!$viewerId) { try { $viewerId = Auth::guard('api')->id(); } catch (\Exception $e) {} }
        if (!$viewerId) { $viewerId = Auth::id(); }

        $viewer = $viewerId ? User::find((string)$viewerId) : null;

        $users->each(function (User $u) use ($viewer) {
            $u->setAttribute('followers_count', $u->followers()->count());
            $u->setAttribute('posts_count', $u->posts()->count());
            $u->is_followed_by_me = $viewer ? $viewer->isFollowing($u->id) : false;
            $u->makeHidden(['email', 'phone', 'password', 'remember_token', 'deactivated_at']);
        });

        return response()->json([
            'message' => 'Hasil pencarian pengguna',
            'data' => $users,
            'meta' => [
                'current_page' => $paginator->currentPage(),
                'last_page' => $paginator->lastPage(),
                'total' => $paginator->total(),
                'has_more' => $paginator->hasMorePages()
            ]
        ], 200);
    }

    public function updateProfile(Request $request)
    {
        $validated = $request->validate([
            'name' => 'sometimes|string|max:255',
            'username' => 'sometimes|string|max:50|regex:/^[a-zA-Z0-9_]+$/',
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

        if (isset($validated['username']) && $validated['username'] !== $user->username) {
            $validated['username'] = strtolower($validated['username']);
            $exists = User::where('username', $validated['username'])->where('_id', '!=', $user->_id)->exists();
            if ($exists) {
                return response()->json(['message' => 'Username sudah digunakan oleh pengguna lain.'], 400);
            }

            if ($user->username_updated_at) {
                $daysSinceUpdate = now()->diffInDays($user->username_updated_at);
                if ($daysSinceUpdate < 15) {
                    $daysLeft = 15 - $daysSinceUpdate;
                    return response()->json(['message' => "Anda baru saja mengubah username. Silakan tunggu $daysLeft hari lagi."], 400);
                }
            }

            $user->username_updated_at = \Illuminate\Support\Carbon::now();
        }

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

        $viewerId = null;
        try { $viewerId = Auth::guard('sanctum')->id(); } catch (\Exception $e) {}
        if (!$viewerId) { try { $viewerId = Auth::guard('api')->id(); } catch (\Exception $e) {} }
        if (!$viewerId) { $viewerId = Auth::id(); }
        $viewerIdStr = (string)$viewerId;
        $userIdStr = (string)$user->id;

        $isAdmin = false;
        if ($viewerIdStr) {
            $viewer = User::find($viewerIdStr);
            $isAdmin = $viewer && $viewer->role === 'admin';
        }

        // Prevent viewing dormant accounts unless admin or owner
        if ($user->is_dormant && !$isAdmin && $viewerIdStr !== $userIdStr) {
            return response()->json(['message' => 'Pengguna ini sedang tidak aktif (Dormant).'], 403);
        }

        // Prevent viewing private accounts unless admin, owner, or follower
        if ($user->is_private && !$isAdmin && $viewerIdStr !== $userIdStr) {
            if ($viewerIdStr) {
                $follow = \App\Models\Follow::where('follower_id', $viewerIdStr)->where('following_id', $userIdStr)->first();
                $isFollower = $follow && $follow->status === \App\Models\Follow::STATUS_ACCEPTED;
                $isPending = $follow && $follow->status === \App\Models\Follow::STATUS_PENDING;
            }
            if (!$isFollower) {
                return response()->json([
                    'message' => 'Akun ini bersifat Privat.',
                    'is_private_restricted' => true,
                    'is_follow_pending' => $isPending,
                    'data' => [
                        'name' => $user->name,
                        'username' => $user->username,
                        'avatar' => $user->avatar,
                        'role' => $user->role,
                        'is_private' => true,
                    ]
                ], 403);
            }
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
            
            $isPending = \App\Models\Follow::where('follower_id', (string)$userId)
                                           ->where('following_id', (string)$user->id)
                                           ->where('status', \App\Models\Follow::STATUS_PENDING)
                                           ->exists();

            $user->setAttribute('is_followed_by_me', $isFollowed);
            $user->setAttribute('is_follow_pending', $isPending);
            $user->setAttribute('follows_me', $user->isFollowing($userId));
        } else {
            $user->setAttribute('is_followed_by_me', false);
            $user->setAttribute('is_follow_pending', false);
            $user->setAttribute('follows_me', false);
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

        $activities = \App\Models\Comment::with('post')
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
        $experts = User::where('role', 'pakar')
            ->where(function($q) {
                $q->where('is_dormant', false)->orWhereNull('is_dormant');
            })->get();

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
    public function updateTarget(Request $request)
   {
       $request->validate([
           'target' => 'required|numeric'
       ]);

       $user = Auth::user();
       $user->target_belajar = $request->target;
       $user->save();

       return response()->json([
           'success' => true,
           'message' => 'Target berhasil disimpan ke Database!',
           'target' => $user->target_belajar
       ]);
   }

    public function demote($id)
    {
        if (Auth::user()->role !== 'admin') {
            return response()->json(['message' => 'Hanya Admin yang bisa menurunkan pangkat!'], 403);
        }

        $user = User::find($id);
        if (!$user) {
            return response()->json(['message' => 'User tidak ditemukan'], 404);
        }

        if ($user->id === Auth::id()) {
            return response()->json(['message' => 'Lu nggak bisa nurunin pangkat diri sendiri kocak!'], 400);
        }

        $oldRole = $user->role;
        $user->role = 'user';
        $user->save();

        return response()->json([
            'message' => 'Berhasil menurunkan pangkat dari ' . $oldRole . ' menjadi user biasa.',
            'user' => $user
        ], 200);
    }

    public function updatePrivacy(Request $request)
    {
        $request->validate([
            'is_private' => 'required|boolean'
        ]);

        $user = Auth::user();
        $user->is_private = $request->is_private;
        $user->save();

        return response()->json([
            'success' => true,
            'message' => 'Pengaturan privasi berhasil diperbarui',
            'user' => $user
        ]);
    }

    public function deactivate(Request $request)
    {
        $user = Auth::user();
        
        // Mark as dormant and set deactivation timestamp
        $user->is_dormant = true;
        $user->deactivated_at = \Illuminate\Support\Carbon::now();
        $user->save();

        // Optional: revoke all tokens so they are fully logged out
        if (method_exists($user, 'tokens')) {
            $user->tokens()->delete();
        }

        return response()->json([
            'success' => true,
            'message' => 'Akun berhasil dinonaktifkan dan masuk ke masa Dormant.'
        ]);
    }
}