<?php

namespace Tests\Feature;

use App\User\Models\User;
use App\Artists\Shared\Models\Artist;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Auth;
use Tests\TestCase;

class ArtistsTest extends TestCase
{
    use RefreshDatabase;

    public function test_user_can_follow_an_artist(): void
    {
        $user = User::factory()->create();
        $artist = Artist::factory()->create();

        $response = $this->actingAs($user)->post(route('artists.handle.follow', $artist->id));

        $response->assertStatus(302);
        $response->assertSessionDoesntHaveErrors();

        $this->assertDatabaseHas('artists_followers', [
            'user_id' => $user->id,
            'artist_id' => $artist->id,
        ]);
    }

    public function test_user_cannot_follow_the_same_artist_twice(): void
    {
        $user = User::factory()->create();
        $artist = Artist::factory()->create();

        $this
            ->actingAs($user)
            ->post(route('artists.handle.follow', $artist->id));

        $response = $this
            ->actingAs($user)
            ->post(route('artists.handle.follow', $artist->id));

        // Assert Redirect::back()
        $response->assertStatus(302);

        // Assert that the user unfollowed the artist
        $this->assertEquals(0, $user->followingArtists()->where('artist_id', $artist->id)->count());
    }

    public function test_user_cannot_follow_non_existent_artist(): void
    {
        $user = User::factory()->create();

        $response = $this->actingAs($user)->post(route('artists.handle.follow', 9999)); // Non-existent artist ID

        $response->assertStatus(404);
    }

    public function test_guest_cannot_follow_an_artist(): void
    {
        $artist = Artist::factory()->create();

        $response = $this->post(route('artists.handle.follow', $artist->id));

        $response->assertStatus(302);
        $response->assertRedirect(route('login'));
    }

    public function test_user_can_unfollow_an_artist(): void
    {
        $user = User::factory()->create();
        $artist = Artist::factory()->create();

        $user->followingArtists()->attach($artist->id);

        $response = $this->actingAs($user)->post(route('artists.handle.follow', $artist->id));

        $response->assertStatus(302);

        // Assert that the user does not follow the artist anymore
        $this->assertFalse($user->followingArtists()->where('artist_id', $artist->id)->exists());
    }

    // public function test_user_can_view_followed_artists(): void
    // {
    //     $user = User::factory()->create();
    //     $artist1 = Artist::factory()->create();
    //     $artist2 = Artist::factory()->create();

    //     $user->followingArtists()->attach([$artist1->id, $artist2->id]);

    //     $response = $this->actingAs($user)->get(route('artists.followed'));

    //     $response->assertStatus(200);
    //     $response->assertViewHas('artists', function ($artists) use ($artist1, $artist2) {
    //         return $artists->contains($artist1) && $artists->contains($artist2);
    //     });
    // }
}
