<?php

namespace App\Events\Customer\Http\Controllers;

use App\Events\Shared\Resources\EventResource;
use Inertia\Inertia;

use App\Shared\Http\Controller;
use App\Events\Shared\Models\Event;

class ShowEventsListController extends Controller
{
	/**
	 * Display a listing of the resource.
	 */
	public function __invoke()
	{
		return Inertia::render('Events/Customer/Index/View', [
			'events' => EventResource::collection(Event::all()),
		]);
	}
}
