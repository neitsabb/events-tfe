import { Button } from '@/Components/ui/button';
import AuthenticatedLayout from '@/Layouts/Admin/AuthenticatedLayout';
import { Event, PageProps } from '@/types';
import { Head, Link, useForm, usePage, useRemember } from '@inertiajs/react';

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
import { Alert, AlertDescription, AlertTitle } from '@/Components/ui/alert';
import { MessageSquareWarningIcon } from 'lucide-react';
import { useState } from 'react';

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

    const { props } = usePage<PageProps>();

    const [isLoading, setIsLoading] = useState(false);

    // useForm pour gérer le formulaire avec Inertia
    const { post } = useForm();

    const handleClick = (e) => {
        e.preventDefault();
        setIsLoading(true);

        // Utilisation de Inertia pour soumettre la requête
        post(route('organizations.stripe.connect'), {
            onFinish: () => setIsLoading(false), // Fin du loading après la requête
            onError: () => setIsLoading(false), // Fin du loading en cas d'erreur
        });
    };

    return (
        <AuthenticatedLayout className="space-y-8">
            <Head title="Dashboard" />
            <AdminHeader
                title="&Eacute;vénements"
                actions={<CreateEventDialog />}
                className="pb-4"
            />
            {props.auth.organizationLogged.stripe_status !== 'complete' && (
                <Alert>
                    <MessageSquareWarningIcon className="h-6 w-6" />
                    <AlertTitle>
                        Complétez votre organisation pour vendre des billets
                    </AlertTitle>
                    <AlertDescription>
                        Notre fournisseur de services de paiement a besoin des
                        détails de votre organisation pour que vous perceviez
                        vos revenus.
                    </AlertDescription>
                    <Button
                        onClick={handleClick}
                        variant={'ghost'}
                        className={
                            'underline underline-offset-4  ml-7 mt-4 whitespace-nowrap text-sm font-medium text-primary/90 hover:text-primary flex gap-2 disabled:text-accent-foreground disabled:cursor-not-allowed'
                        }
                        disabled={
                            isLoading || !props.permissions.organization.connect
                        }
                    >
                        {isLoading && (
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className={'animate-spin w-4'}
                            >
                                <path d="M21 12a9 9 0 1 1-6.219-8.56" />
                            </svg>
                        )}
                        Compléter mon compte Stripe
                    </Button>
                </Alert>
            )}
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
