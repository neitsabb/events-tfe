<?php

namespace App\Shared\Http\Middlewares;

use Closure;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Session;

class EnsureOrganizationSelected
{

    /**
     * Check if the user has an organization selected
     *
     * @param \Illuminate\Http\Request $request
     * @param \Closure $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        $selectedOrganization = Session::get('selected_organization');

        if (!$selectedOrganization) {
            $user = Auth::user();
            $selectedOrganization = $user?->organizations()->first();

            if ($selectedOrganization) {
                Session::put('selected_organization', $selectedOrganization);
            }
        }

        return $next($request);
    }
}
