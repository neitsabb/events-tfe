import { Button } from '@/Components/ui/button';
import AuthenticatedLayout from '@/Layouts/Admin/AuthenticatedLayout';
import { Event, PageProps } from '@/types';
import { Head, useForm, usePage, useRemember } from '@inertiajs/react';

import { AdminHeader } from '@/Components/Admin/AdminHeader';
import { DataTable } from '@/Components/Admin/DataTable';

import { Alert, AlertDescription, AlertTitle } from '@/Components/ui/alert';
import { EventStatus } from '@/types/enums';
import { isMobileDevice } from '@/utils';
import { MessageSquareWarningIcon } from 'lucide-react';
import { CreateEventDialog } from './Partials/CreateEvent/Modal';
import { getColumns } from './columns';
import { AlertOrganizationStripe } from '@/Components/Admin/AlertOrganizationStripe';

const tabsItems = [
    {
        label: 'Tous',
        value: 'all',
    },
    {
        label: 'A venir',
        value: EventStatus.UPCOMING,
    },
    {
        label: 'Terminé',
        value: EventStatus.OUTGOING,
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

    const today = new Date();

    const filteredEvents = events.filter((event) => {
        if (selectedTab === 'all') {
            return true;
        }

        if (selectedTab === EventStatus.UPCOMING) {
            return new Date(event.start_date) > today;
        }

        if (selectedTab === EventStatus.OUTGOING) {
            return new Date(event.end_date) < today;
        }

        return event.status === selectedTab;
    });

    const handleTabChange = (value: EventStatus | string) => {
        setSelectedTab(value);
    };

    return (
        <AuthenticatedLayout className="space-y-8">
            <Head title="Evenements" />
            <AdminHeader
                title="&Eacute;vénements"
                actions={<CreateEventDialog />}
                className="pb-4"
            />
            <AlertOrganizationStripe />
            <div className="space-y-6">
                <div className="flex gap-2 overflow-x-auto pb-4 md:pb-0">
                    {tabsItems.map((tab, index) => (
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
                    ))}
                </div>
                <DataTable
                    data={filteredEvents}
                    hideColumnsButton={isMobileDevice()}
                    columns={getColumns() as []}
                />
            </div>
        </AuthenticatedLayout>
    );
};

export default Events;
