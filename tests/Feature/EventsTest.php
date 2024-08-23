<?php

namespace Tests\Feature;

use App\Events\Shared\Enums\EventStatusEnum;
use Tests\TestCase;
use Illuminate\Support\Facades\Auth;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Foundation\Testing\RefreshDatabase;

class EventsTest extends TestCase
{
	use RefreshDatabase, WithFaker; // Utilise la base de données de test

	/** @test */
	public function test_store_new_event_and_redirects()
	{
		$user = \App\User\Models\User::factory()->create();
		Auth::login($user);

		// Création d'une organisation associée à l'utilisateur
		$organization = $user->organizations()->create([
			"name" => 'Organization Name',
			"description" => 'Organization Description',
		]);

		// Simulation de la session avec l'organisation sélectionnée
		$this->withSession(['selected_organization' => $organization]);

		$data = [
			'name' => $this->faker->sentence,
			'description' => $this->faker->paragraph,
			// Note: 'organization_id' n'est plus nécessaire ici, car il est ajouté dans `prepareForValidation`.
		];

		// Exécution de la requête POST pour créer un événement
		$response = $this->post(route('events.store'), $data);

		// Vérification du statut de redirection
		$response->assertStatus(302);

		// Récupération de l'événement créé dans la base de données
		$event = \App\Events\Shared\Models\Event::where('name', $data['name'])->firstOrFail();

		// Vérification que la redirection utilise l'UUID correct
		$response->assertRedirect(route('events.show', ['id' => $event->id]));

		// Vérification que l'événement est bien présent dans la base de données
		$this->assertDatabaseHas('events', [
			'name' => $data['name'],
			'description' => $data['description'],
			'organization_id' => $organization->id,  // On vérifie aussi l'organisation associée
		]);
	}

	/** @test */
	public function test_configure_new_event_and_redirect_to_show_page()
	{
		// Créer un utilisateur et se connecter
		$user = \App\User\Models\User::factory()->create();
		Auth::login($user);

		// Créer une organisation fictive pour le test
		$organization = $user->organizations()->create([
			"name" => 'Organization Name',
			"description" => 'Organization Description',
		]);

		// Simuler la session avec l'organisation sélectionnée
		$this->withSession(['selected_organization' => $organization]);

		// Créer un événement fictif pour le test
		$event = $organization->events()->create([
			"name" => 'Event Name',
			"description" => 'Event Description',
		]);

		// Créer des données de requête simulées
		$data = [
			'start_date' => now()->addDays(1)->format('Y-m-d H:i:s'), // Exemple de date future
			'end_date' => now()->addDays(4)->format('Y-m-d H:i:s'),   // Exemple de date future
			'location' => $this->faker->address,
			'tickets' => [
				['name' => 'General Admission', 'price' => 1000, 'quantity' => 10],
			],
			'extras' => [
				['name' => 'VIP', 'price' => 2000, 'quantity' => 5],
			],
		];

		// Simuler une requête POST vers le contrôleur avec les données simulées
		$response = $this->post(route('events.configure', ['id' => $event->id]), $data);

		// Assurez-vous que la redirection est correcte
		$response->assertRedirect(route('events.show', ['id' => $event->id]));

		// Recharger l'événement depuis la base de données après l'exécution de l'action
		$event->refresh();

		// Vérifiez que l'action ConfigureNewEventAction a correctement mis à jour l'événement
		$this->assertEquals(EventStatusEnum::DRAFT->value, $event->status);
		$this->assertEquals($event->name, "Event Name");
		$this->assertEquals($event->description, "Event Description");
		$this->assertEquals($event->start_date->format('Y-m-d H:i:s'), $data['start_date']);
		$this->assertEquals($event->end_date->format('Y-m-d H:i:s'), $data['end_date']);
		$this->assertEquals($event->location, $data['location']);

		// Vérifiez que les tickets et extras ont été correctement créés
		$this->assertCount(2, $event->tickets); // Assurez-vous que les tickets ont été créés

		// Vérifiez les détails des tickets
		$generalAdmission = $event->tickets->where('name', 'General Admission')->first();
		$this->assertNotNull($generalAdmission);
		$this->assertEquals(1000, $generalAdmission->price);
		$this->assertEquals(10, $generalAdmission->quantity);

		$vip = $event->tickets->where('name', 'VIP')->first();
		$this->assertNotNull($vip);
		$this->assertEquals(2000, $vip->price);
		$this->assertEquals(5, $vip->quantity);
	}
}
