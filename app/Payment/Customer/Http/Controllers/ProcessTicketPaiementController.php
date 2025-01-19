<?php

namespace App\Payment\Customer\Http\Controllers;

use Stripe\Stripe;
use Inertia\Inertia;
use Stripe\PaymentIntent;
use Illuminate\Http\Request;
use App\Shared\Http\Controller;
use Illuminate\Support\Facades\Session;
use Illuminate\Support\Facades\Redirect;
use App\Transactions\Shared\Models\Transaction;
use App\Payment\Shared\Events\PaymentProcessedSuccessfully;

class ProcessTicketPaiementController extends Controller
{
    private $stripe;

    public function __construct(PaymentIntent $stripe)
    {
        Stripe::setApiKey(config('services.stripe.secret'));

        $this->stripe = $stripe;
    }

    public function __invoke(Request $request): \Inertia\Response | \Illuminate\Http\RedirectResponse
    {
        $transaction = Transaction::where('paymentIntentId', session('paymentIntent'))->first();

        // Vérifier si la transaction existe
        if (!$transaction) {
            return Redirect::route('payment.failed');
        }

        // Si le montant de la transaction est de 0 €, traiter directement
        if ($transaction->amount === 0) {
            PaymentProcessedSuccessfully::dispatch($transaction, session('tickets'));

            return Redirect::route('payment.success');
        }

        // Vérifier l'état du paiement avec Stripe pour les transactions > 0 €
        $paymentIntent = $this->stripe::retrieve($request->get('payment_intent'));

        if ($paymentIntent->status === 'succeeded') {
            PaymentProcessedSuccessfully::dispatch($transaction, session('tickets'));

            return Redirect::route('payment.success');
        }

        return Redirect::route('payment.failed');
    }
}
