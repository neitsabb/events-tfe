<?php

namespace App\Events\Admin\Http\Controllers;

use App\Shared\Http\Controller;
use App\Events\Shared\Models\Event;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Redirect;
use App\Events\Shared\Enums\EventStatusEnum;

class HandleArchiveEventController extends Controller
{
    /**
     * Handle the incoming request.
     *     */
    public function __invoke($id): RedirectResponse
    {
        $event = Event::withTrashed()->findOrFail($id);

        if ($event->trashed()) {
            // Restaurer l'événement
            $event->restore();

            // Mettre à jour le statut après la restauration
            $event->status = EventStatusEnum::DRAFT->value;
            $event->save();

            return Redirect::back()->with('success', 'L\'événement a été restauré.');
        } else {
            // Archiver l'événement
            $event->status = EventStatusEnum::ARCHIVED->value;
            $event->save();
            $event->delete();

            return Redirect::back()->with('success', 'L\'événement a été archivé.');
        }
    }
}
