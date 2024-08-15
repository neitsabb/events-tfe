import { EventSettingsLayout } from "@/Layouts/Admin/EventSettingsLayout";
import { Event, PageProps } from "@/types";
const View = ({
    auth,
    event,
}: PageProps & {
    event: Event;
}) => {
    return (
        <EventSettingsLayout auth={auth} event={event}></EventSettingsLayout>
    );
};

export default View;
