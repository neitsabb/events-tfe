import { EventSettingsLayout } from '@/Layouts/Admin/EventSettingsLayout';
import { Event, PageProps } from '@/types';
import { GeneralForm } from './Form';
import { usePage } from '@inertiajs/react';

type AdminShowSettingsGeneralProps = {
    event: Event;
};

const View = () => {
    const { event } = usePage<PageProps<AdminShowSettingsGeneralProps>>().props;
    return (
        <EventSettingsLayout event={event}>
            <div className="space-y-6">
                <GeneralForm event={event} />
            </div>
        </EventSettingsLayout>
    );
};

export default View;
