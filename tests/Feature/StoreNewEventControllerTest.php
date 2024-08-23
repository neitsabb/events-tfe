<?php

namespace Tests\Feature;

use Tests\TestCase;
use Illuminate\Support\Facades\Auth;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Foundation\Testing\RefreshDatabase;

class StoreNewEventControllerTest extends TestCase
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
}
