<?php

namespace App\Events\Admin\Http\Controllers;

use App\Shared\Http\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Stripe\Account;
use Stripe\AccountLink;
use Stripe\Stripe;

class ConnectToStripeController extends Controller
{
    /**
     * Handle the incoming request.
     *
     */
    public function __invoke(Request $request)
    {
        Stripe::setApiKey(env('STRIPE_SECRET'));

        $account = Account::create();

        $accountLink = AccountLink::create([
            'account' => $account->id,
            'refresh_url' => route('organizations.stripe.connect'),
            'return_url' => route('dashboard'),
            'type' => 'account_onboarding',
        ]);

        $request->user()->stripe_id = $account->id;
        $request->user()->save();

        return Redirect::to($accountLink->url);
    }
}
