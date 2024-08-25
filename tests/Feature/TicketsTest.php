<?php

namespace Tests\Feature\Tickets\Admin\Http\Controllers;

use App\Tickets\Admin\Enums\TicketTypeEnum;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Support\Facades\Auth;
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

        $response = $this->post(route('events.tickets.store', ['id' => $event->id]), $requestData);

        $response->assertStatus(302);

        $response->assertRedirect(route('events.show', ['id' => $event->id, 'panel' => 'tickets']));

        $this->assertDatabaseHas('tickets', $requestData);
    }

    /** @test */
    public function test_update_ticket_and_redirect_to_event_show_page()
    {
        $user = \App\User\Models\User::factory()->create();

        $event = $user
            ->organizations()
            ->create([
                "name" => 'Organization Name',
                "description" => 'Organization Description',
            ])

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

        $response->assertRedirect(route('events.show', ['id' => $event->id, 'panel' => 'tickets']));

        $ticket->refresh();

        $this->assertEquals('Updated Ticket Name', $ticket->name);
        $this->assertEquals('Updated Ticket Description', $ticket->description);
        $this->assertEquals(100, $ticket->quantity);
        $this->assertEquals(20.00, $ticket->price);
    }
}
