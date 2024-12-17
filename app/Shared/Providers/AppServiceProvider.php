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
        Gate::policy(Organization::class, OrganizationPolicy::class);
    }
}
