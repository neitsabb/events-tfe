<?php

namespace App\Console\Commands;

use App\Events\Shared\Models\Event;
use Carbon\Carbon;
use Illuminate\Console\Command;


class ArchiveExpiredEventsCommand extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'events:archive-expired';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Archive les événements dont la date de fin est passée';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        // Trouver et archiver les événements expirés
        $now = Carbon::now();
        $expiredEvents = Event::where('end_date', '<', $now)
            ->where('status', '!=', 'archived')
            ->get();

        foreach ($expiredEvents as $event) {
            $event->update(['status' => 'archived']);
            $this->info("Événement archivé : {$event->name}");
        }

        $this->info('Tous les événements expirés ont été archivés.');
    }
}
