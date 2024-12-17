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

        $organization = $user->organizations()->create([
            'name' => 'Test Organization'
        ]);

        $organization->users()->updateExistingPivot($user->id, [
            'role' => 'owner'
        ]);

        // Lire le fichier JSON
        $json = File::get(base_path('storage/app/data.json'));
        $data = json_decode($json, true);

        // Insérer les données dans la base de données
        foreach ($data as $event) {
            $event = Event::create([
                ...$event,
                'organization_id' => $organization->id,
                'street' => 'Sheikh Zayed Rd',
                'city' => 'Dubai',
                'country' => 'United Arab Emirates',
                'zip_code' => '12345',
                'latitude' => '25.2048',
                'longitude' => '55.2708',
            ]);
        }
    }
}
