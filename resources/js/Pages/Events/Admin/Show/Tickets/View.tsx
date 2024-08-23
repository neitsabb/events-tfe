import { Title } from '@/Components/Admin/Title';
import EventSingleLayout from '@/Layouts/Admin/EventSingleLayout';
import { EventProps } from '@/types';

import { CreateTicketDialog } from './Partials/CreateTicketDialog';
import { TicketsList } from './Partials/TicketsList';

const View: React.FC<EventProps> = ({ event }) => {
  const { admissions, extras } = event.tickets;
  return (
    <EventSingleLayout event={event}>
      <div className="flex justify-between items-center mb-6">
        <Title title="Billets" level="h3" />
        <CreateTicketDialog event={event} />
      </div>
      <TicketsList event={event} admissions={admissions} extras={extras} />
    </EventSingleLayout>
  );
};

export default View;
