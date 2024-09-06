<?php

namespace App\Events\Shared\Observers;

use App\Events\Shared\Models\EventPreference;

class EventPreferenceObserver
{
    /**
     * Handle the EventPreference "saving" event.
     *
     * @param  \App\Events\Shared\Models\EventPreference  $eventPreference
     * @return void
     */
    public function saving(EventPreference $eventPreference)
    {
        if (!is_null($eventPreference->value)) {
            $eventPreference->value = json_encode($eventPreference->value);
        }
    }
}
