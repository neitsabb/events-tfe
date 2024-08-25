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
use App\Organization\Admin\Http\Controllers\InviteUserToOrganizationController;
use App\Organization\Admin\Http\Controllers\ShowOrganizationSettingsController;

Route::middleware('guest')
    ->group(function () {
        Route::get('/', \App\Events\Customer\Http\Controllers\ShowEventsListController::class)->name('customer.home');
        Route::get('/events/{slug}', \App\Events\Customer\Http\Controllers\ShowSingleEventController::class)
            ->name('customer.events.show');
        Route::get('/artists', App\Artists\Customer\Http\Controllers\ShowArtistsController::class)->name('artists.index');

        Route::get('/login', fn() => Inertia::render('Auth/Customer/Login/View'))->name('login');
        Route::post('login', [AuthenticatedSessionController::class, 'store']);

        Route::get('/register', fn() => Inertia::render('Auth/Customer/Register/View'))->name('register');
    });

Route::prefix('/dashboard')
    ->middleware(['auth', 'verified']) // Todo add "organisator" middleware
    ->group(function () {
        Route::get('/', fn() => Inertia::render('Dashboard/Admin/Index'))->name('dashboard');
        Route::get('/logout', [AuthenticatedSessionController::class, 'destroy'])->name('logout');

        Route::prefix('/events')
            ->as('events.')
            ->group(function () {
                Route::get('/', DisplayEventsListController::class)->name('index');

                Route::post('/', StoreNewEventController::class)->name('store');

                Route::prefix('/{id}')
                    ->whereUuid('id')
                    ->group(function () {
                        Route::get('/{panel?}/{subpanel?}',  ShowEventSingleController::class)
                            ->name('show');

                        Route::post('/configure',  ConfigureNewEventController::class)
                            ->name('configure');

                        Route::post('/tickets', StoreNewTicketController::class)
                            ->name('tickets.store');

                        Route::post('/tickets/update', UpdateTicketController::class)->name('tickets.update');
                    });
            });

        Route::prefix('/organisations')
            ->as('organizations.')
            ->group(function () {
                Route::post('/set-organisation', SetOrganizationController::class)->name('switch');

                Route::post('/create', CreateOrganizationController::class)->name('store');

                Route::get('/settings/{panel?}', ShowOrganizationSettingsController::class)->name('settings');

                Route::post('/invite', InviteUserToOrganizationController::class)->name('invite');
            });
    });


require __DIR__ . '/auth.php';
