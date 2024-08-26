<?php

namespace App\Events\Shared\Observers;

use App\Events\Shared\Enums\EventStatusEnum;

use Illuminate\Support\Str;
use App\Events\Shared\Models\Event;

class EventObserver
{
    /**
     * Handle the Event "creating" event.
     */
    public function creating(Event $event): void
    {
        $event->slug = Str::slug($event->name);
    }

    /**
     * Handle the Event "updated" event.
     */
    public function updated(Event $event): void
    {
        //
    }

    /**
     * Handle the Event "deleted" event.
     */
    public function deleted(Event $event): void
    {
        $event->status = EventStatusEnum::ARCHIVED->value;
        $event->save();
    }

    /**
     * Handle the Event "restored" event.
     */
    public function restored(Event $event): void
    {
        $event->status = EventStatusEnum::DRAFT->value;
        $event->save();
    }

    /**
     * Handle the Event "force deleted" event.
     */
    public function forceDeleted(Event $event): void {}
}
