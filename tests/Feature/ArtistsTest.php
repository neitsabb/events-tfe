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

        $response = $this->actingAs($user)->post(route('artists.follow', $artist->id));

        $response->assertStatus(200);

        // Assert that the user follows the artist
        $this->assertTrue($user->followingArtists()->where('artist_id', $artist->id)->exists());
    }

    public function test_user_cannot_follow_the_same_artist_twice(): void
    {
        $user = User::factory()->create();
        $artist = Artist::factory()->create();

        $this->actingAs($user)->post(route('artists.follow', $artist->id));
        $response = $this->actingAs($user)->post(route('artists.follow', $artist->id));

        $response->assertStatus(200);

        // Assert that only one record exists for this user-artist pair
        $this->assertEquals(1, $user->followingArtists()->where('artist_id', $artist->id)->count());
    }

    public function test_user_can_view_followed_artists(): void
    {
        $user = User::factory()->create();
        $artist1 = Artist::factory()->create();
        $artist2 = Artist::factory()->create();

        $user->followingArtists()->attach([$artist1->id, $artist2->id]);

        $response = $this->actingAs($user)->get(route('artists.followed'));

        $response->assertStatus(200);
        $response->assertViewHas('artists', function ($artists) use ($artist1, $artist2) {
            return $artists->contains($artist1) && $artists->contains($artist2);
        });
    }

    public function test_user_cannot_follow_non_existent_artist(): void
    {
        $user = User::factory()->create();

        $response = $this->actingAs($user)->post(route('artists.follow', 9999)); // Non-existent artist ID

        $response->assertStatus(404);
    }
}
