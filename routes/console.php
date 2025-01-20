<?php

use Illuminate\Foundation\Inspiring;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\Schedule;

Schedule::command('events:archive-expired')->daily()->at('00:16');
Schedule::command('storage:cleanup-images')->daily()->at('00:00');

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

Artisan::command('app:controller {context} {name}', function () {
    $context = ucfirst($this->argument('context'));
    $name = ucfirst($this->argument('name'));


    $controller = "app/{$context}/Http/Controllers/{$name}Controller.php";

    if (!file_exists($controller)) {
        $content = "<?php\n\nnamespace App\\{$context}\\Http\\Controllers;\n\nuse App\\Shared\\Http\\Controller;\n\nclass {$name}Controller extends Controller\n{\n    /**\n     * Handle the incoming request.\n     *\n     * @return \\Illuminate\\Http\\Response\n     */\n    public function __invoke()\n    {\n        //\n    }\n}\n";
        file_put_contents($controller, $content);
    }

    $this->info("{$name} controller created successfully.");
})->purpose('Create a new controller');

Artisan::command('app:model {context} {name}', function () {
    $context = ucfirst($this->argument('context'));
    $name = ucfirst($this->argument('name'));

    $model = "app/{$context}/Shared/Models/{$name}.php";

    if (!file_exists($model)) {
        $content = "<?php\n\nnamespace App\\{$context}\\Shared\\Models;\n\nuse Illuminate\\Database\\Eloquent\\Model;\n\nclass {$name} extends Model\n{\n    protected \$fillable = [];\n}\n";
        file_put_contents($model, $content);
    }

    // Create the migration
    // Add _ between lowercase and uppercase letters
    $name = preg_replace('/(?<!^)[A-Z]/', '_$0', $name);

    Artisan::call('make:migration create_' . strtolower($name) . 's_table --create=' . strtolower($name) . 's');

    $this->info("{$name} model created successfully.");
})->purpose('Create a new model');
