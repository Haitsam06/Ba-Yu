<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Password;

class AuthController extends Controller
{
    public function register(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:App\Models\User,email',
            'password' => 'required|string|min:6',
            'jenjang_pendidikan' => 'required|string',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 400);
        }

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'jenjang_pendidikan' => $request->jenjang_pendidikan,
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
            'email' => 'required|email',
            'password' => 'required',
        ]);

        $user = User::where('email', $request->email)->first();

        if (!$user || !Hash::check($request->password, $user->password)) {
            return response()->json([
                'message' => 'Email atau Password salah '
            ], 401);
        }

        $token = $user->createToken('auth_token')->plainTextToken;

        // TIMPA BAGIAN INI AJA YAA:
        return response()->json([
            'message' => 'Login sukses!',
            'access_token' => $token,
            'token_type' => 'Bearer',
            'user' => [
                'id' => $user->_id,
                'name' => $user->name,
                'email' => $user->email,
                'role' => $user->role,
                'jenjang_pendidikan' => $user->jenjang_pendidikan,
                'avatar' => $user->avatar,
                'bio' => $user->bio,      
                'school' => $user->school,
                'phone' => $user->phone
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
}