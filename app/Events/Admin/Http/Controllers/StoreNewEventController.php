<?php

namespace App\Events\Admin\Http\Controllers;


use App\Events\Admin\Http\Requests\StoreNewEventRequest;
use App\Shared\Http\Controller;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Redirect;
use App\Events\Admin\Actions\StoreNewEventAction;
use App\Events\Shared\Models\Event;
use App\Events\Shared\Resources\EventResource;
use Illuminate\Http\JsonResponse;

class StoreNewEventController extends Controller
{
	/**
	 * Display a listing of the resource.
	 */
	public function __invoke(StoreNewEventRequest $request): JsonResponse
	{
		$event = Event::create($request->validated());
		return response()->json(
			EventResource::make($event),
			302
		);
	}
}
