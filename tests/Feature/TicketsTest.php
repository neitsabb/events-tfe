<?php

namespace Tests\Feature;

use App\Tickets\Admin\Enums\TicketTypeEnum;
use App\Transactions\Shared\Models\Transaction;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Support\Facades\Auth;
use Inertia\Testing\AssertableInertia as Assert;
use Tests\TestCase;

class TicketsTest extends TestCase
{
    use RefreshDatabase, WithFaker;

    /** @test */
    public function test_store_new_ticket_and_redirect_to_event_show_page()
    {
        $user = \App\User\Models\User::factory()->create();
        Auth::login($user);

        $organization = $user->organizations()->create([
            "name" => 'Organization Name',
            "description" => 'Organization Description',
        ]);

        $organization->users()->updateExistingPivot($user->id, ['role' => 'owner']);

        $event = $organization->events()->create([
            "name" => 'Event Name',
            "description" => 'Event Description',
            "organization_id" => $organization->id,
        ]);

        $requestData = [
            "event_id" =>  $event->id,
            "type" =>  "extra",
            "name" =>  "Test Ticket",
            "description" =>  "Test Ticket Description",
            "quantity" =>  100,
            "price" =>  19.99,
        ];

        $response = $this->post(route('events.tickets.store', ['event' => $event->id]), $requestData);

        $response->assertStatus(302);

        $response->assertRedirect(route('events.show', ['event' => $event->id, 'panel' => 'tickets']));

        $this->assertDatabaseHas('tickets', $requestData);
    }

    /** @test */
    public function test_update_ticket_and_redirect_to_event_show_page()
    {
        $user = \App\User\Models\User::factory()->create();

        $organization = $user
            ->organizations()
            ->create([
                "name" => 'Organization Name',
                "description" => 'Organization Description',
            ]);

        $organization->users()->updateExistingPivot($user->id, ['role' => 'owner']);

        $event = $organization
            ->events()
            ->create([
                "name" => 'Event Name',
                "description" => 'Event Description',
            ]);

        $ticket = $event->tickets()->create([
            'name' => 'Original Ticket',
            'type' => TicketTypeEnum::ADMISSION->value,
            'description' => 'Original Description',
            'quantity' => 50,
            'price' => 10.00,
        ]);


        $response = $this
            ->actingAs($user)
            ->post(route('events.tickets.update', $event->id), [
                'ticket_id' => $ticket->id,
                'type' => TicketTypeEnum::ADMISSION->value,
                'name' => 'Updated Ticket Name',
                'description' => 'Updated Ticket Description',
                'quantity' => 100,
                'price' => 20.00,
            ]);


        $ticket->refresh();

        $this->assertEquals('Updated Ticket Name', $ticket->name);
        $this->assertEquals('Updated Ticket Description', $ticket->description);
        $this->assertEquals(100, $ticket->quantity);
        $this->assertEquals(20.00, $ticket->price);

        $response->assertRedirect(route('events.show', ['event' => $event, 'panel' => 'tickets']));
    }

    public function test_show_payment_page_creates_payment_intent()
    {
        $this->withoutVite();
        $this->withoutExceptionHandling();

        // Créer un utilisateur
        $user = \App\User\Models\User::factory()->create();

        // Créer une organisation et un événement
        $organization = $user->organizations()->create([
            "name" => 'Organization Name',
            "description" => 'Organization Description',
        ]);

        $event = $organization->events()->create([
            "name" => 'Event Name',
            "description" => 'Event Description',
        ]);

        // Créer plusieurs tickets
        $ticket1 = $event->tickets()->create([
            'name' => 'Admission Ticket',
            'type' => TicketTypeEnum::ADMISSION->value,
            'description' => 'Admission Ticket Description',
            'quantity' => 50,
            'price' => 10,
        ]);

        $ticket2 = $event->tickets()->create([
            'name' => 'Extra Ticket',
            'type' => TicketTypeEnum::EXTRA->value,
            'description' => 'Extra Ticket Description',
            'quantity' => 50,
            'price' => 15,
        ]);

        // Simuler la requête pour plusieurs tickets avec des quantités différentes
        $requestData = [
            'admissions' => [
                [
                    'id' => $ticket1->id,
                    'name' => $ticket1->name,
                    'price' => $ticket1->price,
                    'quantity' => 2,
                ]
            ],
            'extras' => [
                [
                    'id' => $ticket2->id,
                    'name' => $ticket2->name,
                    'price' => $ticket2->price,
                    'quantity' => 3,
                ]
            ]
        ];

        // Envoyer la requête
        // Envoyer la requête
        $response = $this->actingAs($user)
            ->post(route('payment.checkout', ['event' => $event]), $requestData);

        // Suivre la redirection pour obtenir la réponse Inertia
        $response = $this->followRedirects($response);

        $response->assertInertia(
            fn(Assert $page) => $page
                ->component('Payment/Checkout/View')
                ->has(
                    'tickets.admissions',
                    fn(Assert $admissions) => $admissions
                        ->has(1)
                        ->where('0.id', $ticket1->id)
                        ->where('0.name', $ticket1->name)
                        ->where('0.price', (int) $ticket1->price) // Comparaison souple
                        ->where('0.quantity', 2)
                )
                ->has(
                    'tickets.extras',
                    fn(Assert $extras) => $extras
                        ->has(1)
                        ->where('0.id', $ticket2->id)
                        ->where('0.name', $ticket2->name)
                        ->where('0.price', (int) $ticket2->price) // Comparaison souple
                        ->where('0.quantity', 3)
                )
                ->where('paymentIntent', fn($value) => !empty($value))
        );
    }
}
