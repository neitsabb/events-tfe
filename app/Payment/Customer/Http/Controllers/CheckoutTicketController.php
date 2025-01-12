<?php

namespace App\Payment\Customer\Http\Controllers;

use App\Events\Shared\Resources\EventResource;
use App\Shared\Http\Controller;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Redirect;
use App\Shared\Services\StripeService;

use App\Tickets\Customer\Http\Requests\CheckoutRequest;

class CheckoutTicketController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(CheckoutRequest $request, StripeService $paymentService): RedirectResponse
    {
        $checkout = $paymentService
            ->createPaymentIntent(
                $request->validated()
            );

        session([
            'event' => new EventResource($checkout['event']->load(['preferences'])),
            'tickets' => $checkout['tickets'],
            'totalAmount' => $checkout['totalAmount'],
            'paymentIntent' => $checkout['paymentIntent'],
        ]);


        return Redirect::route('checkout');
    }
}
