<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Notification;
use Illuminate\Support\Facades\Auth;

class NotificationController extends Controller
{
    public function getNotifikasi()
    {
        $userId = (string) Auth::id();

        $notifikasi = Notification::where('user_id', $userId)->orderBy('created_at', 'desc')->get();

        return response()->json([
            'message' => 'Berhasil mengambil data notifikasi',
            'data'    => $notifikasi
        ], 200);
    }

    public function markAsRead($id)
    {
        $notifikasi = Notification::where('_id', $id)->first();
        if (!$notifikasi) {
            $notifikasi = Notification::where('id', $id)->first();
        }

        if (!$notifikasi) {
            return response()->json(['message' => 'Notifikasi tidak ditemukan'], 404);
        }

        if ($notifikasi->user_id !== (string) Auth::id()) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $notifikasi->update(['is_read' => true]);

        return response()->json(['message' => 'Berhasil ditandai sudah dibaca'], 200);
    }

    public function markAllAsRead()
    {
        Notification::where('user_id', (string) Auth::id())
            ->where('is_read', false)
            ->update(['is_read' => true]);

        return response()->json(['message' => 'Semua berhasil ditandai sudah dibaca'], 200);
    }
}