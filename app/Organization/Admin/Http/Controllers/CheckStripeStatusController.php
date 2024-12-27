<?php

namespace App\Organization\Admin\Http\Controllers;

use Illuminate\Http\Request;
use App\Shared\Http\Controller;
use Illuminate\Support\Facades\Session;
use Illuminate\Support\Facades\Redirect;
use App\Organization\Admin\Enums\OrganizationStripeStatusEnum;
use App\Shared\Services\StripeService;

class CheckStripeStatusController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(Request $request, StripeService $stripeService)
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
    }
}
