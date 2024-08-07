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

        $data = [
            'name' => $this->faker->sentence,
            'description' => $this->faker->paragraph,
        ];

        $response = $this->post(route('events.store'), $data);

        $response->assertStatus(302);

        $this->assertDatabaseHas('events', [
            'name' => $data['name'],
            'description' => $data['description'],
        ]);
    }
}
