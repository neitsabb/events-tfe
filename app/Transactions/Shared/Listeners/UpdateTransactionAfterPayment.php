<?php

namespace App\Transactions\Shared\Listeners;

use App\Payment\Shared\Events\PaymentProcessedSuccessfully;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;

class UpdateTransactionAfterPayment
{
    /**
     * Create the event listener.
     */
    public function __construct()
    {
        //
    }

    /**
     * Handle the event.
     */
    public function handle(PaymentProcessedSuccessfully $event): void
    {
        $event->transaction->is_completed = true;
        $event->transaction->save();

        $this->saveTicketsForTransaction($event);
    }

    private function saveTicketsForTransaction($event)
    {
        $tickets = collect($event->tickets)
            ->only(['admissions', 'extras'])
            ->flatten(1)
            ->map(function ($ticket) use ($event) {
                // Créer un enregistrement pour chaque quantité
                return collect(range(1, $ticket['quantity'] ?? 1))
                    ->map(fn() => [
                        'transaction_id' => $event->transaction->id,
                        'ticket_id' => $ticket['id'],
                        // 'qr_code' => Str::uuid()->toString(), // Générer un QR unique
                        'created_at' => now(),
                        'updated_at' => now(),
                    ]);
            })
            ->flatten(1)
            ->toArray();

        \Illuminate\Support\Facades\DB::table('tickets_transactions')->insert($tickets);
    }
}
