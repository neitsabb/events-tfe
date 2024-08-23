import { EventSettingsLayout } from '@/Layouts/Admin/EventSettingsLayout';
import { EventProps } from '@/types';
import { GeneralForm } from './Form';

const View: React.FC<EventProps> = ({ event }) => {
  return (
    <EventSettingsLayout event={event}>
      <div className="space-y-6">
        <GeneralForm event={event} />
      </div>
    </EventSettingsLayout>
  );
};

export default View;
