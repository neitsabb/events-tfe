<?php

namespace App\Events\Admin\Http\Controllers;

use App\Events\Shared\Models\Event;
use App\Events\Shared\Enums\EventStatusEnum;

use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Redirect;

class HandleArchiveEventController
{
    /**
     * Archive/unarchive an event
     * @param mixed $id
     * @return \Illuminate\Http\RedirectResponse
     */
    public function __invoke(string $id): RedirectResponse
    {
        $event = Event::withTrashed()->findOrFail($id);

        if ($event->trashed()) {
            $event->restore();
            $event->status = EventStatusEnum::DRAFT->value;
            $event->save();

            return Redirect::back()->with('success', 'L\'événement a été restauré.');
        } else {
            $event->status = EventStatusEnum::ARCHIVED->value;
            $event->save();
            $event->delete();

            return Redirect::back()->with('success', 'L\'événement a été archivé.');
        }
    }
}
