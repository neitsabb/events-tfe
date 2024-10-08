import { Button } from '@/Components/ui/button';
import AuthenticatedLayout from '@/Layouts/Admin/AuthenticatedLayout';
import { Event } from '@/types';
import { Head, Link, usePage, useRemember } from '@inertiajs/react';

import { AdminHeader } from '@/Components/Admin/AdminHeader';
import { CaretSortIcon, DotsVerticalIcon } from '@radix-ui/react-icons';
import { DataTable } from '@/Components/Admin/DataTable';
import { Badge } from '@/Components/ui/badge';
import { Checkbox } from '@/Components/ui/checkbox';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from '@/Components/ui/dropdown-menu';
import { ColumnDef } from '@tanstack/react-table';
import { CreateEventDialog } from './Partials/CreateEvent/Modal';
import { EventStatus } from '@/types/enums';

export const columns: ColumnDef<Event>[] = [
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
            <div className="lowercase">{row.getValue('name')}</div>
        ),
    },
    // {
    //     accessorKey: "category",
    //     meta: "Catégorie",
    //     header: "Catégorie",
    //     cell: ({ row }) => (
    //         <Badge variant={"outline"}>{row.getValue("category")}</Badge>
    //     ),
    // },
    {
        accessorKey: 'tickets',
        meta: 'Billets',
        header: 'Billets',
        cell: ({ row }) => {
            const tickets = row.getValue('tickets') as {
                total: number;
                sold: number;
            };

            return (
                <div className="flex items-center space-x-2">
                    <div>
                        <span className="font-bold">{tickets.sold}</span> vendus
                        sur <span className="font-bold">{tickets.total}</span>
                    </div>
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
            return <Badge variant={sta}>{status}</Badge>;
        },
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
                                href={route('events.show', { event: event.id })}
                            >
                                Voir l'événement
                            </Link>
                        </DropdownMenuItem>
                        {/* <DropdownMenuSeparator />
											<DropdownMenuItem>View customer</DropdownMenuItem>
											<DropdownMenuItem>
													View payment details
											</DropdownMenuItem> */}
                    </DropdownMenuContent>
                </DropdownMenu>
            );
        },
    },
];

const tabsItems = [
    {
        label: 'Tous',
        value: 'all',
    },
    {
        label: 'Brouillon',
        value: EventStatus.DRAFT,
    },
    {
        label: 'Publié',
        value: EventStatus.PUBLISHED,
    },
    {
        label: 'Archivé',
        value: EventStatus.ARCHIVED,
    },
];

const Events: React.FC<{ events: Event[] }> = ({ events }) => {
    const [selectedTab, setSelectedTab] = useRemember<string | EventStatus>(
        'all'
    );

    const filteredEvents = events.filter((event) => {
        if (selectedTab === 'all') {
            return true;
        }

        return event.status === selectedTab;
    });

    const handleTabChange = (value: EventStatus | string) => {
        setSelectedTab(value);
    };

    return (
        <AuthenticatedLayout className="space-y-8">
            <Head title="Dashboard" />
            <AdminHeader
                title="&Eacute;vénements"
                actions={<CreateEventDialog />}
                className="pb-4"
            />
            <div className="space-y-6">
                <div className="space-x-3">
                    {tabsItems.map((tab, index) => {
                        return (
                            <Button
                                key={index}
                                variant={
                                    tab.value === selectedTab
                                        ? 'default'
                                        : 'secondary'
                                }
                                className="text-sm rounded-full"
                                onClick={() => handleTabChange(tab.value)}
                            >
                                {tab.label}
                            </Button>
                        );
                    })}
                </div>
                <DataTable data={filteredEvents} columns={columns} />
            </div>
        </AuthenticatedLayout>
    );
};

export default Events;
