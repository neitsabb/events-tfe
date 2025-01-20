<?php

namespace App\Transactions\Shared\Http\Controllers;

use App\Events\Shared\Models\Event;
use App\Events\Shared\Resources\EventResource;
use App\Transactions\Shared\Models\Transaction;

use Illuminate\Http\Request;
use Inertia\Inertia;

class ShowTransactionController
{
    /**
     * Handle the show transaction render depending on the request origin.
     * @param \Illuminate\Http\Request $request
     * @param \App\Events\Shared\Models\Event $event
     * @param \App\Transactions\Shared\Models\Transaction $transaction
     * @return mixed
     */
    public function __invoke(Request $request, Event $event, Transaction $transaction): mixed
    {
        $transaction->load('tickets', 'event', 'user');

        if ($request->is('dashboard/*')) {
            $transaction->load('user');
            $event->load('transactions');
            return Inertia::render('Events/Admin/Show/Transactions/Show/View', [
                'event' => EventResource::make($event),
                'transaction' => $transaction
            ]);
        }

        if ($transaction->user_id !== auth()->id()) {
            abort(403);
        }

        return Inertia::render('Me/Orders/Show/View', [
            'transaction' => $transaction
        ]);
    }
}
