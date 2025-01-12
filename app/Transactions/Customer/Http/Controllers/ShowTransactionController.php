<?php

namespace App\Transactions\Customer\Http\Controllers;

use App\Shared\Http\Controller;
use App\Transactions\Shared\Models\Transaction;
use Inertia\Inertia;

class ShowTransactionController extends Controller
{
    /**
     * Handle the incoming request.
     *
     */
    public function __invoke(Transaction $transaction)
    {
        return Inertia::render('Me/Orders/Show/View', [
            'transaction' => $transaction->load('tickets', 'event')
        ]);
    }
}
