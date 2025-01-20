<?php

namespace App\Shared\Http\Middlewares;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Symfony\Component\HttpFoundation\Response;

class EnsureUserIsOrganizer
{
    /**
     * Check if the user is an organizer
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        if (!auth()->check() || !auth()->user()->isOrganizer()) {
            return Redirect::route('shared.organizations.create');
        }

        return $next($request);
    }
}
