<?php

namespace App\Transactions\Customer\Http\Controllers;

use App\Transactions\Shared\Models\Transaction;

use Illuminate\Http\Request;

class SaveTransactionController
{
	/**
	 * Save the transaction.
	 * @param \Illuminate\Http\Request $request
	 * @return void
	 */
	public function __invoke(Request $request): void
	{
		$request->validate([
			'event_id' => 'required|uuid|exists:events,id',
			'amount' => 'required|integer',
			'paymentIntentId' => 'required|string',
		]);

		Transaction::updateOrCreate([
			'user_id' => auth()->id(),
			'amount' => $request->amount,
			'paymentIntentId' => $request->paymentIntentId,
			'event_id' => $request->event_id,
			'reference' => Transaction::generateReference(),
		]);
	}
}
