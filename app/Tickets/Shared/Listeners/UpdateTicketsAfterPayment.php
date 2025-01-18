<?php

namespace App\Tickets\Shared\Listeners;

use App\Payment\Shared\Events\PaymentProcessedSuccessfully;
use App\Tickets\Shared\Models\Ticket;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;

class UpdateTicketsAfterPayment
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
        foreach ($event->tickets as $ticket) {
            foreach ($ticket as $t) {
                $ticket = Ticket::find($t['id']);
                $ticket->sold += $t['quantity'];
                $ticket->save();
            }
        }

        $event->transaction->is_completed = true;
        $event->transaction->save();
    }
}
