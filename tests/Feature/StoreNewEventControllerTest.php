<?php

namespace Tests\Feature;

use App\Events\Shared\Models\Event;
use App\User\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Support\Facades\Auth;
use Tests\TestCase;

class StoreNewEventControllerTest extends TestCase
{
    use RefreshDatabase, WithFaker;

    /** @test */
    public function it_stores_new_event_and_redirects()
    {
        // Créer un utilisateur et se connecter
        $user = User::factory()->create();
        Auth::login($user);

        // Créer des données de requête simulées
        $data = [
            'name' => $this->faker->sentence,
            'description' => $this->faker->paragraph,
        ];

        // Simuler une requête POST vers le contrôleur
        $response = $this->post(route('events.store'), $data);

        // Assurez-vous que la réponse est une redirection (code HTTP 302)
        $response->assertStatus(302);

        // Vérifiez que l'événement a été correctement enregistré dans la base de données
        $this->assertDatabaseHas('events', [
            'name' => $data['name'],
            'description' => $data['description'],
        ]);
    }
}
