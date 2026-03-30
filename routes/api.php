<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\SertifikasiController;
use App\Http\Controllers\NotificationController;
use App\Http\Controllers\PostController;
use App\Http\Controllers\CommentController;
use App\Http\Controllers\LikeController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\TopicController;
use App\Http\Controllers\ReportController;
use App\Http\Controllers\UserController;

Route::post('/v1/register', [AuthController::class, 'register']);
Route::post('/v1/login', [AuthController::class, 'login']);

Route::middleware('auth:sanctum')->group(function () {

    Route::post('/v1/sertifikasi', [SertifikasiController::class, 'ajukan']);
    Route::get('/v1/sertifikasi/pending', [SertifikasiController::class, 'getPending']);
    Route::put('/v1/sertifikasi/{id}/verifikasi', [SertifikasiController::class, 'verifikasi']);
    Route::get('/v1/notifikasi', [NotificationController::class, 'getNotifikasi']);
    Route::put('/v1/notifikasi/read-all', [NotificationController::class, 'markAllAsRead']);
    Route::put('/v1/notifikasi/{id}/read', [NotificationController::class, 'markAsRead']);

    // Posts
    Route::get('/v1/posts', [PostController::class, 'index']);
    Route::post('/v1/posts', [PostController::class, 'store']);
    Route::get('/v1/posts/{id}', [PostController::class, 'show']);
    Route::delete('/v1/posts/{id}', [PostController::class, 'destroy']);

    // Verify
    Route::put('/v1/posts/{id}/verify', [PostController::class, 'verify']);

    // Comments
    Route::post('/v1/posts/{postId}/comments', [CommentController::class, 'store']);
    Route::delete('/v1/comments/{id}', [CommentController::class, 'destroy']);

    // Likes
    Route::post('/v1/posts/{postId}/like', [LikeController::class, 'toggle']);
    Route::post('/v1/comments/{commentId}/like', [LikeController::class, 'toggleCommentLike']);

    // Reports
    Route::post('/v1/posts/{postId}/report', [ReportController::class, 'store']);
    Route::post('/v1/comments/{commentId}/report', [ReportController::class, 'storeCommentReport']);
    Route::get('/v1/reports', [ReportController::class, 'index']); // Admin only
    Route::put('/v1/reports/{id}', [ReportController::class, 'update']); // Admin only

    // Users
    Route::get('/v1/users', [UserController::class, 'index']);
    Route::put('/v1/users/me', [UserController::class, 'updateProfile']);

    // Categories & Topics
    Route::get('/v1/categories', [CategoryController::class, 'index']);
    Route::get('/v1/topics', [TopicController::class, 'index']);

    Route::get('/user', function (Request $request) {
        return $request->user();
    });
});