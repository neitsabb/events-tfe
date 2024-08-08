<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;

use App\Events\Shared\Models\Event;
use App\Tickets\Shared\Models\Ticket;
use App\User\Models\User;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        User::factory()->create([
            'name' => 'Test User',
            'email' => 'test@example.com',
        ]);

        Event::factory(10)
            ->create()
            ->each(fn($event) => Ticket::factory(2)->create(['event_id' => $event->id]));
    }
}
