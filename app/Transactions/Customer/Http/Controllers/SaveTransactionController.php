<?php

namespace App\Transactions\Customer\Http\Controllers;

use App\Shared\Http\Controller;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Redirect;
use App\Tickets\Customer\Services\StripeService;

use App\Tickets\Customer\Http\Requests\CheckoutRequest;
use App\Transactions\Shared\Models\Transaction;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class SaveTransactionController extends Controller
{
	/**
	 * Handle the incoming request.
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
			'event_id' => $request->event_id,
			'amount' => $request->amount,
			'paymentIntentId' => $request->paymentIntentId ?? '12',
		]);
	}
}
