<?php

namespace App\Tickets\Customer\Http\Controllers;

use App\Shared\Http\Controller;
use App\Tickets\Shared\Models\Ticket;
use App\Transactions\Shared\Models\Transaction;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Session;
use Inertia\Inertia;
use Stripe\PaymentIntent;
use Stripe\Stripe;

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

        if (!$transaction) {
            return Redirect::route('payment.failed');
        }

        $paymentIntent = $this->stripe::retrieve($request->get('payment_intent'));

        if ($paymentIntent->status === 'succeeded') {
            foreach (session('tickets') as $tickets) {
                foreach ($tickets as $t) {
                    $ticket = Ticket::find($t['id']);
                    $ticket->sold += $t['quantity'];
                    $ticket->save();
                }
            }

            $transaction->is_completed = true;
            $transaction->save();

            return Redirect::route('payment.success');
        }

        return Redirect::route('payment.failed');
    }
}
