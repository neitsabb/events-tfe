<?php

namespace App\Events\Admin\Http\Controllers;

use App\Events\Shared\Models\Event;

use Illuminate\Support\Facades\Redirect;
use Illuminate\Http\RedirectResponse;

class DeleteEventController
{
    /**
     * Delete an event
     * @param int $id
     * @return \Illuminate\Http\RedirectResponse
     */
    public function __invoke($id): RedirectResponse
    {
        Event::where('id', $id)->forceDelete();

        return Redirect::route('dashboard')->with('success', 'L\'événement a été supprimé.');
    }
}
