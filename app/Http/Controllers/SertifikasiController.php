<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Sertifikasi;
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
}