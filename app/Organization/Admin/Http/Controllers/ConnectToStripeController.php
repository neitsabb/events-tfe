<?php

namespace App\Organization\Admin\Http\Controllers;

use App\Shared\Http\Controller;
use App\Shared\Services\StripeService;

use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\Session;
use Inertia\Inertia;

class ConnectToStripeController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(StripeService $stripeService)
    {
        Gate::authorize('connect', Session::get('selected_organization'));

        $callback = $stripeService->connect();

        Session::get('selected_organization')
            ->update([
                'stripe_account_id' => $callback['accountId'],
            ]);

        return Inertia::location($callback['accountUrl']);
    }
}
