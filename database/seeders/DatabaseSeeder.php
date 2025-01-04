<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;

use App\Events\Shared\Models\Event;
use App\Tickets\Admin\Enums\TicketTypeEnum;
use App\Tickets\Shared\Models\Ticket;
use App\User\Models\User;
use Database\Factories\Events\Shared\Models\EventFactory;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Str;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        User::factory(10)->create();

        $user = User::factory()->create([
            'name' => 'Test User',
            'email' => 'test@example.com',
        ]);

        $organization = $user->organizations()->create([
            'name' => 'Test Organization'
        ]);

        $organization->users()->updateExistingPivot($user->id, [
            'role' => 'owner'
        ]);

        $events = Event::factory(40)->create([
            'organization_id' => 1,
        ]);

        $events->each(function ($event) {
            $event->tickets()->saveMany(
                Ticket::factory(5)->make()
            );
        });
    }
}
