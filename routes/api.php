<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\SertifikasiController;
use App\Http\Controllers\NotificationController;

Route::post('/v1/register', [AuthController::class, 'register']);
Route::post('/v1/login', [AuthController::class, 'login']);

Route::middleware('auth:sanctum')->group(function () {
    
    Route::post('/v1/sertifikasi', [SertifikasiController::class, 'ajukan']);
    Route::get('/v1/sertifikasi/pending', [SertifikasiController::class, 'getPending']);
    Route::put('/v1/sertifikasi/{id}/verifikasi', [SertifikasiController::class, 'verifikasi']);
    Route::get('/v1/notifikasi', [NotificationController::class, 'getNotifikasi']);

    Route::get('/user', function (Request $request) {
        return $request->user();
    });
});