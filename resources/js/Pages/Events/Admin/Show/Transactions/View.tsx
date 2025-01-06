import { DataTable } from '@/Components/Admin/DataTable';
import { Badge } from '@/Components/ui/badge';
import { Button } from '@/Components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from '@/Components/ui/dropdown-menu';
import EventSingleLayout from '@/Layouts/Admin/EventSingleLayout';
import { Event, PageProps, Transaction } from '@/types';
import { capitalize, capitalizeFirstLetter } from '@/utils';
import { usePage } from '@inertiajs/react';
import { CaretSortIcon, DotsVerticalIcon } from '@radix-ui/react-icons';
import { ColumnDef } from '@tanstack/react-table';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

export const columns: ColumnDef<Transaction>[] = [
    {
        accessorKey: 'name',
        meta: 'Nom du client',
        header: ({ column }) => {
            return (
                <Button
                    variant="none"
                    onClick={() =>
                        column.toggleSorting(column.getIsSorted() === 'asc')
                    }
                >
                    Nom
                    <CaretSortIcon className="ml-2 h-4 w-4" />
                </Button>
            );
        },
        cell: ({ row }) => row.getValue('name'),
    },
    {
        accessorKey: 'tickets_count',
        meta: 'Billets',
        header: 'Billets',
        cell: ({ row }) => {
            const tickets = row.getValue('tickets_count') as number;
            const moreThanOneTicket = tickets > 1 ? 's' : '';
            return (
                // Enlever le s de billets si un seul billet
                <span>
                    {tickets} billet{moreThanOneTicket} acheté
                    {moreThanOneTicket}
                </span>
            );
        },
    },
    {
        accessorKey: 'amount',
        meta: 'Montant',
        header: 'Montant',
        cell: ({ row }) => {
            console.log(row);
            const amount = row.getValue('amount') as string;
            return (
                <div className="flex items-center space-x-2">
                    <div>{amount} €</div>
                </div>
            );
        },
    },
    {
        accessorKey: 'status',
        meta: 'Statut',
        header: 'Statut',
        cell: ({ row }) => {
            const status = row.getValue('status') as string;
            return <Badge>{status}</Badge>;
        },
    },
    {
        accessorKey: 'created_at',
        meta: 'Date',
        header: 'Date',
        cell: ({ row }) => {
            const created_at = row.getValue('created_at') as string;
            return (
                <div className="flex items-center space-x-2">
                    <div>
                        {capitalizeFirstLetter(
                            format(created_at, 'd MMMM yyyy', {
                                locale: fr,
                            })
                        )}
                    </div>
                </div>
            );
        },
    },
];

type AdminShowSalesProps = {
    event: Event;
};

const View = () => {
    const { event } = usePage<PageProps<AdminShowSalesProps>>().props;

    console.log(event);
    return (
        <EventSingleLayout event={event}>
            <DataTable
                title={`Transactions (${event.transactions.length})`}
                data={event.transactions}
                columns={columns}
                hideColumnsButton={true}
                className="mt-6"
            />
        </EventSingleLayout>
    );
};
export default View;
