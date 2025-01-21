<?php

namespace App\User\Listeners;

use App\Payment\Shared\Events\PaymentProcessedSuccessfully;
use App\User\Mail\OrderConfirmation;
use Illuminate\Support\Facades\Mail;

class SendConfirmationOrder
{
	/**
	 * Handle the event.
	 */
	public function handle(PaymentProcessedSuccessfully $event): void
	{
		Mail::to($event->transaction->user->email)
			->send(new OrderConfirmation(
				$event->transaction->id,
				$event->transaction->event->name
			));
	}
}
