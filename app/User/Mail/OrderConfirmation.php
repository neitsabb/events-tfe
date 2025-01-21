<?php

namespace App\User\Mail;

use App\Transactions\Shared\Models\Transaction;
use App\User\Models\User;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class OrderConfirmation extends Mailable
{
	use Queueable, SerializesModels;

	/**
	 * Create a new message instance.
	 */
	public function __construct(public int $id, public string $eventName) {}

	public function build()
	{
		return $this->view('mails.confirmation-order')->with([
			'transactionId' => $this->id,
			'eventName' => $this->eventName,
		])->subject('Confirmation de votre commande');
	}
}
