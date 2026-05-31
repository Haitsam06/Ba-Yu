<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;

class VerificationController extends Controller
{
    /**
     * Mark the authenticated user's email address as verified.
     */
    public function verify(Request $request, $id, $hash)
    {
        $user = User::find($id);

        if (! $user) {
            // Arahkan ke frontend jika user tidak ditemukan (misalnya deep link)
            $frontendUrl = config('app.frontend_url', env('EXPO_PUBLIC_API_URL', 'exp://localhost:8081')).'/verify-failed';

            return redirect($frontendUrl);
        }

        if (! hash_equals((string) $hash, sha1($user->getEmailForVerification()))) {
            // Token/Hash tidak cocok
            $frontendUrl = config('app.frontend_url', env('EXPO_PUBLIC_API_URL', 'exp://localhost:8081')).'/verify-failed';

            return redirect($frontendUrl);
        }

        if ($user->hasVerifiedEmail()) {
            // Sudah terverifikasi
            $frontendUrl = config('app.frontend_url', env('EXPO_PUBLIC_API_URL', 'exp://localhost:8081')).'/verify-success';

            return redirect($frontendUrl);
        }

        if ($user->markEmailAsVerified()) {
            // Trigger event verified jika perlu
            // event(new Verified($user));
        }

        $frontendUrl = config('app.frontend_url', env('EXPO_PUBLIC_API_URL', 'exp://localhost:8081')).'/verify-success';

        return redirect($frontendUrl);
    }

    /**
     * Resend the email verification notification.
     */
    public function resend(Request $request)
    {
        if ($request->user()->hasVerifiedEmail()) {
            return response()->json([
                'message' => 'Email sudah terverifikasi.',
            ], 400);
        }

        $request->user()->sendEmailVerificationNotification();

        return response()->json([
            'message' => 'Link verifikasi email telah dikirim ulang.',
        ]);
    }
}
