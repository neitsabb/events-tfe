<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;

use App\Events\Shared\Models\Event;
use App\Tickets\Admin\Enums\TicketTypeEnum;
use App\Tickets\Shared\Models\Ticket;
use App\User\Models\User;
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
        // User::factory(10)->create();

        $user = User::factory()->create([
            'name' => 'Test User',
            'email' => 'test@example.com',
        ]);

        // Lire le fichier JSON
        $json = File::get(base_path('storage/app/data.json'));
        $data = json_decode($json, true);

        // Insérer les données dans la base de données
        foreach ($data as $event) {
            $event = Event::create([
                ...$event,
                'slug' => Str::slug($event['name']),
                'user_id' => $user->id
            ]);

            $event->tickets()->createMany([
                ['name' => 'Early Bird', 'price' => 10.00, 'quantity' => 100, 'type' => TicketTypeEnum::ADMISSION->value],
                ['name' => 'Regular', 'price' => 15.00, 'quantity' => 100, 'type' => TicketTypeEnum::ADMISSION->value],
                ['name' => 'Late Bird', 'price' => 20.00, 'quantity' => 100, 'type' => TicketTypeEnum::ADMISSION->value],
            ]);
        }

        // Event::factory(10)
        //     ->create()
        //     ->each(fn($event) => Ticket::factory(2)->create(['event_id' => $event->id]));
    }
}
