<?php

namespace App\Payment\Customer\Http\Controllers;

use App\Events\Shared\Resources\EventResource;

use App\Payment\Shared\Events\PaymentProcessedSuccessfully;

use App\Shared\Services\StripeService;

use App\Tickets\Customer\Http\Requests\CheckoutRequest;
use App\Tickets\Shared\Models\Ticket;

use App\Transactions\Shared\Models\Transaction;

use Illuminate\Database\Eloquent\Collection;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Redirect;


class CheckoutTicketController
{

    /**
     * Summary of __invoke
     * @param \App\Tickets\Customer\Http\Requests\CheckoutRequest $request
     * @param \App\Shared\Services\StripeService $paymentService
     * @return \Illuminate\Http\RedirectResponse
     */
    public function __invoke(CheckoutRequest $request, StripeService $paymentService): RedirectResponse
    {
        $validated = $request->validated();

        $totalAmount = $this->calculateTotalAmount([
            ...$validated['admissions'],
            ...$validated['extras'],
        ]);

        $referenceTicket = $this->getReferenceTicket($validated['admissions'][0] ?? $validated['extras'][0]);

        if ($totalAmount === 0) {
            $this->handleFreeOrder($validated);

            return Redirect::route('payment.success');
        }

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
     * Handle a free order.
     * @param array $validatedData
     * @return void
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
            'paymentIntentId' => null,
        ]);

        session([
            'tickets' => $validatedData,
            'paymentIntent' => null,
        ]);

        PaymentProcessedSuccessfully::dispatch($transaction, $validatedData);
    }


    /**
     * Calculate the total amount of the order.
     * @param array $tickets
     * @return int
     */
    private function calculateTotalAmount(array $tickets): int
    {
        return array_reduce($tickets, function ($total, $ticket) {
            return $total + ($ticket['price'] * $ticket['quantity']);
        }, 0);
    }

    /**
     * Get the reference ticket.
     * @param array $ticket
     * @return \App\Tickets\Shared\Models\Ticket
     */
    private function getReferenceTicket(array $ticket): Ticket | Collection
    {
        return Ticket::with('event')->findOrFail($ticket['id']);
    }
}
