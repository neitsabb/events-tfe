import { Title } from '@/Components/Admin/Title';
import EventSingleLayout from '@/Layouts/Admin/EventSingleLayout';
import { Event, Admission, Extra, PageProps } from '@/types';

import { CreateTicketDialog } from './Partials/CreateTicketDialog';
import { TicketsList } from './Partials/TicketsList';
import { usePage } from '@inertiajs/react';

type AdminTicketsShowProps = {
    event: Event;
    admissions: Admission[];
    extras: Extra[];
};

const View = () => {
    const { event } = usePage<PageProps<AdminTicketsShowProps>>().props;
    return (
        <EventSingleLayout event={event}>
            <div className="flex justify-between items-center my-6">
                <Title title="Billets" level="h3" />
                <CreateTicketDialog event={event} />
            </div>
            <TicketsList
                event={event}
                admissions={event.tickets.admissions}
                extras={event.tickets.extras}
            />
        </EventSingleLayout>
    );
};

export default View;
