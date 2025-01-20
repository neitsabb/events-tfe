<?php

namespace App\Events\Admin\Http\Controllers;


use App\Events\Admin\Http\Requests\StoreNewEventRequest;
use App\Events\Shared\Models\Event;

use App\Shared\Http\Controller;

use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Redirect;

class StoreNewEventController
{
	/**
	 * Store a new event
	 * @param \App\Events\Admin\Http\Requests\StoreNewEventRequest $request
	 * @return \Illuminate\Http\RedirectResponse
	 */
	public function __invoke(StoreNewEventRequest $request): RedirectResponse
	{
		$event = Event::create($request->validated());
		return Redirect::route('events.show', ['event' => $event]);
	}
}
