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
}