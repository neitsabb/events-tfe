<?php

use Inertia\Inertia;
use Illuminate\Support\Facades\Route;
use Illuminate\Foundation\Application;
use App\Auth\Http\Controllers\ProfileController;
use App\Auth\Http\Controllers\AuthenticatedSessionController;
use App\Events\Admin\Http\Controllers\StoreNewEventController;
use App\Tickets\Admin\Http\Controllers\UpdateTicketController;
use App\Events\Admin\Http\Controllers\ShowEventSingleController;
use App\Tickets\Admin\Http\Controllers\StoreNewTicketController;
use App\Events\Admin\Http\Controllers\ConfigureNewEventController;
use App\Events\Admin\Http\Controllers\DisplayEventsListController;
use App\Organization\Admin\Http\Controllers\SetOrganizationController;
use App\Organization\Admin\Http\Controllers\CreateOrganizationController;
use App\Organization\Admin\Http\Controllers\ShowOrganizationSettingsController;

// Customer routes
Route::get('/', \App\Events\Customer\Http\Controllers\ShowEventsListController::class)->name('customer.home');
Route::get('/events/{slug}', \App\Events\Customer\Http\Controllers\ShowSingleEventController::class)
    ->name('customer.events.show');
Route::get('/artists', App\Artists\Customer\Http\Controllers\ShowArtistsController::class)->name('artists.index');

Route::get('/login', fn() => Inertia::render('Auth/Customer/Login/View'))->name('login');
Route::post('login', [AuthenticatedSessionController::class, 'store']);

Route::get('/register', fn() => Inertia::render('Auth/Customer/Register/View'))->name('register');

Route::get('/logout', [AuthenticatedSessionController::class, 'destroy'])->name('logout');
Route::prefix('/dashboard')
    ->middleware(['auth', 'verified'])
    ->group(function () {
        // Route::get('/', fn() => Inertia::render('Dashboard/Admin/Index'))->name('dashboard');

        Route::get('/', DisplayEventsListController::class)->name('dashboard');

        Route::post('events', StoreNewEventController::class)->name('events.store');

        Route::get('events/{id}/{panel?}/{subpanel?}',  ShowEventSingleController::class)
            ->whereUuid('id')
            ->name('events.show');

        Route::post('events/{id}/configure',  ConfigureNewEventController::class)
            ->whereUuid('id')
            ->name('events.configure');

        Route::post('events/{id}/tickets', StoreNewTicketController::class)
            ->whereUuid('id')
            ->name('events.tickets.store');

        Route::post('events/{id}/tickets/update', UpdateTicketController::class)->name('events.tickets.update');

        Route::post('/set-organisation', SetOrganizationController::class)->name('organizations.switch');

        Route::post('/organisations/create', CreateOrganizationController::class)->name('organizations.store');

        Route::get('/organisations/settings/{panel?}', ShowOrganizationSettingsController::class)->name('organizations.settings');
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
