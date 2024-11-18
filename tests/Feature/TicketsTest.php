<?php

namespace Tests\Feature;

use App\Tickets\Admin\Enums\TicketTypeEnum;
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

        $user = \App\User\Models\User::factory()->create();

        $organization = $user
            ->organizations()
            ->create([
                "name" => 'Organization Name',
                "description" => 'Organization Description',
            ]);

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


        $response = $this->actingAs($user)->get(route('payment.checkout', ['event' => $event, 'ticket_id' => $ticket->id]));

        $response->assertStatus(200)
            ->assertInertia(
                fn(Assert $page) => $page
                    ->component('Payment/Checkout/View')
                    ->has(
                        'ticket',
                        fn(Assert $page) => $page
                            ->where('id', $ticket->id)
                            ->etc()
                    )
                    ->where('paymentIntent', fn($value) => !empty($value))
            );
    }

    public function test_user_can_purchase_ticket()
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

        // Créer un ticket
        $ticket = $event->tickets()->create([
            'name' => 'Original Ticket',
            'type' => TicketTypeEnum::ADMISSION->value,
            'description' => 'Original Description',
            'quantity' => 50,
            'price' => 10.00,
        ]);

        // Mock de la méthode Stripe\PaymentIntent::retrieve()
        $mockStripe = \Mockery::mock(\Stripe\PaymentIntent::class);
        $mockStripe->shouldReceive('retrieve')
            ->with('pi_test1234')
            ->andReturn((object) ['status' => 'succeeded']);

        // Passer l'instance Stripe mockée au contrôleur
        $this->app->instance(\Stripe\PaymentIntent::class, $mockStripe);

        $this->actingAs($user)
            ->post(route('payment.process'), [
                'ticket_id' => $ticket->id,
                'payment_intent_id' => 'pi_test1234',
            ])
            ->assertInertia(
                fn(Assert $page) => $page
                    ->component('Payment/Success/View')
                    ->has(
                        'ticket',
                        fn(Assert $page) => $page
                            ->where('id', $ticket->id)
                            ->where('sold', $ticket->sold + 1)
                            ->etc()
                    )
            );

        // Vérifier que le ticket a bien été mis à jour en base de données
        $this->assertDatabaseHas('tickets', [
            'id' => $ticket->id,
            'sold' => $ticket->sold + 1,
        ]);
    }

    public function test_user_cannot_purchase_ticket_with_failed_payment()
    {
        $user = \App\User\Models\User::factory()->create();

        $organization = $user->organizations()->create([
            "name" => 'Organization Name',
            "description" => 'Organization Description',
        ]);

        $event = $organization->events()->create([
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

        // Mock de la méthode Stripe\PaymentIntent::retrieve()
        $mockStripe = \Mockery::mock(\Stripe\PaymentIntent::class);
        $mockStripe->shouldReceive('retrieve')
            ->with('pi_test_failed')
            ->andReturn((object) ['status' => 'failed']);

        // Passer l'instance Stripe mockée au contrôleur
        $this->app->instance(\Stripe\PaymentIntent::class, $mockStripe);

        $this->actingAs($user)
            ->post(route('payment.process'), [
                'ticket_id' => $ticket->id,
                'payment_intent_id' => 'pi_test_failed',
            ])
            ->assertRedirect(route('payment.failed'));

        // Vérifier que le ticket n'a pas été mis à jour en base de données
        $this->assertDatabaseMissing('tickets', [
            'id' => $ticket->id,
            'sold' => $ticket->sold + 1, // Le nombre vendu ne doit pas augmenter
        ]);
    }
}
