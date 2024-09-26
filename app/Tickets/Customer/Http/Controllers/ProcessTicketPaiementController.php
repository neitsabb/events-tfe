<?php

namespace App\Tickets\Customer\Http\Controllers;

use App\Shared\Http\Controller;
use App\Tickets\Shared\Models\Ticket;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Stripe\PaymentIntent;

class ProcessTicketPaiementController extends Controller
{
    private $stripe;

    public function __construct(PaymentIntent $stripe)
    {
        $this->stripe = $stripe;
    }

    public function __invoke(Request $request): \Inertia\Response | \Illuminate\Http\RedirectResponse
    {
        $request->validate([
            'ticket_id' => 'required|exists:tickets,id',
            'payment_intent_id' => 'required|string',
        ]);

        // Utilisation de la dépendance Stripe injectée
        $paymentIntent = $this->stripe::retrieve($request->payment_intent_id);

        if ($paymentIntent->status === 'succeeded') {
            $ticket = Ticket::find($request->ticket_id);
            $ticket->sold += 1;
            $ticket->save();

            return Inertia::render('Payment/Success/View', [
                'ticket' => $ticket,
            ]);
        }

        return Redirect::route('payment.failed');
    }
}
