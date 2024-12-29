<?php

namespace App\Transactions\Shared\Listeners;

use App\Payment\Shared\Events\PaymentProcessedSuccessfully;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Support\Facades\DB;

class UpdateTransactionAfterPayment
{
    /**
     * Handle the event.
     */
    public function handle(PaymentProcessedSuccessfully $event): void
    {
        $this->markTransactionAsCompleted($event->transaction);
        $this->saveTicketsForTransaction($event);
    }

    /**
     * Marque la transaction comme terminée.
     */
    private function markTransactionAsCompleted($transaction): void
    {
        $transaction->is_completed = true;
        $transaction->save();
    }

    /**
     * Sauvegarde les tickets associés à la transaction.
     */
    private function saveTicketsForTransaction(PaymentProcessedSuccessfully $event): void
    {
        // Récupère et formate les tickets
        $tickets = collect($event->tickets)
            ->only(['admissions', 'extras'])
            ->flatten(1)
            ->filter(fn($ticket) => isset($ticket['id'], $ticket['quantity'])) // Vérifie que les données nécessaires sont présentes
            ->flatMap(function ($ticket) use ($event) {
                return $this->createTicketRecords($ticket, $event->transaction->id);
            });

        // Insère les tickets en batch
        DB::table('tickets_transactions')->insert($tickets->toArray());
    }

    /**
     * Génère les enregistrements de tickets.
     */
    private function createTicketRecords(array $ticket, int $transactionId): array
    {
        return collect(range(1, $ticket['quantity'] ?? 1))->map(function () use ($ticket, $transactionId) {
            return [
                'transaction_id' => $transactionId,
                'ticket_id' => $ticket['id'],
                'qr_code' => \Illuminate\Support\Str::uuid()->toString(),
                'created_at' => now(),
                'updated_at' => now(),
            ];
        })->toArray();
    }
}
