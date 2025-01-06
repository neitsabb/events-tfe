<?php

namespace App\Events\Admin\Http\Controllers;


use App\Events\Shared\Models\Event;
use App\Events\Shared\Resources\EventResource;
use App\Shared\Http\Controller;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;

class ShowEventSingleController extends Controller
{
	protected $model = Event::class;
	protected $viewPath = 'Events/Admin/Show/';
	protected $panels = ['overview', 'transactions', 'tickets', 'settings'];
	protected $subpanels = ['general', 'preferences', 'advanced'];
	protected $resource = EventResource::class;

	/**
	 * Display a listing of the resource.
	 */
	public function __invoke($id, $panel = 'overview', $subpanel = 'general'): mixed
	{
		return $this->handlePanel($id, $panel, $subpanel);
	}
}
