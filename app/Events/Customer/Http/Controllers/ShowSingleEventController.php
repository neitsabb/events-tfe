<?php

namespace App\Events\Customer\Http\Controllers;

use App\Events\Shared\Resources\EventResource;
use Inertia\Inertia;

use App\Shared\Http\Controller;
use App\Events\Shared\Models\Event;

class ShowSingleEventController extends Controller
{
	/**
	 * Display a listing of the resource.
	 */
	public function __invoke(string $slug)
	{
		return Inertia::render('Events/Customer/Show/View', [
			'event' => EventResource::make(Event::with('organization.events', 'tickets')->where('slug', $slug)->firstOrFail()),
		]);
	}
}
