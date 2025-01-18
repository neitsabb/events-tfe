<?php

namespace App\Payment\Customer\Http\Controllers;

use App\Shared\Http\Controller;
use App\Transactions\Shared\Models\Transaction;
use Inertia\Inertia;

class ShowSuccessPaymentController extends Controller
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
