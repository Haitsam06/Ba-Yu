<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    if (auth()->check()) {
        return redirect('/app');
    }
    
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
    // Strip any path component & enforce safe filename pattern
    $safeName = basename($filename);
    if ($safeName !== $filename || ! preg_match('/^[a-zA-Z0-9_\-\.]+$/', $safeName)) {
        return response('Nama file tidak valid', 400);
    }

    $candidates = [
        storage_path('app/sertifikat/'.$safeName),
        storage_path('app/public/sertifikat/'.$safeName),
    ];
    $allowedRoots = [
        realpath(storage_path('app/sertifikat')),
        realpath(storage_path('app/public/sertifikat')),
    ];

    foreach ($candidates as $i => $path) {
        if (! File::exists($path)) {
            continue;
        }
        $real = realpath($path);
        if ($real && $allowedRoots[$i] && str_starts_with($real, $allowedRoots[$i])) {
            return response()->file($real);
        }
    }

    return response('Waduh der, file fisiknya beneran kosong/nggak ada di VS Code lu! Coba upload ulang pengajuan baru.', 404);
})->where('filename', '[A-Za-z0-9_\-\.]+');

Route::get('/app/{any?}', function () {
    return view('frontend');
})->where('any', '.*');

require __DIR__.'/auth.php';
