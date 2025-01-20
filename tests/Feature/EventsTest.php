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

		$organization->users()->updateExistingPivot($user->id, ['role' => 'owner']);

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

		$response->assertRedirect(route('events.show', ['event' => $event]));

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
			'location' => [
				'street' => $this->faker->streetAddress,
				'city' => $this->faker->city,
				'country' => $this->faker->country,
				'zip_code' => $this->faker->postcode,

			],
			'coords' => [
				'lat' => $this->faker->latitude,
				'lng' => $this->faker->longitude,
			],
			'tickets' => [
				['name' => 'General Admission', 'price' => 1000, 'quantity' => 10],
			],
			'extras' => [
				['name' => 'VIP', 'price' => 2000, 'quantity' => 5],
			],
		];

		$response = $this
			->actingAs($user)
			->post(route('events.configure', ['event' => $event]), $data);

		$response->assertRedirect(route('events.show', ['event' => $event]));

		$event->refresh();

		$this->assertEquals(EventStatusEnum::DRAFT->value, $event->status);
		$this->assertEquals($event->name, "Event Name");
		$this->assertEquals($event->description, "Event Description");
		$this->assertEquals($event->start_date->format('Y-m-d H:i:s'), $data['start_date']);
		$this->assertEquals($event->end_date->format('Y-m-d H:i:s'), $data['end_date']);
		$this->assertEquals($event->street, $data['location']['street']);
		$this->assertEquals($event->city, $data['location']['city']);
		$this->assertEquals($event->country, $data['location']['country']);
		$this->assertEquals($event->zip_code, $data['location']['zip_code']);


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

		$this->withoutExceptionHandling();

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
			'start_date' => now()->addDays(1)->format('Y-m-d H:i:s'),
			'end_date' => now()->addDays(4)->format('Y-m-d H:i:s'),
			'location' => [
				'street' => $this->faker->streetAddress,
				'city' => $this->faker->city,
				'country' => $this->faker->country,
				'zip_code' => $this->faker->postcode,
			],
			'coords' => [
				'lat' => $this->faker->latitude,
				'lng' => $this->faker->longitude,
			],
			'preferences' => [
				['key' => 'legal_age', 'value' => 18],
				['key' => 'required_fields', 'value' => ['first_name', 'last_name', 'email']],
			],
		];

		$response = $this
			->actingAs($user)
			->post(route('events.update', ['event' => $event]), $data);

		$response->assertStatus(302);
		$event->refresh();

		$this->assertEquals($data['name'], $event->name);
		$this->assertEquals($data['description'], $event->description);
		$this->assertEquals($data['start_date'], $event->start_date->format('Y-m-d H:i:s'));
		$this->assertEquals($data['end_date'], $event->end_date->format('Y-m-d H:i:s'));
		$this->assertEquals($data['location']['street'], $event->street);
		$this->assertEquals($data['location']['city'], $event->city);
		$this->assertEquals($data['location']['country'], $event->country);
		$this->assertEquals($data['location']['zip_code'], $event->zip_code);


		$this->assertCount(2, $event->preferences);
		$this->assertEquals($data['preferences'][0]['value'], $event->preferences->where('key', 'legal_age')->first()->value);
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
			->post(route('events.update', ['event' => $event]), $data);

		// Only name is required
		$response->assertSessionHasErrors(['name']);
	}

	/** @test */
	public function test_can_force_delete_an_event()
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

		// Supprimer l'événement
		$response = $this
			->actingAs($user)
			->delete(route('events.delete', ['event' => $event]));

		// Vérifier que l'événement a été supprimé
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
			"status" => EventStatusEnum::PUBLISHED->value,
		]);


		$response = $this
			->actingAs($user)
			->post(route('events.handle.archive', ['event' => $event]));


		$event->refresh();

		$this->assertEquals(EventStatusEnum::ARCHIVED->value, $event->status);

		$this->assertSoftDeleted($event);
	}

	/** @test */
	public function test_can_unarchive_an_event()
	{
		$user = \App\User\Models\User::factory()->create();

		$organization = $user->organizations()->create([
			"name" => 'Organization Name',
			"description" => 'Organization Description',
		]);

		$event = $organization->events()->create([
			"name" => 'Event Name',
			"description" => 'Event Description',
			"status" => EventStatusEnum::ARCHIVED->value,
		]);

		// Suppression de l'événement pour tester la restauration
		$event->delete();
		$event->refresh();

		// Vérifiez que l'événement est bien supprimé
		$this->assertTrue($event->trashed());

		// Restauration de l'événement
		$response = $this->actingAs($user)->post(route('events.handle.archive', ['event' => $event]));

		// Recharge l'événement pour vérifier les modifications
		$event->refresh();

		// Vérifiez que l'événement a été correctement restauré avec le bon statut
		$this->assertFalse($event->trashed());
		$this->assertEquals(EventStatusEnum::DRAFT->value, $event->status);
	}
}
