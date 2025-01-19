<?php

namespace App\Payment\Customer\Http\Controllers;

use App\Events\Shared\Resources\EventResource;
use App\Payment\Shared\Events\PaymentProcessedSuccessfully;
use App\Shared\Http\Controller;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Redirect;
use App\Shared\Services\StripeService;

use App\Tickets\Customer\Http\Requests\CheckoutRequest;
use App\Tickets\Shared\Models\Ticket;
use App\Transactions\Shared\Models\Transaction;
use Illuminate\Database\Eloquent\Collection;

class CheckoutTicketController extends Controller
{
    public function __invoke(CheckoutRequest $request, StripeService $paymentService): RedirectResponse
    {
        // Valider les données du formulaire
        $validated = $request->validated();

        // Calculer le montant total
        $totalAmount = $this->calculateTotalAmount([
            ...$validated['admissions'],
            ...$validated['extras'],
        ]);

        $referenceTicket = $this->getReferenceTicket($validated['admissions'][0] ?? $validated['extras'][0]);

        // Gestion des commandes gratuites
        if ($totalAmount === 0) {
            $this->handleFreeOrder($validated);

            return Redirect::route('payment.success');
        }

        // Appeler le service Stripe uniquement pour les paiements
        $checkout = $paymentService->createPaymentIntent([
            ...$validated,
            'stripe_account_id' => $referenceTicket->event->organization->stripe_account_id,
            'event' => $referenceTicket->event,
        ], $totalAmount);

        session([
            'event' => new EventResource($checkout['event']->load(['preferences'])),
            'tickets' => $checkout['tickets'],
            'totalAmount' => $checkout['totalAmount'],
            'paymentIntent' => $checkout['paymentIntent'],
        ]);

        return Redirect::route('checkout');
    }

    /**
     * Gère une commande gratuite.
     */
    private function handleFreeOrder(array $validatedData): void
    {
        $referenceTicket = $this->getReferenceTicket($validatedData['admissions'][0] ?? $validatedData['extras'][0]);

        // Créer une transaction de 0 €
        $transaction = Transaction::create([
            'user_id' => auth()->id(),
            'event_id' => $referenceTicket->event->id,
            'reference' => Transaction::generateReference(),
            'amount' => 0,
            'is_completed' => true,
            'paymentIntentId' => null, // Pas de PaymentIntent pour une commande gratuite
        ]);

        // Associer les billets vendus à la transaction
        session([
            'tickets' => $validatedData, // Stoker les billets pour l'événement
            'paymentIntent' => null, // Pas de PaymentIntent
        ]);

        PaymentProcessedSuccessfully::dispatch($transaction, $validatedData);
    }

    private function calculateTotalAmount(array $tickets): int
    {
        return array_reduce($tickets, function ($total, $ticket) {
            return $total + ($ticket['price'] * $ticket['quantity']);
        }, 0);
    }

    private function getReferenceTicket(array $ticket): Ticket
    {
        return Ticket::with('event')->findOrFail($ticket['id']);
    }
}
