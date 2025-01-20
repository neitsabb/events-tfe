<?php

namespace App\Events\Admin\Http\Controllers;

use App\Events\Admin\Actions\ConfigureNewEventAction;
use App\Events\Admin\Http\Requests\ConfigureNewEventRequest;
use App\Events\Shared\Models\Event;

use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Redirect;


class ConfigureNewEventController
{
    /**
     * Configure a new event
     * @param \App\Events\Shared\Models\Event $event
     * @param \App\Events\Admin\Http\Requests\ConfigureNewEventRequest $request
     * @param \App\Events\Admin\Actions\ConfigureNewEventAction $action
     * @return \Illuminate\Http\RedirectResponse
     */
    public function __invoke(
        Event $event,
        ConfigureNewEventRequest $request,
        ConfigureNewEventAction $action
    ): RedirectResponse {

        $action->execute($event, $request->validated());

        return Redirect::route('events.show', $event);
    }
}
