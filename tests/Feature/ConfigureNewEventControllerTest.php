<?php

namespace Tests\Feature;

use App\Events\Shared\Models\Event;
use App\Events\Shared\Enums\EventStatusEnum;
use App\Events\Shared\Resources\EventResource;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Support\Facades\Auth;
use Tests\TestCase;

class ConfigureNewEventControllerTest extends TestCase
{
    use RefreshDatabase, WithFaker;

    /** @test */
    public function test_configure_new_event_and_redirect_to_show_page()
    {
        // Créer un utilisateur et se connecter
        $user = \App\User\Models\User::factory()->create();
        Auth::login($user);

        // Créer un événement fictif pour le test
        $event = $user->events()->create([
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
