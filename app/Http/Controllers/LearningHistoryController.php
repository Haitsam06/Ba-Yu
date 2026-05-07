<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\LearningHistory;
use Illuminate\Support\Facades\Auth;
use Carbon\Carbon;
use App\Models\Post;

class LearningHistoryController extends Controller
{
    public function logAktivitas(Request $request)
    {
        $request->validate([
            'post_id'  => 'required|string',
            'duration' => 'required|numeric',
        ]);

        $userId = Auth::id();
        $postId = $request->post_id;
        $durationTambah = $request->duration;

        $hariIni = Carbon::today();

        $riwayat = LearningHistory::where('user_id', $userId)
                    ->where('post_id', $postId)
                    ->where('created_at', '>=', $hariIni)
                    ->first();

        if ($riwayat) {
            $riwayat->increment('duration', $durationTambah);
        } else {
            LearningHistory::create([
                'user_id'  => $userId,
                'post_id'  => $postId,
                'duration' => $durationTambah,
            ]);
        }

        return response()->json(['message' => 'Berhasil mencatat aktivitas belajar!'], 200);
    }

    public function getStatistics(Request $request)
    {
        $userId = Auth::id();
        $hariIni = Carbon::today();

        $durasiHariIni = LearningHistory::where('user_id', $userId)
            ->where('created_at', '>=', $hariIni)
            ->sum('duration');

        $riwayatTerakhir = LearningHistory::with('post')
            ->where('user_id', $userId)
            ->orderBy('updated_at', 'desc')
            ->take(5)
            ->get();

        $totalMateriSelesai = LearningHistory::where('user_id', $userId)
            ->pluck('post_id')
            ->unique()
            ->count();


        $catatanDibuat = Post::where('user_id', $userId)->where('visibility', 'public')->count();

        $awalMinggu = Carbon::now()->startOfWeek();
        $akhirMinggu = Carbon::now()->endOfWeek();
        
        $historiMingguIni = LearningHistory::where('user_id', $userId)
            ->whereBetween('created_at', [$awalMinggu, $akhirMinggu])
            ->get();

        $grafikMentah = ['Mon' => 0, 'Tue' => 0, 'Wed' => 0, 'Thu' => 0, 'Fri' => 0, 'Sat' => 0, 'Sun' => 0];

        foreach ($historiMingguIni as $log) {
            $hari = Carbon::parse($log->created_at)->format('D');
            if (isset($grafikMentah[$hari])) {
                $grafikMentah[$hari] += $log->duration;
            }
        }

        $grafikMingguan = [
            'Sen' => $grafikMentah['Mon'],
            'Sel' => $grafikMentah['Tue'],
            'Rab' => $grafikMentah['Wed'],
            'Kam' => $grafikMentah['Thu'],
            'Jum' => $grafikMentah['Fri'],
            'Sab' => $grafikMentah['Sat'],
            'Min' => $grafikMentah['Sun'],
        ];

        $semuaTanggalBelajar = LearningHistory::where('user_id', $userId)
            ->orderBy('created_at', 'desc')
            ->get()
            ->map(function ($item) {
                return Carbon::parse($item->created_at)->format('Y-m-d');
            })
            ->unique()
            ->values()
            ->toArray();

        $streak = 0;
        $cekTanggal = Carbon::today();

        foreach ($semuaTanggalBelajar as $tanggal) {
            if ($tanggal == $cekTanggal->format('Y-m-d')) {
                $streak++;
                $cekTanggal->subDay();
            } elseif ($tanggal == Carbon::yesterday()->format('Y-m-d') && $streak == 0) {
                $streak++;
                $cekTanggal = Carbon::yesterday()->subDay();
            } else {
                break;
            }
        }

        return response()->json([
            'message' => 'Berhasil mengambil statistik belajar',
            'data' => [
                'daily_target' => Auth::user()->target_belajar ?? 0,
                'summary' => [
                    'today_duration' => $durasiHariIni,
                    'current_streak' => $streak,
                ],
                'achievements' => [
                    'notes_created' => $catatanDibuat,
                    'materials_completed' => $totalMateriSelesai,
                ],
                'weekly_chart' => $grafikMingguan,
                'recent_history' => $riwayatTerakhir,
                'active_dates' => $semuaTanggalBelajar
            ]
        ], 200);
    }
}