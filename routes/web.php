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
use App\Events\Admin\Http\Controllers\UpdateEventSettingsController;
use App\Organization\Admin\Http\Controllers\UpdateUserRoleController;
use App\Organization\Admin\Http\Controllers\ConnectToStripeController;
use App\Organization\Admin\Http\Controllers\SetOrganizationController;
use App\Events\Shared\Models\Event;
use App\Events\Shared\Resources\EventResource;
use App\Organization\Admin\Http\Controllers\CheckIfUserExistsController;
use App\Organization\Admin\Http\Controllers\CheckStripeStatusController;
use App\Organization\Admin\Http\Controllers\CreateOrganizationController;
use App\Organization\Admin\Http\Controllers\ShowOrganizationSettingsController;
use App\Organization\Admin\Http\Controllers\InviteUsersToOrganizationController;
use App\Organization\Admin\Http\Controllers\RemoveUserFromOrganizationController;
use App\Payment\Customer\Http\Controllers\CheckoutTicketController;
use App\Payment\Customer\Http\Controllers\ProcessTicketPaiementController;
use App\Payment\Customer\Http\Controllers\ShowSuccessPaymentController;
use App\Tickets\Admin\Http\Controllers\DeleteTicketController;
use App\Transactions\Customer\Http\Controllers\SaveTransactionController;
use App\Transactions\Shared\Models\Transaction;
use App\User\Models\User;
use Illuminate\Http\RedirectResponse;

Route::get('/login', fn() => Inertia::render('Auth/Customer/Login/View'))->name('login');
Route::post('login', [AuthenticatedSessionController::class, 'store']);

Route::get('/register', fn() => Inertia::render('Auth/Customer/Register/View'))->name('register');

Route::as('customer.')
    ->group(function () {

        Route::get('/', function () {
            return Inertia::render('Welcome/View', [
                'events' => EventResource::collection(
                    Event::query()
                        ->limit(6)
                        ->get()
                )
            ]);
        })->name('home');

        Route::prefix('/events')
            ->as('events.')
            ->group(function () {
                Route::get('/', \App\Events\Customer\Http\Controllers\ShowEventsListController::class)->name('index');

                Route::get('/{slug}', \App\Events\Customer\Http\Controllers\ShowSingleEventController::class)
                    ->name('show');
            });

        Route::prefix('/me')
            ->as('me.')
            ->middleware('auth')
            ->group(function () {
                Route::get('/', function () {
                    return Inertia::render('Me/Profile/View');
                })->name('profile');

                Route::get('/orders', function () {
                    return Inertia::render('Me/Orders/View');
                })->name('orders');

                Route::get('/orders/{id}', function ($id) {

                    return Inertia::render('Me/Orders/Show/View', [
                        'transaction' => Transaction::with('tickets')->where('id', $id)->first()
                    ]);
                })->name('orders.show');

                Route::get('/reviews', function () {
                    return Inertia::render('Me/Reviews/View');
                })->name('reviews');
            });
    });

// Route::get('/artists', App\Artists\Customer\Http\Controllers\ShowArtistsController::class)->name('artists.index');

Route::get('/users/{email}', function ($email) {
    return response()->json(
        (bool) User::where('email', $email)->first()
    );
})->name('check.email');

Route::get('/checkout', function () {
    $transaction = Transaction::where('paymentIntentId', session('paymentIntent'))->first();


    if ($transaction && $transaction->is_completed) {
        return redirect(route('payment.success'));
    }

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

        Route::get('/processed', ProcessTicketPaiementController::class)
            ->name('process');

        Route::post('/processing', SaveTransactionController::class)
            ->name('save');

        Route::get('/success', ShowSuccessPaymentController::class)
            ->name('success');

        Route::get('/failed', fn() => Inertia::render('Payment/Failed/View'))
            ->name('failed');

        Route::get('/cancel', fn() => Inertia::render('Payment/Cancel/View'))
            ->name('cancel');
    });

Route::prefix('/dashboard')
    ->middleware([
        'auth',
        'verified',
        'organizer'
    ])
    ->group(function () {
        Route::get('/', DisplayEventsListController::class)->name('dashboard');
        Route::get('/logout', [AuthenticatedSessionController::class, 'destroy'])->name('logout');


        Route::prefix('/events')
            ->as('events.')
            ->group(function () {
                Route::post('/', StoreNewEventController::class)->name('store');

                Route::prefix('/{event}')
                    ->whereUuid('event')
                    ->group(function () {
                        Route::get('/{panel?}/{subpanel?}',  ShowEventSingleController::class)
                            ->name('show');

                        Route::post('/configure',  ConfigureNewEventController::class)
                            ->name('configure');

                        Route::post('/edit',  UpdateEventSettingsController::class)
                            ->name('update');

                        Route::delete('/', DeleteEventController::class)->name('delete');

                        Route::post('/archive',  HandleArchiveEventController::class)->name('handle.archive');

                        Route::prefix('/tickets')
                            ->as('tickets.')
                            ->group(function () {
                                Route::post('/', StoreNewTicketController::class)
                                    ->name('store');

                                Route::post('/update', UpdateTicketController::class)
                                    ->name('update');

                                Route::delete('/{ticket}', DeleteTicketController::class)
                                    ->name('delete');
                            });
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
