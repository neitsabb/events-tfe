<?php

namespace App\Shared\Providers;

use App\Events\Admin\Policies\EventPolicy;
use App\Events\Shared\Models\Event;
use App\Events\Shared\Models\EventPreference;
use App\Events\Shared\Observers\EventObserver;
use App\Events\Shared\Observers\EventPreferenceObserver;
use App\User\Models\User;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\ServiceProvider;
use Laravel\Cashier\Cashier;

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
        Cashier::useCustomerModel(User::class);

        JsonResource::withoutWrapping();

        Event::observe(EventObserver::class);
        EventPreference::observe(EventPreferenceObserver::class);

        Gate::policy(Event::class, EventPolicy::class);
    }
}
