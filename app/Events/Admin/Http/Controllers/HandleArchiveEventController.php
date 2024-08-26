<?php

namespace App\Events\Admin\Http\Controllers;

use App\Events\Shared\Enums\EventStatusEnum;
use App\Events\Shared\Models\Event;
use App\Shared\Http\Controller;

class HandleArchiveEventController extends Controller
{
    /**
     * Handle the incoming request.
     *
     * @return \Illuminate\Http\Response
     */
    public function __invoke($id)
    {
        $event = Event::withTrashed()->findOrFail($id);

        if ($event->trashed()) {
            // Restaurer l'événement
            $event->restore();

            // Mettre à jour le statut après la restauration
            $event->status = EventStatusEnum::DRAFT->value;
            $event->save();
        } else {
            // Archiver l'événement
            $event->status = EventStatusEnum::ARCHIVED->value;
            $event->save();
            $event->delete();
        }
    }
}
