<?php

namespace App\Events\Customer\Http\Controllers;

use App\Events\Shared\Resources\EventResource;
use App\Events\Shared\Models\Event;

use Inertia\Inertia;


class ShowSingleEventController
{
	/**
	 * Show the single customer event.
	 * @param string $slug
	 * @return \Inertia\Response
	 */
	public function __invoke(string $slug)
	{
		return Inertia::render('Events/Customer/Show/View', [
			'event' => EventResource::make(Event::with('organization.events', 'tickets', 'tags')->where('slug', $slug)->firstOrFail()),
		]);
	}
}
