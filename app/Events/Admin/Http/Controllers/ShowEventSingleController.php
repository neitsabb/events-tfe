<?php

namespace App\Events\Admin\Http\Controllers;


use App\Events\Shared\Models\Event;
use App\Events\Shared\Resources\EventResource;
use App\Shared\Http\Controller;
use Inertia\Inertia;

class ShowEventSingleController extends Controller
{
	/**
	 * Display a listing of the resource.
	 */
	public function __invoke($id, $panel = 'overview'): \Inertia\Response
	{
		$panels = ['overview', 'sales', 'tickets'];

		if (!in_array($panel, $panels)) abort(404);

		return Inertia::render('Events/Admin/Show/' . ucfirst($panel) . '/View',	[
			'event' => new EventResource(Event::where('id', $id)->firstOrFail()),
		]);
	}
}
