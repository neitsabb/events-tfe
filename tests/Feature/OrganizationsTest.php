<?php

namespace Tests\Feature;


use App\Organization\Admin\Mail\InvitationMail;
use App\Organization\Shared\Enums\OrganizationTypeEnum;
use App\User\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Mail;
use Tests\TestCase;

class OrganizationsTest extends TestCase
{

    use RefreshDatabase;

    public function test_can_create_new_organisation(): void
    {
        $user = User::factory()->create();

        $response = $this
            ->actingAs($user)
            ->post(
                route('organizations.store'),
                [
                    'name' => 'Organization Name',
                    'description' => 'Organization Description',
                    'type' => OrganizationTypeEnum::ASSOCIATION->value,
                ]
            );

        // Assert: Vérifiez que l'utilisateur est redirigé 
        $response->assertRedirect();

        // Assert: Vérifiez que l'organisation a été créée
        $this->assertDatabaseHas('organizations', [
            'name' => 'Organization Name',
            'description' => 'Organization Description',
        ]);
    }

    public function test_should_not_create_new_organisation_with_invalid_data(): void
    {
        $user = User::factory()->create();

        $response = $this
            ->actingAs($user)
            ->post(
                route('organizations.store'),
                [
                    'name' => '',
                    'description' => '',
                    'type' => OrganizationTypeEnum::ASSOCIATION->value,
                ]
            );

        $response->assertSessionHasErrors(['name', 'description']);
    }

    public function test_can_select_organization(): void
    {
        $user = User::factory()->create();

        $organization = $user->organizations()->create([
            'name' => 'Organization Name',
            'description' => 'Organization Description',
            'type' => OrganizationTypeEnum::ASSOCIATION->value,
        ]);

        $response = $this->actingAs($user)
            ->post(route('organizations.switch', $organization->id));

        $response->assertSessionHas('selected_organization');

        $this->assertEquals($organization->id, session('selected_organization')->id);
    }

    public function test_adds_existing_user_to_organization(): void
    {
        $user = User::factory()->create();

        $organization = $user->organizations()->create([
            "name" => 'Organization Name',
            "description" => 'Organization Description',
        ]);

        $organization->users()->updateExistingPivot($user->id, ['role' => 'owner']);

        $this->withSession(['selected_organization' => $organization]);

        $existingUser = User::factory()->create();

        $response =  $this
            ->actingAs($user)
            ->post(route('organizations.invite'), [
                'users' => [
                    $existingUser->email
                ],
            ]);

        $response->assertSessionHasNoErrors();
        $response->assertStatus(302);

        $this->assertDatabaseHas('organization_user', [
            'organization_id' => $organization->id,
            'user_id' => $existingUser->id,
        ]);
    }

    public function test_adds_new_user_to_organization(): void
    {
        // Arrange
        Mail::fake();

        $email = 'bastienpp@hotmail.com';

        $user = User::factory()->create();

        $organization = $user->organizations()->create([
            'name' => 'Organization Name',
            'description' => 'Organization Description',
        ]);

        $organization->users()->updateExistingPivot($user->id, ['role' => 'owner']);

        $this->withSession(['selected_organization' => $organization]);

        $response = $this
            ->actingAs($user)
            ->post(route('organizations.invite'), [
                'users' => [
                    $email,
                ],
            ]);


        $response->assertStatus(302);
        $response->assertSessionHasNoErrors();

        $this->assertDatabaseHas('users', ['email' => $email]);

        $this->assertDatabaseHas('organization_user', [
            'organization_id' => $organization->id,
            'user_id' => User::where('email', $email)->firstOrFail()->id,
        ]);

        // Assert: Vérifiez qu'un email d'invitation a été envoyé
        Mail::assertSent(InvitationMail::class, function ($mail) use ($email) {
            return $mail->hasTo($email);
        });
    }

    public function test_should_not_add_user_if_not_admin_or_owner(): void
    {
        $user = User::factory()->create();

        $organization = $user->organizations()->create([
            "name" => 'Organization Name',
            "description" => 'Organization Description',
        ]);

        $this->withSession(['selected_organization' => $organization]);

        $existingUser = User::factory()->create();

        $response =  $this
            ->actingAs($user)
            ->post(route('organizations.invite'), [
                'users' => [
                    $existingUser->email
                ],
            ]);

        $response->assertForbidden();
    }

    public function test_can_remove_user_from_organization(): void
    {
        $user = User::factory()->create();

        $organization = $user->organizations()->create([
            'name' => 'Organization Name',
            'description' => 'Organization Description',
        ]);

        $organization->users()->updateExistingPivot($user->id, ['role' => 'owner']);

        $this->withSession(['selected_organization' => $organization]);

        $userToRemove = User::factory()->create();

        $organization->users()->attach($userToRemove);

        $response = $this
            ->actingAs($user)
            ->delete(route('organizations.delete.user', $userToRemove->email));

        $response->assertStatus(302);

        $this->assertDatabaseMissing('organization_user', [
            'organization_id' => $organization->id,
            'user_id' => $userToRemove->id,
        ]);
    }

    public function test_should_not_remove_user_from_organization_if_not_owner(): void
    {
        $user = User::factory()->create();

        $organization = $user->organizations()->create([
            'name' => 'Organization Name',
            'description' => 'Organization Description',
        ]);

        $this->withSession(['selected_organization' => $organization]);

        $userToRemove = User::factory()->create();

        $organization->users()->attach($userToRemove);

        $response = $this
            ->actingAs($user)
            ->delete(route('organizations.delete.user', $userToRemove->email));

        $response->assertForbidden();
    }

    public function test_should_not_remove_owner_from_organization(): void
    {
        $user = User::factory()->create();

        $organization = $user->organizations()->create([
            'name' => 'Organization Name',
            'description' => 'Organization Description',
        ]);

        $organization->users()->updateExistingPivot($user->id, ['role' => 'owner']);

        $this->withSession(['selected_organization' => $organization]);

        $response = $this
            ->actingAs($user)
            ->delete(route('organizations.delete.user', $user->email));

        $response->assertStatus(302);

        $this->assertDatabaseHas('organization_user', [
            'organization_id' => $organization->id,
            'user_id' => $user->id,
        ]);
    }
    public function test_can_connect_to_stripe(): void
    {
        // Crée un utilisateur pour l'organisateur
        $user = User::factory()->create();

        $organization = $user->organizations()->create([
            'name' => 'Organisation Name',
            'description' => 'Organisation Description',
        ]);

        $organization->users()->updateExistingPivot($user->id, ['role' => 'owner']);

        $this->withSession(['selected_organization' => $organization]);

        // Simule la connexion de l'utilisateur
        $this->actingAs($user);

        // Appelle la route pour se connecter à Stripe
        $response = $this->post(route('organizations.stripe.connect'));

        // Vérifie que l'utilisateur est redirigé vers l'URL de Stripe
        $response->assertRedirect();

        $organization->refresh();

        // Vérifie que l'utilisateur a un compte Stripe enregistré
        $this->assertNotNull($organization->fresh()->stripe_account_id);

        $this->assertDatabaseHas('organizations', [
            'id' => $organization->id,
            'stripe_account_id' => $organization->stripe_account_id,
        ]);
    }

    public function test_can_not_connect_to_stripe_if_not_owner(): void
    {
        // Crée un utilisateur pour l'organisateur
        $user = User::factory()->create();

        $organization = $user->organizations()->create([
            'name' => 'Organisation Name',
            'description' => 'Organisation Description',
        ]);

        $this->withSession(['selected_organization' => $organization]);

        // Simule la connexion de l'utilisateur
        $this->actingAs($user);

        // Appelle la route pour se connecter à Stripe
        $response = $this->post(route('organizations.stripe.connect'));

        // Vérifie que l'utilisateur est redirigé vers l'URL de Stripe
        $response->assertForbidden();
    }

    public function test_should_not_add_user_to_organization_if_already_in(): void
    {
        $user = User::factory()->create();

        $organization = $user->organizations()->create([
            'name' => 'Organization Name',
            'description' => 'Organization Description',
        ]);

        $this->withSession(['selected_organization' => $organization]);

        $this
            ->actingAs($user)
            ->post(route('organizations.invite'), [
                'users' => [
                    $user->email
                ],
            ]);

        $this->assertCount(1, $organization->users);
    }

    public function test_should_not_add_user_to_organization_if_email_is_invalid(): void
    {
        $user = User::factory()->create();

        $organization = $user->organizations()->create([
            'name' => 'Organization Name',
            'description' => 'Organization Description',
        ]);

        $this->withSession(['selected_organization' => $organization]);

        $response = $this
            ->actingAs($user)
            ->post(route('organizations.invite'), [
                'users' => [
                    'invalid-email'
                ],
            ]);

        $this->assertDatabaseCount('users', 1);
    }

    public function test_should_not_add_user_to_organization_if_email_is_empty(): void
    {
        $user = User::factory()->create();

        $organization = $user->organizations()->create([
            'name' => 'Organization Name',
            'description' => 'Organization Description',
        ]);

        $this->withSession(['selected_organization' => $organization]);

        $response = $this
            ->actingAs($user)
            ->post(route('organizations.invite'), [
                'users' => [
                    ''
                ],
            ]);

        $this->assertDatabaseCount('users', 1);
    }

    public function test_should_not_access_to_settings_organization_if_not_owner_or_not_admin(): void
    {
        $user = User::factory()->create();

        $organization = $user->organizations()->create([
            'name' => 'Organization Name',
            'description' => 'Organization Description',
        ]);

        $this->withSession(['selected_organization' => $organization]);

        $response = $this
            ->actingAs($user)
            ->get(route('organizations.settings'));

        $response->assertForbidden();
    }
}
