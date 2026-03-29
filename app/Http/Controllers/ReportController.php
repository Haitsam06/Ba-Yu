<?php

namespace App\Http\Controllers;

use App\Models\Report;
use App\Models\Post;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ReportController extends Controller
{
    public function store(Request $request, $postId)
    {
        $request->validate([
            'reason' => 'required|string|max:255',
            'description' => 'required|string',
        ]);

        $post = Post::find($postId);
        if (!$post) {
            return response()->json(['message' => 'Post tidak ditemukan'], 404);
        }

        $report = Report::create([
            'reporter_id' => Auth::id(),
            'post_id' => $postId,
            'reason' => $request->reason,
            'description' => $request->description,
        ]);

        return response()->json([
            'message' => 'Report berhasil dikirim',
            'data' => $report
        ], 201);
    }

    public function index()
    {
        if (Auth::user()->role !== 'admin') {
            return response()->json(['message' => 'Akses ditolak'], 403);
        }

        $reports = Report::with(['reporter', 'post'])->orderBy('created_at', 'desc')->get();

        return response()->json([
            'message' => 'Berhasil mengambil data report',
            'data' => $reports
        ], 200);
    }

    public function update(Request $request, $id)
    {
        if (Auth::user()->role !== 'admin') {
            return response()->json(['message' => 'Akses ditolak'], 403);
        }

        $request->validate([
            'status' => 'required|in:pending,resolved,rejected',
            'admin_note' => 'nullable|string'
        ]);

        $report = Report::find($id);
        if (!$report) {
            return response()->json(['message' => 'Report tidak ditemukan'], 404);
        }

        $report->update([
            'status' => $request->status,
            'admin_note' => $request->admin_note
        ]);

        return response()->json([
            'message' => 'Status report berhasil diupdate',
            'data' => $report
        ], 200);
    }
}
