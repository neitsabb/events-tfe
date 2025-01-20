<?php

namespace App\Payment\Customer\Http\Controllers;

use App\Transactions\Shared\Models\Transaction;

use Inertia\Inertia;

class ShowSuccessPaymentController
{
    /**
     * Handle the incoming request.
     */
    public function __invoke()
    {
        $transaction = Transaction::where('paymentIntentId', session('paymentIntent'))->first();

        session()->forget([
            'event',
            'tickets',
            'totalAmount',
            'paymentIntent',
        ]);

        return Inertia::render('Payment/Success/View', [
            'transaction' => $transaction->id,
        ]);
    }
}
