<?php

namespace Tests\Feature;

use Tests\TestCase;
use App\Events\Shared\Models\Event;
use Illuminate\Support\Facades\Auth;
use App\Events\Shared\Enums\EventStatusEnum;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Foundation\Testing\RefreshDatabase;

class EventsTest extends TestCase
{
	use RefreshDatabase, WithFaker; // Utilise la base de données de test

	/** @test */
	public function test_store_new_event_and_redirects()
	{
		$user = \App\User\Models\User::factory()->create();

		$organization = $user->organizations()->create([
			"name" => 'Organization Name',
			"description" => 'Organization Description',
		]);

		$this->withSession(['selected_organization' => $organization]);

		$data = [
			'name' => $this->faker->sentence,
			'description' => $this->faker->paragraph,
		];

		$response = $this
			->actingAs($user)
			->post(route('events.store'), $data);

		$response->assertStatus(302);

		$event = Event::where('name', $data['name'])->firstOrFail();

		$response->assertRedirect(route('events.show', ['id' => $event->id]));

		$this->assertDatabaseHas('events', [
			'name' => $data['name'],
			'description' => $data['description'],
			'organization_id' => $organization->id,
		]);
	}

	/** @test */
	public function test_configure_new_event_and_redirect_to_show_page()
	{
		$user = \App\User\Models\User::factory()->create();

		$organization = $user->organizations()->create([
			"name" => 'Organization Name',
			"description" => 'Organization Description',
		]);

		$this->withSession(['selected_organization' => $organization]);

		$event = $organization->events()->create([
			"name" => 'Event Name',
			"description" => 'Event Description',
		]);

		$data = [
			'start_date' => now()->addDays(1)->format('Y-m-d H:i:s'),
			'end_date' => now()->addDays(4)->format('Y-m-d H:i:s'),
			'location' => $this->faker->address,
			'tickets' => [
				['name' => 'General Admission', 'price' => 1000, 'quantity' => 10],
			],
			'extras' => [
				['name' => 'VIP', 'price' => 2000, 'quantity' => 5],
			],
		];

		$response = $this
			->actingAs($user)
			->post(route('events.configure', ['id' => $event->id]), $data);

		$response->assertRedirect(route('events.show', ['id' => $event->id]));

		$event->refresh();

		$this->assertEquals(EventStatusEnum::DRAFT->value, $event->status);
		$this->assertEquals($event->name, "Event Name");
		$this->assertEquals($event->description, "Event Description");
		$this->assertEquals($event->start_date->format('Y-m-d H:i:s'), $data['start_date']);
		$this->assertEquals($event->end_date->format('Y-m-d H:i:s'), $data['end_date']);
		$this->assertEquals($event->location, $data['location']);

		$this->assertCount(2, $event->tickets);

		$generalAdmission = $event->tickets->where('name', 'General Admission')->first();
		$this->assertNotNull($generalAdmission);
		$this->assertEquals(1000, $generalAdmission->price);
		$this->assertEquals(10, $generalAdmission->quantity);

		$vip = $event->tickets->where('name', 'VIP')->first();
		$this->assertNotNull($vip);
		$this->assertEquals(2000, $vip->price);
		$this->assertEquals(5, $vip->quantity);
	}

	/** @test */
	public function test_can_update_an_event()
	{
		$user = \App\User\Models\User::factory()->create();

		$organization = $user->organizations()->create([
			"name" => 'Organization Name',
			"description" => 'Organization Description',
		]);

		$this->withSession(['selected_organization' => $organization]);

		$event = $organization->events()->create([
			"name" => 'Event Name',
			"description" => 'Event Description',
		]);

		$data = [
			'name' => 'Updated Event Name',
			'description' => 'Updated Event Description',
		];

		$response = $this
			->actingAs($user)
			->put(route('events.update', ['id' => $event->id]), $data);

		$response->assertRedirect(route('events.show', ['id' => $event->id]));

		$event->refresh();

		$this->assertEquals($event->name, "Upated Event Name");
		$this->assertEquals($event->description, "Upated Event Description");
	}

	/** @test */
	public function test_should_not_update_an_event_with_invalid_data()
	{
		$user = \App\User\Models\User::factory()->create();

		$organization = $user->organizations()->create([
			"name" => 'Organization Name',
			"description" => 'Organization Description',
		]);

		$this->withSession(['selected_organization' => $organization]);

		$event = $organization->events()->create([
			"name" => 'Event Name',
			"description" => 'Event Description',
		]);

		$data = [
			'name' => '',
			'description' => '',
		];

		$response = $this
			->actingAs($user)
			->put(route('events.update', ['id' => $event->id]), $data);

		$response->assertSessionHasErrors(['name', 'description']);
	}

	/** @test */
	public function test_can_delete_an_event()
	{
		$user = \App\User\Models\User::factory()->create();

		$organization = $user->organizations()->create([
			"name" => 'Organization Name',
			"description" => 'Organization Description',
		]);

		$this->withSession(['selected_organization' => $organization]);

		$event = $organization->events()->create([
			"name" => 'Event Name',
			"description" => 'Event Description',
		]);

		$response = $this
			->actingAs($user)
			->delete(route('events.destroy', ['id' => $event->id]));

		$response->assertRedirect(route('events.index'));

		$this->assertDatabaseMissing('events', [
			'id' => $event->id,
		]);
	}

	/** @test */
	public function test_can_archive_an_event()
	{
		$user = \App\User\Models\User::factory()->create();

		$organization = $user->organizations()->create([
			"name" => 'Organization Name',
			"description" => 'Organization Description',
		]);

		$this->withSession(['selected_organization' => $organization]);

		$event = $organization->events()->create([
			"name" => 'Event Name',
			"description" => 'Event Description',
		]);

		$response = $this
			->actingAs($user)
			->post(route('events.archive', ['id' => $event->id]));

		$response->assertRedirect(route('events.show', ['id' => $event->id]));

		$event->refresh();

		$this->assertEquals(EventStatusEnum::ARCHIVED->value, $event->status);
	}

	/** @test */
	public function test_can_unarchive_an_event()
	{
		$user = \App\User\Models\User::factory()->create();

		$organization = $user->organizations()->create([
			"name" => 'Organization Name',
			"description" => 'Organization Description',
		]);

		$this->withSession(['selected_organization' => $organization]);

		$event = $organization->events()->create([
			"name" => 'Event Name',
			"description" => 'Event Description',
			'status' => EventStatusEnum::ARCHIVED->value,
		]);

		$response = $this
			->actingAs($user)
			->post(route('events.unarchive', ['id' => $event->id]));

		$response->assertRedirect(route('events.show', ['id' => $event->id]));

		$event->refresh();

		$this->assertEquals(EventStatusEnum::DRAFT->value, $event->status);
	}
}
