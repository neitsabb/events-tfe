<?php

namespace Tests\Feature;

use App\User\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class StripeConnectTest extends TestCase
{
	use RefreshDatabase;

	/** @test */
	public function an_organizer_can_connect_to_stripe()
	{
		// Crée un utilisateur pour l'organisateur
		$organizer = User::factory()->create();

		// Simule la connexion de l'utilisateur
		$this->actingAs($organizer);

		// Appelle la route pour se connecter à Stripe
		$response = $this->get(route('organizations.stripe.connect'));

		// Vérifie que l'utilisateur est redirigé vers l'URL de Stripe
		$response->assertRedirect();

		// Vérifie que l'utilisateur a un compte Stripe enregistré
		$this->assertNotNull($organizer->fresh()->stripe_id);

		$this->assertDatabaseHas('users', [
			'id' => $organizer->id,
			'stripe_id' => $organizer->stripe_id,
		]);
	}
}
