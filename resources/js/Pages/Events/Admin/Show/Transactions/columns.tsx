import { Event, PageProps, Transaction } from '@/types';
import { CaretSortIcon, DotsVerticalIcon } from '@radix-ui/react-icons';
import { ColumnDef } from '@tanstack/react-table';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { Badge } from '@/Components/ui/badge';
import { Button } from '@/Components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from '@/Components/ui/dropdown-menu';
import { capitalizeFirstLetter } from '@/utils';
import { Link, usePage } from '@inertiajs/react';

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
        cell: ({ row }) => {
            console.log(row.getValue('user.name'));
            return row.getValue('name');
        },
    },
    {
        accessorKey: 'reference',
        meta: 'Référence',
        header: 'Référence',
        cell: ({ row }) => {
            return row.getValue('reference');
        },
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

            const isCompleted = status === 'completed';
            return (
                <Badge variant={isCompleted ? 'green' : 'destructive'}>
                    {isCompleted ? 'Complété' : 'En attente'}
                </Badge>
            );
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
                            format(created_at, 'd/MM/yyyy', {
                                locale: fr,
                            })
                        )}
                    </div>
                </div>
            );
        },
    },
    {
        id: 'actions',
        header: 'Actions',
        enableHiding: false,
        cell: ({ row }) => {
            const { event } = usePage<
                PageProps<{
                    event: Event;
                }>
            >().props;
            const transaction = row.original;
            console.log(transaction);

            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Ouvrir le menu</span>
                            <DotsVerticalIcon className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem>
                            <Link
                                href={route('events.transactions.show', {
                                    event: event.id,
                                    transaction: transaction.id,
                                })}
                            >
                                Voir la transaction
                            </Link>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            );
        },
    },
];
