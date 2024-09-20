<?php

namespace App\Tickets\Customer\Http\Controllers;

use App\Events\Shared\Models\Event;
use App\Shared\Http\Controller;
use App\Tickets\Shared\Models\Ticket;
use Illuminate\Http\Request;
use Stripe\Stripe;
use Stripe\StripeClient;

class PurchaseTicketController extends Controller
{
    /**
     * Handle the incoming request.
     *
     * @return \Illuminate\Http\Response
     */
    public function __invoke(Event $event, Request $request)
    {
        Stripe::setApiKey(env('STRIPE_SECRET'));

        $ticket = Ticket::findOrFail($request->ticket_id);

        // Configuration Stripe
        $stripe = new StripeClient(env('STRIPE_SECRET'));

        $checkoutSession = \Stripe\Checkout\Session::create([
            'payment_method_types' => ['card'],
            'line_items' => [[
                'price_data' => [
                    'currency' => 'eur',
                    'product_data' => [
                        'name' => $ticket->name,
                    ],
                    'unit_amount' => $ticket->price * 100,
                ],
                'quantity' => 1,
            ]],
            'mode' => 'payment',
            'success_url' => route('payment.success', ['session_id' => '{CHECKOUT_SESSION_ID}']),
            'cancel_url' => route('payment.cancel'),
            'payment_intent_data' => [
                'transfer_data' => [
                    'destination' => $event->organization->stripe_account_id,
                ],
            ],
        ]);


        $ticket->update([
            'sold' => $ticket->sold + 1,
        ]);

        $ticket->save();

        // Redirige l'utilisateur vers la session de Checkout
        return redirect()->away($checkoutSession->url);
    }
}
