<?php

use App\Auth\Http\Controllers\ProfileController;
use App\Events\Admin\Http\Controllers\DisplayEventsListController;
use App\Events\Admin\Http\Controllers\StoreNewEventController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::prefix('/dashboard')
    ->middleware(['auth', 'verified'])
    ->group(function () {
        Route::get('/', fn () => Inertia::render('Dashboard/Admin/Index'))->name('dashboard');

        Route::get('/events', DisplayEventsListController::class)->name('events.index');

        Route::post('events', StoreNewEventController::class)->name('events.store');
    });

// Breeze routes
// Route::get('/dashboard', function () {
//     return Inertia::render('Dashboard');
// })->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__ . '/auth.php';
