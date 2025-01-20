<?php

namespace App\Payment\Customer\Http\Controllers;

use App\Transactions\Shared\Models\Transaction;

use App\Payment\Shared\Events\PaymentProcessedSuccessfully;

use Illuminate\Support\Facades\Redirect;
use Illuminate\Http\Request;

use Stripe\Stripe;
use Stripe\PaymentIntent;

class ProcessTicketPaiementController
{

    public function __construct(private PaymentIntent $stripe)
    {
        Stripe::setApiKey(config('services.stripe.secret'));
    }

    /**
     * Process the order if the payment is successful
     * @param \Illuminate\Http\Request $request
     * @return \Inertia\Response|\Illuminate\Http\RedirectResponse
     */
    public function __invoke(Request $request): \Inertia\Response | \Illuminate\Http\RedirectResponse
    {
        $transaction = Transaction::where('paymentIntentId', session('paymentIntent'))->first();

        if (!$transaction) {
            return Redirect::route('payment.failed');
        }

        if ($transaction->amount === 0) {
            PaymentProcessedSuccessfully::dispatch($transaction, session('tickets'));

            return Redirect::route('payment.success');
        }

        $paymentIntent = $this->stripe::retrieve($request->get('payment_intent'));

        if ($paymentIntent->status === 'succeeded') {
            PaymentProcessedSuccessfully::dispatch($transaction, session('tickets'));

            return Redirect::route('payment.success');
        }

        return Redirect::route('payment.failed');
    }
}
