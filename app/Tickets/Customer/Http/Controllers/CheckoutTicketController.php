<?php

namespace App\Tickets\Customer\Http\Controllers;

use App\Shared\Http\Controller;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Redirect;
use App\Tickets\Customer\Services\StripeService;

use App\Tickets\Customer\Http\Requests\CheckoutRequest;
use App\Transactions\Shared\Models\Transaction;

class CheckoutTicketController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(CheckoutRequest $request, StripeService $paymentService): RedirectResponse
    {


        $response = $paymentService
            ->createPaymentIntent(
                $request->validated()
            );

        session([
            'event' => $response['event'],
            'tickets' => $response['tickets'],
            'totalAmount' => $response['totalAmount'],
            'paymentIntent' => $response['paymentIntent'],
        ]);

        return Redirect::route('checkout');
    }
}
