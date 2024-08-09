import { Separator } from "@/Components/ui/separator";
import { EventSettingsLayout } from "@/Layouts/Admin/EventSettingsLayout";
import { Event, PageProps } from "@/types";
const View = ({
    auth,
    event,
}: PageProps & {
    event: Event;
}) => {
    return (
        <EventSettingsLayout user={auth.user} event={event}>
            <div className="space-y-6">
                <div>
                    <h3 className="text-lg font-medium">Préférences</h3>
                    <p className="text-sm text-muted-foreground">
                        Configurez vos préférences pour cet événement.
                    </p>
                </div>
                {/* <ProfileForm /> */}
            </div>
        </EventSettingsLayout>
    );
};

export default View;
