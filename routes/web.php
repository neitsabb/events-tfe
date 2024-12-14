<?php

use Inertia\Inertia;
use Illuminate\Support\Facades\Route;
use App\Events\Admin\Http\Controllers\DeleteEventController;
use App\Auth\Http\Controllers\AuthenticatedSessionController;
use App\Events\Admin\Http\Controllers\StoreNewEventController;
use App\Tickets\Admin\Http\Controllers\UpdateTicketController;
use App\Events\Admin\Http\Controllers\ShowEventSingleController;
use App\Tickets\Admin\Http\Controllers\StoreNewTicketController;
use App\Events\Admin\Http\Controllers\ConfigureNewEventController;
use App\Events\Admin\Http\Controllers\DisplayEventsListController;
use App\Events\Admin\Http\Controllers\HandleArchiveEventController;
use App\Tickets\Customer\Http\Controllers\CheckoutTicketController;
use App\Events\Admin\Http\Controllers\UpdateEventSettingsController;
use App\Organization\Admin\Http\Controllers\UpdateUserRoleController;
use App\Organization\Admin\Http\Controllers\ConnectToStripeController;
use App\Organization\Admin\Http\Controllers\SetOrganizationController;
use App\Artists\Customer\Http\Controllers\HandleFollowArtistController;
use App\Organization\Admin\Http\Controllers\CheckIfUserExistsController;
use App\Organization\Admin\Http\Controllers\CheckStripeStatusController;
use App\Organization\Admin\Http\Controllers\CreateOrganizationController;
use App\Tickets\Customer\Http\Controllers\ProcessTicketPaiementController;
use App\Organization\Admin\Http\Controllers\ShowOrganizationSettingsController;
use App\Organization\Admin\Http\Controllers\InviteUsersToOrganizationController;
use App\Organization\Admin\Http\Controllers\RemoveUserFromOrganizationController;
use App\Tickets\Admin\Http\Controllers\DeleteTicketController;
use App\User\Models\User;
use Illuminate\Http\Request;

Route::get('/', \App\Events\Customer\Http\Controllers\ShowEventsListController::class)->name('customer.home');
Route::get('/events/{slug}', \App\Events\Customer\Http\Controllers\ShowSingleEventController::class)
    ->name('customer.events.show');
Route::get('/artists', App\Artists\Customer\Http\Controllers\ShowArtistsController::class)->name('artists.index');

Route::get('/login', fn() => Inertia::render('Auth/Customer/Login/View'))->name('login');
Route::post('login', [AuthenticatedSessionController::class, 'store']);

Route::get('/register', fn() => Inertia::render('Auth/Customer/Register/View'))->name('register');

Route::get('/users/{email}', function ($email) {
    return response()->json(
        (bool) User::where('email', $email)->first()
    );
})->name('check.email');

Route::get('/checkout', function () {
    return Inertia::render('Payment/Checkout/View', [
        'event' => session('event'),
        'tickets' => session('tickets'),
        'paymentIntent' => session('paymentIntent'),
        'totalAmount' => session('totalAmount'),
    ]);
})->name('checkout');

Route::prefix('/payment')
    ->as('payment.')
    ->group(function () {

        Route::post('/checkout', CheckoutTicketController::class)
            ->name('checkout');

        Route::post('/process', ProcessTicketPaiementController::class)
            ->name('process');

        Route::post('/failed', fn() => Inertia::render('Payment/Failed'))
            ->name('failed');

        Route::get('/cancel', fn() => Inertia::render('Payment/Cancel'))
            ->name('cancel');
    });

Route::middleware('auth')
    ->group(function () {
        // Route::post('artists/{artist}/follow', HandleFollowArtistController::class)->name('artists.handle.follow');
    });

Route::prefix('/dashboard')
    ->middleware(['auth', 'verified']) // Todo add "organisator" middleware
    ->group(function () {
        Route::get('/', DisplayEventsListController::class)->name('index');
        Route::get('/logout', [AuthenticatedSessionController::class, 'destroy'])->name('logout');

        Route::prefix('/events')
            ->as('events.')
            ->group(function () {
                // Route::get('/', DisplayEventsListController::class)->name('index');

                Route::post('/', StoreNewEventController::class)->name('store');

                Route::prefix('/{event}')
                    ->whereUuid('event')
                    ->group(function () {
                        Route::get('/{panel?}/{subpanel?}',  ShowEventSingleController::class)
                            ->name('show');

                        Route::post('/configure',  ConfigureNewEventController::class)
                            ->name('configure');

                        Route::post('/tickets', StoreNewTicketController::class)
                            ->name('tickets.store');

                        Route::post('/tickets/update', UpdateTicketController::class)->name('tickets.update');

                        Route::delete('/tickets/{ticket}', DeleteTicketController::class)->name('tickets.destroy');

                        Route::post('/edit',  UpdateEventSettingsController::class)
                            ->name('update');

                        Route::delete('/', DeleteEventController::class)->name('delete');

                        Route::post('/archive',  HandleArchiveEventController::class)->name('handle.archive');
                    });
            });

        Route::prefix('/organisations')
            ->as('organizations.')
            ->group(function () {
                Route::post('/set-organisation', SetOrganizationController::class)->name('switch');

                Route::post('/create', CreateOrganizationController::class)->name('store');

                Route::get('/settings/{panel?}', ShowOrganizationSettingsController::class)->name('settings');

                Route::post('/invite/check', CheckIfUserExistsController::class)->name('invite.check');
                Route::post('/invite', InviteUsersToOrganizationController::class)->name('invite');
                Route::delete('/invite/{email}', RemoveUserFromOrganizationController::class)->name('delete.user');

                Route::post('/settings/update/role', UpdateUserRoleController::class)->name('settings.update.role');

                Route::post('/stripe/connect', ConnectToStripeController::class)->name('stripe.connect');
                Route::get('/stripe/check', CheckStripeStatusController::class)->name('stripe.check');
            });
    });


require __DIR__ . '/auth.php';
