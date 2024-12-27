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

        $paymentIntent = $this->stripe::retrieve($request->get('payment_intent'));

        if ($paymentIntent->status === 'succeeded') {
            foreach (session('tickets') as $t) {
                foreach ($t as $_ticket) {
                    $ticket = Ticket::find($_ticket['id']);
                    $ticket->sold += $_ticket['quantity'];
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
