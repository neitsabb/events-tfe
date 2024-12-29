<?php

use App\Shared\Http\Middlewares\EnsureOrganizationSelected;
use App\Shared\Http\Middlewares\EnsureUserIsOrganizer;
use App\Shared\Http\Middlewares\HandleInertiaRequests;
use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__ . '/../routes/web.php',
        commands: __DIR__ . '/../routes/console.php',
        health: '/up',
    )
    ->withProviders([
        Barryvdh\DomPDF\ServiceProvider::class
    ])
    ->withMiddleware(function (Middleware $middleware) {
        $middleware->web(append: [
            EnsureOrganizationSelected::class,
            HandleInertiaRequests::class,
            \Illuminate\Http\Middleware\AddLinkHeadersForPreloadedAssets::class,
        ]);


        $middleware->alias([
            'organizer' => EnsureUserIsOrganizer::class
        ]);
    })
    ->withExceptions(function (Exceptions $exceptions) {
        //
    })->create();
