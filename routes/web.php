<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\File;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::get('/storage/sertifikat/{filename}', function ($filename) {
    $path1 = storage_path('app/sertifikat/' . $filename);
    
    $path2 = storage_path('app/public/sertifikat/' . $filename);

    if (File::exists($path1)) {
        return response()->file($path1);
    } elseif (File::exists($path2)) {
        return response()->file($path2);
    }

    return response('Waduh der, file fisiknya beneran kosong/nggak ada di VS Code lu! Coba upload ulang pengajuan baru.', 404);
});

Route::get('/app/{any?}', function () {
    return view('frontend');
})->where('any', '.*');

require __DIR__.'/auth.php';
