<?php

namespace App\Shared\Providers;

use App\Events\Shared\Models\Event;
use App\Events\Shared\Observers\EventObserver;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\ServiceProvider;

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
        JsonResource::withoutWrapping();

        Event::observe(EventObserver::class);
    }
}
