<?php

use Illuminate\Foundation\Inspiring;
use Illuminate\Support\Facades\Artisan;

Artisan::command('inspire', function () {
    $this->comment(Inspiring::quote());
})->purpose('Display an inspiring quote')->hourly();

Artisan::command('app:context {name}', function () {
    $name = ucfirst($this->argument('name'));

    $directories = [
        "app/{$name}",
        "app/{$name}/Shared/Enums",
        "app/{$name}/Shared/Models",
        "app/{$name}/Shared/Resources",
        "app/{$name}/Admin/Actions",
        "app/{$name}/Admin/Http/Controllers",
        "app/{$name}/Admin/Http/Requests",
        "app/{$name}/Customer",
        "app/{$name}/Customer/Actions",
        "app/{$name}/Customer/Http/Controllers",
        "app/{$name}/Customer/Http/Requests",
    ];

    foreach ($directories as $directory) {
        if (!file_exists($directory)) {
            mkdir($directory, 0777, true);
        }
    }

    $this->info("{$name} context created successfully.");
})->purpose('Create a new context');
