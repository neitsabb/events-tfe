<?php

namespace App\Organization\Admin\Http\Controllers;


use App\Organization\Admin\Enums\OrganizationStripeStatusEnum;
use App\Shared\Services\StripeService;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Session;
use Illuminate\Support\Facades\Redirect;

class CheckStripeStatusController
{
    /**
     * Check the status of the stripe account
     */
    public function __invoke(StripeService $stripeService)
    {
        $organization = Session::get('selected_organization');
        $stripeAccountId = $organization->stripe_account_id;

        if (!$stripeAccountId) return Redirect::route('organizations.stripe.connect');

        if ($stripeService->checkStatus($stripeAccountId)) {
            Session::get('selected_organization')
                ->update([
                    'stripe_status' => OrganizationStripeStatusEnum::COMPLETE->value,
                ]);
            return Redirect::route('dashboard');
        }

        return Redirect::route('dashboard')->withErrors('Une erreur est survenue lors de la vérification du compte Stripe');
    }
}
