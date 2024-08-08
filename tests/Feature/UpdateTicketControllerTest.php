<?php

namespace Tests\Feature;

use App\Tickets\Admin\Models\Ticket;
use App\Tickets\Admin\Actions\UpdateTicketAction;
use App\Tickets\Admin\Dtos\UpdateTicketDto;
use App\Tickets\Admin\Enums\TicketTypeEnum;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Support\Facades\Auth;
use Tests\TestCase;

class UpdateTicketControllerTest extends TestCase
{
	use RefreshDatabase, WithFaker;

	/** @test */
	public function test_update_ticket_and_redirect_to_event_show_page()
	{
		$user = \App\User\Models\User::factory()->create();
		Auth::login($user);

		$event = $user->events()->create([
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

		$data = [
			'ticket_id' => $ticket->id,
			'type' => TicketTypeEnum::ADMISSION->value,
			'name' => 'Updated Ticket Name',
			'description' => 'Updated Ticket Description',
			'quantity' => 100,
			'price' => 20.00,
		];

		$response = $this->post(route('events.tickets.update', ['id' => $event->id]), $data);

		$response->assertRedirect(route('events.show', ['id' => $event->id, 'panel' => 'tickets']));

		$ticket->refresh();

		$this->assertEquals('Updated Ticket Name', $ticket->name);
		$this->assertEquals('Updated Ticket Description', $ticket->description);
		$this->assertEquals(100, $ticket->quantity);
		$this->assertEquals(20.00, $ticket->price);
	}
}
