<?php

namespace App\Shared\Services;

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

	public function createPaymentIntent(array $request, int $totalAmount): array
	{
		Stripe::setApiKey(config('services.stripe.secret'));


		$paymentIntent = PaymentIntent::create([
			'amount' => $totalAmount * 100, // Conversion en centimes
			'currency' => 'eur',
			'transfer_data' => [
				'destination' => $request['stripe_account_id'],
			],
		]);

		return [
			'event' => $request['event'],
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


	public function getVerificationStatus(string $stripeAccountId): array
	{
		Stripe::setApiKey(config('services.stripe.secret'));

		// Récupère les détails du compte Stripe
		$account = Account::retrieve($stripeAccountId);

		// Vérifie les champs nécessaires pour la vérification
		$requirements = $account->requirements->currently_due;

		return [
			'charges_enabled' => $account->charges_enabled,
			'payouts_enabled' => $account->payouts_enabled,
			'currently_due' => $requirements,
		];
	}
}
