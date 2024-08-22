import { EventSettingsLayout } from '@/Layouts/Admin/EventSettingsLayout';
import { Event, PageProps } from '@/types';
import { PreferencesForm } from './Form';
const View = ({
  auth,
  event,
}: PageProps & {
  event: Event;
}) => {
  return (
    <EventSettingsLayout auth={auth} event={event}>
      <div className="space-y-6">
        <PreferencesForm />
      </div>
    </EventSettingsLayout>
  );
};

export default View;
