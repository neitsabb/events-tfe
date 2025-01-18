<?php

namespace App\Transactions\Shared\Http\Controllers;

use App\Events\Shared\Models\Event;
use App\Events\Shared\Resources\EventResource;
use App\Shared\Http\Controller;
use App\Transactions\Shared\Models\Transaction;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ShowTransactionController extends Controller
{
    /**
     * Handle the incoming request.
     *
     */
    public function __invoke(Request $request, Event $event, Transaction $transaction): mixed
    {
        $transaction->load('tickets', 'event', 'user');

        // Vérifiez si la requête vient du côté organizer
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



        // Vue côté "client"
        return Inertia::render('Me/Orders/Show/View', [
            'transaction' => $transaction
        ]);
    }
}
