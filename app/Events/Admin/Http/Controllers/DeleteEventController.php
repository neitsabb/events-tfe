<?php

namespace App\Events\Admin\Http\Controllers;

use App\Events\Shared\Models\Event;
use App\Shared\Http\Controller;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Http\RedirectResponse;

class DeleteEventController extends Controller
{
    /**
     * Handle the incoming request.
     *
     */
    public function __invoke($id): RedirectResponse
    {
        Event::where('id', $id)->forceDelete();

        return Redirect::route('events.index')->with('success', 'L\'événement a été supprimé.');
    }
}
