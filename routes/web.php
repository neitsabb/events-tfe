<?php

use Inertia\Inertia;
use App\User\Models\User;
use App\Events\Shared\Models\Event;
use Illuminate\Support\Facades\Route;
use App\Events\Shared\Enums\EventStatusEnum;
use App\Events\Shared\Resources\EventResource;
use App\Transactions\Shared\Models\Transaction;
use App\User\Customer\Http\UpdateProfileController;
use App\Auth\Http\Controllers\StoreNewUserController;
use App\Events\Admin\Http\Controllers\DeleteEventController;
use App\Auth\Http\Controllers\AuthenticatedSessionController;
use App\Auth\Http\Controllers\CompleteRegistrationController;
use App\Events\Admin\Http\Controllers\PreviewEventController;
use App\Events\Admin\Http\Controllers\PublishEventController;
use App\Auth\Http\Controllers\SendEmailVerificationController;
use App\Events\Admin\Http\Controllers\StoreNewEventController;
use App\Tickets\Admin\Http\Controllers\DeleteTicketController;
use App\Tickets\Admin\Http\Controllers\UpdateTicketController;
use App\Events\Admin\Http\Controllers\ShowEventSingleController;
use App\Tickets\Admin\Http\Controllers\StoreNewTicketController;
use App\Events\Admin\Http\Controllers\ConfigureNewEventController;
use App\Events\Admin\Http\Controllers\DisplayEventsListController;
use App\Events\Admin\Http\Controllers\HandleArchiveEventController;
use App\Payment\Customer\Http\Controllers\CheckoutTicketController;
use App\Tickets\Customer\Http\Controllers\DownloadTicketController;
use App\Events\Admin\Http\Controllers\UpdateEventSettingsController;
use App\Organization\Admin\Http\Controllers\UpdateUserRoleController;
use App\Organization\Admin\Http\Controllers\ConnectToStripeController;
use App\Organization\Admin\Http\Controllers\SetOrganizationController;
use App\Payment\Customer\Http\Controllers\ShowSuccessPaymentController;
use App\Transactions\Shared\Http\Controllers\ShowTransactionController;
use App\Organization\Admin\Http\Controllers\CheckIfUserExistsController;
use App\Organization\Admin\Http\Controllers\CheckStripeStatusController;
use App\Events\Customer\Http\Controllers\CheckEventPreferencesController;
use App\Organization\Admin\Http\Controllers\CreateOrganizationController;
use App\Organization\Admin\Http\Controllers\UpdateOrganizationController;
use App\Transactions\Customer\Http\Controllers\SaveTransactionController;
use App\Payment\Customer\Http\Controllers\ProcessTicketPaiementController;
use App\Organization\Admin\Http\Controllers\ShowOrganizationSettingsController;
use App\Organization\Admin\Http\Controllers\InviteUsersToOrganizationController;
use App\Organization\Admin\Http\Controllers\RemoveUserFromOrganizationController;

Route::middleware('guest')
    ->group(function () {
        Route::prefix('/signin')
            ->group(function () {
                Route::get('/', fn() => Inertia::render('Auth/Login/View'))->name('login');
                Route::post('/', [AuthenticatedSessionController::class, 'store'])->name('login.store');
            });


        Route::prefix('/signup')
            ->group(function () {
                Route::get('/', fn() => Inertia::render('Auth/Register/Join/View'))->name('register.join');
                Route::post('/', SendEmailVerificationController::class)->name('register.send');

                Route::get('/complete', CompleteRegistrationController::class)->name('register.complete');

                Route::post('/complete', CompleteRegistrationController::class)->name('register.complete.store');

                Route::post('/store', StoreNewUserController::class)->name('register.store');
            });
    });


Route::middleware('auth')
    ->as('shared.')
    ->group(function () {
        Route::get('/organisations/create', fn() => Inertia::render('Organizations/Customer/Create/View'))->name('organizations.create');

        Route::post('/organisations/create', CreateOrganizationController::class)->name('organizations.store');
    });

Route::get('/api/events', \App\Events\Customer\Http\Controllers\ShowEventsListController::class)->name('api.events.index');

Route::as('customer.')
    ->group(function () {

        Route::get('/logout', [AuthenticatedSessionController::class, 'destroy'])->name('logout');
        Route::get('/', function () {
            return Inertia::render('Welcome/View', [
                'events' => EventResource::collection(
                    Event::with(['tickets.transactions', 'transactions.user', 'organization'])
                        ->where('status', EventStatusEnum::PUBLISHED)
                        ->orderBy('start_date', 'desc')
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

        Route::prefix('/organizations')
            ->as('organizations.')
            ->group(function () {});

        Route::middleware('auth')
            ->group(function () {

                Route::get('/tickets/{ticketId}/download/{transaction}', DownloadTicketController::class)->name('tickets.download');



                Route::prefix('/me')
                    ->as('me.')
                    ->group(function () {
                        Route::get('/', function () {
                            return Inertia::render('Me/Profile/View');
                        })->name('profile');

                        Route::post('/', UpdateProfileController::class)->name('profile.update');

                        Route::get('/orders', function () {
                            $orders = Transaction::where('user_id', auth()->id())
                                ->with(['event', 'tickets'])
                                ->latest()
                                ->get();
                            return Inertia::render('Me/Orders/View', [
                                'orders' => $orders
                            ]);
                        })->name('orders');

                        Route::get('/orders/{transaction}', ShowTransactionController::class)->name('orders.show');

                        Route::get('/reviews', function () {
                            return Inertia::render('Me/Reviews/View');
                        })->name('reviews');
                    });
            });
    });

Route::get('/users/{email}', action: function ($email) {
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

        Route::post('/checkout/preferences', CheckEventPreferencesController::class)
            ->name('checkout.preferences');

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
                        Route::get('/preview', PreviewEventController::class)->name('preview');

                        Route::get('/transactions/{transaction}',  ShowTransactionController::class)->name('transactions.show');

                        Route::get('/{panel?}/{subpanel?}',  ShowEventSingleController::class)
                            ->name('show');

                        Route::post('/configure',  ConfigureNewEventController::class)
                            ->name('configure');

                        Route::post('/edit',  UpdateEventSettingsController::class)
                            ->name('update');

                        Route::delete('/', DeleteEventController::class)->name('delete');

                        Route::post('/archive',  HandleArchiveEventController::class)->name('handle.archive');

                        Route::post('/publish',  PublishEventController::class)->name('publish');

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

                Route::get('/settings/{panel?}', ShowOrganizationSettingsController::class)->name('settings');

                Route::post('/invite/check', CheckIfUserExistsController::class)->name('invite.check');
                Route::post('/invite', InviteUsersToOrganizationController::class)->name('invite');
                Route::delete('/invite/{email}', RemoveUserFromOrganizationController::class)->name('delete.user');

                Route::post('/organizations/settings/update', UpdateOrganizationController::class)->name('update');

                Route::post('/settings/update/role', UpdateUserRoleController::class)->name('settings.update.role');

                Route::post('/stripe/connect', ConnectToStripeController::class)->name('stripe.connect');
                Route::get('/stripe/check', CheckStripeStatusController::class)->name('stripe.check');
            });
    });
