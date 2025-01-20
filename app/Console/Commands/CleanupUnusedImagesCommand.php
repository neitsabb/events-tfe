<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;

class CleanupUnusedImagesCommand extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'storage:cleanup-images';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Supprime les images non utilisées des dossiers users, organizations et events.';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $defaultFiles = [
            'users/default.png',
            'organizations/default.png',
            'events/default.png',
        ];

        $directories = [
            'users' => 'users',
            'organizations' => 'organizations',
            'events' => 'events',
        ];

        foreach ($directories as $type => $directory) {
            $this->info("Vérification des images dans le dossier : $directory");

            $files = Storage::disk('public')->files($directory);

            $usedFiles = $this->getUsedFilesForType($type);

            $deletedFilesCount = 0;
            foreach ($files as $file) {
                if (!in_array($file, $usedFiles) && !in_array($file, $defaultFiles)) {
                    Storage::disk('public')->delete($file);
                    $deletedFilesCount++;
                    $this->info("Image supprimée : $file");
                }
            }

            $this->info("Suppression terminée pour le dossier $directory. Total supprimé : $deletedFilesCount");
        }

        $this->info('Nettoyage des images non utilisées terminé.');
    }

    /**
     * Obtenir les fichiers utilisés pour un type spécifique.
     *
     * @param string $type
     * @return array
     */
    private function getUsedFilesForType(string $type): array
    {
        switch ($type) {
            case 'users':
                return DB::table('users')
                    ->whereNotNull('image')
                    ->where('image', '!=', '')
                    ->pluck('image')
                    ->toArray();

            case 'organizations':
                return DB::table('organizations')
                    ->whereNotNull('logo')
                    ->where('logo', '!=', '')
                    ->pluck('logo')

                    ->toArray();

            case 'events':
                return DB::table('events')
                    ->whereNotNull('image')
                    ->where('image', '!=', '')
                    ->pluck('image')

                    ->toArray();

            default:
                return [];
        }
    }
}
