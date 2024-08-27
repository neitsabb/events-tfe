import { Button } from '@/Components/ui/button';
import { EventProps } from '@/types';
import { EventStatus } from '@/types/enums';
import { router } from '@inertiajs/react';

export const AdvancedForm = ({ event }: EventProps) => {
    const handleArchive = () => {
        router.post(route('events.handle.archive', { id: event.id }));
    };

    const isArchived = event.status === EventStatus.ARCHIVED;

    const handleDelete = () => {
        router.delete(route('events.delete', { id: event.id }));
    };

    return (
        <>
            <div className="flex items-center justify-between rounded-lg border border-dashed border-destructive bg-white shadow-sm p-4">
                <div className="flex flex-col gap-1 justify-center">
                    <h4 className="text-md font-semibold">
                        {isArchived
                            ? "Restaurer l'événement"
                            : "Archiver l'événement"}
                    </h4>
                    <p className="text-sm text-muted-foreground">
                        {isArchived
                            ? 'Cette action restaurera cet événement et le rendra visible aux participants.'
                            : 'Cette action archivera cet événement et le rendra inacessible au public.'}
                    </p>
                </div>
                <Button onClick={handleArchive}>
                    {isArchived ? 'Restaurer' : 'Archiver'}
                </Button>
            </div>
            <div className="flex items-center justify-between rounded-lg border border-dashed border-destructive bg-white shadow-sm p-4">
                <div className="flex flex-col gap-1 justify-center">
                    <h4 className="text-md font-semibold">
                        Supprimer l'événement
                    </h4>
                    <p className="text-sm text-muted-foreground">
                        Cette action supprimera définitivement cet événement,
                        ainsi que toutes les données associées.
                    </p>
                </div>
                <Button onClick={handleDelete}>Supprimer</Button>
            </div>
        </>
    );
};
