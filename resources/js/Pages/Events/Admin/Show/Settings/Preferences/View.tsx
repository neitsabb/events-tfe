import { EventSettingsLayout } from '@/Layouts/Admin/EventSettingsLayout';
import { Event, PageProps } from '@/types';
import { PreferencesForm } from './Form';
import { usePage } from '@inertiajs/react';

type AdminShowSettingsPreferencesProps = {
    event: Event;
};

const View = () => {
    const { event } =
        usePage<PageProps<AdminShowSettingsPreferencesProps>>().props;
    return (
        <EventSettingsLayout event={event}>
            <div className="space-y-6">
                <PreferencesForm event={event} />
            </div>
        </EventSettingsLayout>
    );
};

export default View;
