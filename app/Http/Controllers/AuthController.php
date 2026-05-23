<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Password;
use Laravel\Socialite\Facades\Socialite;
use Illuminate\Support\Str;

class AuthController extends Controller
{
    public function register(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'username' => 'required|string|max:50|unique:App\Models\User,username|regex:/^[a-zA-Z0-9_]+$/',
            'email' => 'required|string|email|max:255|unique:App\Models\User,email',
            'password' => 'required|string|min:6',
            'jenjang_pendidikan' => 'required|string',
            'profesi' => 'required|string',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 400);
        }

        $user = User::create([
            'name' => $request->name,
            'username' => strtolower($request->username),
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'jenjang_pendidikan' => $request->jenjang_pendidikan,
            'profesi' => $request->profesi,
            'email_verified_at' => now(), // Auto-verify for development (no email provider configured)
        ]);

        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'message' => 'Register berhasil!',
            'data' => $user,
            'access_token' => $token,
            'token_type' => 'Bearer',
        ], 201);
    }

    public function login(Request $request)
    {
        $request->validate([
            'login' => 'required|string',
            'password' => 'required',
        ]);

        $loginField = filter_var($request->login, FILTER_VALIDATE_EMAIL) ? 'email' : 'username';

        $user = User::where($loginField, $request->login)->first();

        if (!$user || !Hash::check($request->password, $user->password)) {
            return response()->json([
                'message' => 'Kredensial atau Password salah '
            ], 401);
        }

        if ($user->is_dormant) {
            $user->is_dormant = false;
            $user->deactivated_at = null;
            $user->save();
        }

        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'message' => 'Login sukses!',
            'access_token' => $token,
            'token_type' => 'Bearer',
            'user' => [
                'id' => $user->_id,
                'name' => $user->name,
                'username' => $user->username,
                'email' => $user->email,
                'role' => $user->role,
                'jenjang_pendidikan' => $user->jenjang_pendidikan,
                'avatar' => $user->avatar,
                'bio' => $user->bio,      
                'school' => $user->school,
                'phone' => $user->phone,
                'is_private' => $user->is_private ?? false,
                'is_dormant' => $user->is_dormant,
                'username_updated_at' => $user->username_updated_at,
            ]
        ]);
    }

    public function forgotPassword(Request $request)
    {
        // 1. Validasi: Pastiin emailnya diisi dan emang ada di database lu
        $request->validate([
            'email' => 'required|email|exists:user,email',
        ], [
            'email.exists' => 'Email belum terdaftar!'
        ]);

        // 2. Suruh Laravel bikin token dan "ngirim" email
        $status = Password::sendResetLink(
            $request->only('email')
        );

        // 3. Cek apakah berhasil dikirim
        if ($status === Password::RESET_LINK_SENT) {
            return response()->json([
                'message' => 'Mantap! Link reset password udah dikirim ke email lu.'
            ], 200);
        }

        return response()->json([
            'message' => 'Gagal ngirim email nih, coba lagi ntar ya.'
        ], 500);
    }

    public function resetPassword(Request $request)
    {
        $request->validate([
            'token' => 'required',
            'email' => 'required|email|exists:user,email',
            'password' => 'required|string|min:6|confirmed',
        ]);

        $status = Password::reset(
            $request->only('email', 'password', 'password_confirmation', 'token'),
            function ($user, $password) {
                $user->forceFill([
                    'password' => Hash::make($password)
                ])->save();
            }
        );

        if ($status === Password::PASSWORD_RESET) {
            return response()->json([
                'message' => 'Password berhasil diubah!'
            ], 200);
        }

        return response()->json([
            'message' => 'Gagal mengubah password, link mungkin sudah kadaluarsa.'
        ], 400);
    }

    /**
     * Redirect to OAuth provider (Google/Facebook)
     */
    public function redirectToProvider($provider)
    {
        if (!in_array($provider, ['google', 'facebook'])) {
            return response()->json(['message' => 'Provider tidak didukung'], 400);
        }

        return Socialite::driver($provider)->stateless()->redirect();
    }

    /**
     * Handle OAuth callback
     */
    public function handleProviderCallback($provider)
    {
        if (!in_array($provider, ['google', 'facebook'])) {
            return redirect(config('app.url') . '/app/login?error=provider_invalid');
        }

        try {
            $socialUser = Socialite::driver($provider)->stateless()->user();
        } catch (\Exception $e) {
            return redirect(config('app.url') . '/app/login?error=oauth_failed');
        }

        // Check if user already exists with this email
        $existingUser = User::where('email', $socialUser->getEmail())->first();

        if ($existingUser) {
            // Update provider info if not set
            if (!$existingUser->provider) {
                $existingUser->update([
                    'provider' => $provider,
                    'provider_id' => $socialUser->getId(),
                ]);
            }

            // Reactivate dormant user
            if ($existingUser->is_dormant) {
                $existingUser->is_dormant = false;
                $existingUser->deactivated_at = null;
                $existingUser->save();
            }

            $token = $existingUser->createToken('auth_token')->plainTextToken;
            return redirect(config('app.url') . '/app/login?token=' . $token . '&existing=true');
        }

        // Create new user from social login
        $username = Str::slug($socialUser->getName(), '_') . '_' . Str::random(4);
        // Ensure username is unique
        while (User::where('username', $username)->exists()) {
            $username = Str::slug($socialUser->getName(), '_') . '_' . Str::random(4);
        }

        $newUser = User::create([
            'name' => $socialUser->getName(),
            'email' => $socialUser->getEmail(),
            'username' => strtolower($username),
            'avatar' => $socialUser->getAvatar(),
            'provider' => $provider,
            'provider_id' => $socialUser->getId(),
            'email_verified_at' => now(),
            'profile_completed' => false, // Needs to complete profile
        ]);

        $token = $newUser->createToken('auth_token')->plainTextToken;
        return redirect(config('app.url') . '/app/login?token=' . $token . '&new=true');
    }
}