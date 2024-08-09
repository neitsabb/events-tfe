import { Separator } from "@/Components/ui/separator";
import { EventSettingsLayout } from "@/Layouts/Admin/EventSettingsLayout";
import { Event, PageProps } from "@/types";
import { GeneralForm } from "./Form";
const View = ({
    auth,
    event,
}: PageProps & {
    event: Event;
}) => {
    return (
        <EventSettingsLayout user={auth.user} event={event}>
            <div className="space-y-6">
                <GeneralForm />
            </div>
        </EventSettingsLayout>
    );
};

export default View;
