<?php

namespace App\Organization\Admin\Http\Controllers;

use App\Shared\Http\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Stripe\Account;
use Stripe\AccountLink;
use Stripe\Stripe;
use Illuminate\Support\Facades\Session;
use Inertia\Inertia;

class ConnectToStripeController extends Controller
{
    /**
     * Handle the incoming request.
     *
     */
    public function __invoke(Request $request)
    {
        Stripe::setApiKey(env('STRIPE_SECRET'));

        $account = Account::create([
            'type' => 'standard',
            'capabilities' => [
                'card_payments' => ['requested' => true],
                'transfers' => ['requested' => true],
            ],
            'business_type' => 'individual', // TODO: Récupérer le type de l'organisation
            'country' => 'FR', // TODO: Récupérer le pays de l'organisation
        ]);

        $accountLink = AccountLink::create([
            'account' => $account->id,
            'refresh_url' => route('organizations.stripe.connect'),
            'return_url' => route('dashboard'),
            'type' => 'account_onboarding',
        ]);

        Session::get('selected_organization')
            ->update([
                'stripe_account_id' => $account->id,
            ]);

        return Inertia::location($accountLink->url);
    }
}
