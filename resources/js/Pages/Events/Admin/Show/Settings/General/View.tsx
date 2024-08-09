import { Separator } from "@/Components/ui/separator";
import { EventSettingsLayout } from "@/Layouts/Admin/EventSettingsLayout";
import { Event, PageProps } from "@/types";
import { GeneralForm } from "./Partials/GeneralForm";
const View = ({
    auth,
    event,
}: PageProps & {
    event: Event;
}) => {
    return (
        <EventSettingsLayout user={auth.user} event={event}>
            <div className="space-y-6 w-full">
                <GeneralForm />
            </div>
        </EventSettingsLayout>
    );
};

export default View;
