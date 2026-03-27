<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Notification;
use Illuminate\Support\Facades\Auth;

class NotificationController extends Controller
{
    public function getNotifikasi()
    {
        $user = Auth::user();

        $notifikasi = Notification::where('user_id', $user->id)->orderBy('created_at', 'desc')->get();

        return response()->json([
            'message' => 'Berhasil mengambil data notifikasi',
            'data'    => $notifikasi
        ], 200);
    }
}