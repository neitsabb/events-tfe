<?php

namespace App\Shared\Providers;

use App\User\Models\User;
use Laravel\Cashier\Cashier;
use App\Events\Shared\Models\Event;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\ServiceProvider;
use App\Events\Admin\Policies\EventPolicy;
use App\Events\Shared\Models\EventPreference;
use App\Events\Shared\Observers\EventObserver;
use App\Organization\Shared\Models\Organization;
use Illuminate\Http\Resources\Json\JsonResource;
use App\Organization\Admin\Policies\OrganizationPolicy;
use App\Events\Shared\Observers\EventPreferenceObserver;
use App\Payment\Shared\Events\PaymentProcessedSuccessfully;
use App\Tickets\Shared\Listeners\UpdateTicketsAfterPayment;
use App\Transactions\Shared\Listeners\UpdateTransactionAfterPayment;
use App\User\Listeners\SendConfirmationOrder;
use Illuminate\Support\Facades\Event as EventDispatcher;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        EventDispatcher::listen(
            PaymentProcessedSuccessfully::class,
            UpdateTicketsAfterPayment::class
        );
        EventDispatcher::listen(
            PaymentProcessedSuccessfully::class,
            UpdateTransactionAfterPayment::class
        );
        EventDispatcher::listen(
            PaymentProcessedSuccessfully::class,
            SendConfirmationOrder::class
        );

        Cashier::useCustomerModel(User::class);

        JsonResource::withoutWrapping();

        Event::observe(EventObserver::class);
        EventPreference::observe(EventPreferenceObserver::class);

        Gate::policy(Event::class, EventPolicy::class);
        Gate::policy(Organization::class, OrganizationPolicy::class);
    }
}
