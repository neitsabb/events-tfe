<?php

namespace App\Events\Admin\Http\Controllers;

use App\Events\Admin\Actions\ConfigureNewEventAction;
use App\Events\Admin\Http\Requests\ConfigureNewEventRequest;
use App\Shared\Http\Controller;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Redirect;


class ConfigureNewEventController extends Controller
{
    public function __invoke($id, ConfigureNewEventRequest $request): RedirectResponse
    {
        (new ConfigureNewEventAction)
            ->execute($id, $request->validated());

        return Redirect::route('events.show', $id);
    }
}
