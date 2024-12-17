<?php

namespace App\Tickets\Customer\Services;

use App\Tickets\Shared\Models\Ticket;
use Stripe\PaymentIntent;
use Stripe\Stripe;
use Stripe\Account;
use Stripe\AccountLink;

class StripeService
{

	public function connect(): array
	{

		Stripe::setApiKey(config('services.stripe.secret'));

		$account = Account::create([
			'type' => 'standard',
			'capabilities' => [
				'card_payments' => ['requested' => true],
				'transfers' => ['requested' => true],
			],
			'business_type' => 'individual', // TODO: Récupérer le type de l'organisation
			'country' => 'FR', // TODO: Récupérer le pays de l'organisation
		]);

		$accountLink = AccountLink::create([
			'account' => $account->id,
			'refresh_url' => route('organizations.stripe.connect'),
			'return_url' => route('organizations.stripe.check'),
			'type' => 'account_onboarding',
		]);

		return [
			'accountId' => $account->id,
			'accountUrl' => $accountLink->url,
		];
	}

	public function createPaymentIntent(array $request): array
	{
		Stripe::setApiKey(config('services.stripe.secret'));

		$totalAmount = $this->calculateTotalAmount([
			...$request['admissions'],
			...$request['extras'],
		]);

		$referenceTicket = $this->getReferenceTicket($request['admissions'][0]);

		$paymentIntent = PaymentIntent::create([
			'amount' => $totalAmount * 100,
			'currency' => 'eur',
			'transfer_data' => [
				'destination' => $referenceTicket->event->organization->stripe_account_id,
			],
		]);

		return [
			'event' => $referenceTicket->event,
			'tickets' => [
				'admissions' => $request['admissions'],
				'extras' => $request['extras'],
			],
			'totalAmount' => $totalAmount,
			'paymentIntent' => $paymentIntent->client_secret,
		];
	}

	public function checkStatus(string $stripeAccountId): bool
	{
		Stripe::setApiKey(config('services.stripe.secret'));

		$account = Account::retrieve($stripeAccountId);

		return $account->charges_enabled && $account->payouts_enabled;
	}

	private function calculateTotalAmount(array $tickets): int
	{
		return array_reduce($tickets, function ($total, $ticket) {
			return $total + ($ticket['price'] * $ticket['quantity']);
		}, 0);
	}

	private function getReferenceTicket(array $ticket): Ticket
	{
		return Ticket::findOrFail($ticket['id']);
	}
}
