<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Sertifikasi;
use App\Models\Notification;
use Illuminate\Support\Facades\Auth;

class SertifikasiController extends Controller
{
    public function ajukan(Request $request)
    {
        $request->validate([
            'bidang_keahlian' => 'required|string|max:255',
            'file_sertifikat' => 'required|file|mimes:pdf,jpg,jpeg|max:5120',
        ]);

        $cekPengajuan = Sertifikasi::where('user_id', Auth::id())
            ->where('status', 'pending')
            ->first();

        if ($cekPengajuan) {
            return response()->json([
                'message' => 'Masih dicek admin der'
            ], 400);
        }

        $pathFile = $request->file('file_sertifikat')->store('sertifikat', 'public');

        $sertifikasi = Sertifikasi::create([
            'user_id' => Auth::id(),
            'bidang_keahlian' => $request->bidang_keahlian,
            'file_sertifikat' => $pathFile,
        ]);

        return response()->json([
            'message' => 'Berkasi berhasil diajukan!.',
            'data' => $sertifikasi
        ], 201);
    }

// FUNGSI 1: Buat Admin ngeliat daftar antrean yang masih "pending"
    public function getPending()
    {
        // --- GEMBOK ADMIN ---
        if (Auth::user()->role !== 'admin') {
            return response()->json(['message' => 'Akses Ditolak kasian dah aowkaokawok'], 403);
        }
        // --------------------

        $pengajuan = Sertifikasi::where('status', 'pending')->get();

        return response()->json([
            'message' => 'Berhasil mengambil daftar antrean',
            'data' => $pengajuan
        ], 200);
    }

    // FUNGSI 2: Buat Admin "Ketok Palu" (Terima/Tolak)
    public function verifikasi(Request $request, $id)
    {
        // --- GEMBOK ADMIN ---
        if (Auth::user()->role !== 'admin') {
            return response()->json(['message' => 'Cuma Admin yang bisa ketok palu der!'], 403);
        }
        // --------------------

        $request->validate([
            'status' => 'required|in:approved,rejected'
        ]);

        $sertifikasi = Sertifikasi::find($id);

        if (!$sertifikasi) {
            return response()->json(['message' => 'Data pengajuan tidak ditemukan'], 404);
        }

        $sertifikasi->update([
            'status' => $request->status
        ]);

        $title = $request->status === 'approved' ? 'Sertifikasi Diterima!' : 'Sertifikasi Ditolak';

        $message = $request->status === 'approved' 
            ? 'Selamat! Pengajuan sertifikasi pakarmu untuk bidang ' . $sertifikasi->bidang_keahlian . ' telah disetujui Admin.' 
            : 'Mohon maaf, pengajuan sertifikasi pakarmu untuk bidang ' . $sertifikasi->bidang_keahlian . ' belum dapat disetujui saat ini.';

        Notification::create([
            'user_id' => $sertifikasi->user_id,
            'title'   => $title,
            'message' => $message,
            'type'    => 'sertifikasi',
            'is_read' => false,
        ]);

        return response()->json([
            'message' => 'Status berhasil diubah jadi ' . $request->status . '!',
            'data' => $sertifikasi
        ], 200);
    }
}