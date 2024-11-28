<?php

namespace App\Tickets\Customer\Http\Controllers;

use App\Events\Shared\Models\Event;
use App\Shared\Http\Controller;
use App\Tickets\Shared\Models\Ticket;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Stripe\PaymentIntent;
use Stripe\Stripe;
use Stripe\StripeClient;

class CheckoutTicketController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(Request $request): \Inertia\Response
    {
        Stripe::setApiKey(env('STRIPE_SECRET'));

        dd($request->all());

        $ticket = Ticket::findOrFail($request->ticket_id);

        $paymentIntent = PaymentIntent::create([
            'amount' => $ticket->price * 100, // Montant en centimes
            'currency' => 'eur',
            'transfer_data' => [
                'destination' => $ticket->event->organization->stripe_account_id,
            ],
        ]);

        return Inertia::render('Payment/Checkout/View', [
            'event' => $ticket->event,
            'ticket' => $ticket,
            'paymentIntent' => $paymentIntent->client_secret,
        ]);
    }
}
