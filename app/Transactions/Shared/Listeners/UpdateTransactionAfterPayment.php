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
    }
}
