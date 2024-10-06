<?php

namespace App\Organization\Admin\Http\Controllers;

use App\Organization\Admin\Enums\OrganizationStripeStatusEnum;
use App\Shared\Http\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Session;
use Stripe\Account;
use Stripe\Stripe;

class CheckStripeStatusController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(Request $request)
    {
        $organization = Session::get('selected_organization');
        $stripeAccountId = $organization->stripe_account_id;

        if (!$stripeAccountId) return Redirect::route('organizations.stripe.connect');

        Stripe::setApiKey(env('STRIPE_SECRET'));

        $account = Account::retrieve($stripeAccountId);

        if ($account->charges_enabled && $account->payouts_enabled) {
            $organization->stripe_status = OrganizationStripeStatusEnum::COMPLETE;
            $organization->save();

            Log::info('Stripe account is now complete', [
                'organization_id' => $organization->id,
            ]);

            return Redirect::route('dashboard');
        }

        dd($account);
    }
}
