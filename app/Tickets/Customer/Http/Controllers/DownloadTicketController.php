<?php

namespace App\Tickets\Customer\Http\Controllers;


use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Support\Facades\DB;

class DownloadTicketController
{
    /**
     * Download a ticket as a PDF
     * @param int $ticketId
     * @param int $transaction
     * @return \Illuminate\Http\Response
     */
    public function __invoke(int $ticketId, int $transaction)
    {
        $ticket = DB::table('tickets_transactions')
            ->select(
                'tickets_transactions.qr_code',
                'tickets.name as ticket_name',
                'tickets.price as ticket_price',
                'tickets_transactions.created_at as created_at',
                'events.name as event_name',
            )
            ->join('tickets', 'tickets_transactions.ticket_id', '=', 'tickets.id')
            ->join('events', 'tickets.event_id', '=', 'events.id')
            ->where('tickets_transactions.transaction_id', $transaction)
            ->where('tickets_transactions.id', $ticketId)
            ->first();

        if (!$ticket) {
            abort(404, 'Ticket not found');
        }

        // Passez les données à la vue Blade
        $pdf = Pdf::loadView('pdfs.ticket', (array) $ticket)->setPaper('a5', 'landscape');

        return $pdf->download("ticket_{$ticket->qr_code}.pdf");
    }
}
