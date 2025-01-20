import { Checkbox } from '@/Components/ui/checkbox';
import { CaretSortIcon, DotsVerticalIcon } from '@radix-ui/react-icons';
import { ColumnDef } from '@tanstack/react-table';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from '@/Components/ui/dropdown-menu';
import { Badge } from '@/Components/ui/badge';
import { Link } from '@inertiajs/react';
import { Button } from '@/Components/ui/button';
import { isMobileDevice } from '@/utils';

export const getColumns = (): ColumnDef<Event>[] => {
    const columns: ColumnDef<Event>[] = [
        {
            id: 'select',
            header: ({ table }) => (
                <Checkbox
                    checked={
                        table.getIsAllPageRowsSelected() ||
                        (table.getIsSomePageRowsSelected() && 'indeterminate')
                    }
                    onCheckedChange={(value) =>
                        table.toggleAllPageRowsSelected(!!value)
                    }
                    aria-label="Select all"
                />
            ),
            cell: ({ row }) => (
                <Checkbox
                    checked={row.getIsSelected()}
                    onCheckedChange={(value) => row.toggleSelected(!!value)}
                    aria-label="Select row"
                />
            ),
            enableSorting: false,
            enableHiding: false,
        },
        {
            accessorKey: 'name',
            meta: 'Nom',
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
            cell: ({ row }) => (
                <div className="lowercase md:w-auto">
                    {row.getValue('name')}
                </div>
            ),
        },
        {
            id: 'actions',
            header: 'Actions',
            enableHiding: false,
            cell: ({ row }) => {
                const event = row.original;
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
                                    href={route('events.show', {
                                        event: event.id,
                                    })}
                                >
                                    Voir l'événement
                                </Link>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                );
            },
        },
    ];

    if (!isMobileDevice()) {
        columns.splice(
            2,
            0, // Ajoute à la position 2
            {
                accessorKey: 'tickets',
                meta: 'Billets',
                header: 'Billets',
                cell: ({ row }) => {
                    const tickets = row.getValue('tickets') as {
                        total: number;
                        sold: number;
                    };

                    // Merge admissions + extra + sum quantity
                    return (
                        <div className="flex items-center ">
                            <span className="font-bold">
                                {tickets.total_sold}
                            </span>
                            <span className="hidden md:block">
                                &nbsp;billets vendus
                            </span>
                        </div>
                    );
                },
            },
            {
                accessorKey: 'participants',
                meta: 'Participants',
                header: 'Participants',
                cell: ({ row }) => {
                    const tickets = row.getValue('tickets') as {
                        total: number;
                        sold: number;
                    };

                    // Merge admissions + extra + sum quantity
                    return (
                        <div className="flex items-center space-x-1">
                            <span className="font-bold">
                                {tickets.participants}
                            </span>
                            <span className="hidden md:block">personnes</span>
                        </div>
                    );
                },
            },
            {
                accessorKey: 'status',
                header: 'Status',
                cell: ({ row }) => {
                    const status = row.getValue('status') as
                        | 'draft'
                        | 'published'
                        | 'archived';
                    let sta = 'default' as
                        | 'default'
                        | 'secondary'
                        | 'destructive'
                        | 'published';
                    if (status === 'published') {
                        sta = 'published';
                    } else if (status === 'draft') {
                        sta = 'secondary';
                    } else if (status === 'archived') {
                        sta = 'destructive';
                    }
                    return (
                        <Badge variant={sta}>
                            {status === 'draft'
                                ? 'Brouillon'
                                : status === 'archived'
                                ? 'Archivé'
                                : status === 'not_configured'
                                ? 'Non configuré'
                                : 'Publié'}
                        </Badge>
                    );
                },
            }
        );
    }

    return columns;
};
