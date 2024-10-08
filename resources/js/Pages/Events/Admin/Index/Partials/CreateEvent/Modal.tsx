import { Button } from '@/Components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/Components/ui/dialog';

import { PlusIcon } from '@radix-ui/react-icons';
import { NewEventForm } from './Form';
import { usePage } from '@inertiajs/react';

export function CreateEventDialog() {
    const {
        props: { permissions },
    } = usePage();

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button disabled={!permissions.event.create}>
                    <PlusIcon className="mr-2" /> Créer un événement
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Créer un événement</DialogTitle>
                    <DialogDescription>
                        Remplissez les informations nécessaires pour accéder à
                        la prochaine étape.
                    </DialogDescription>
                </DialogHeader>
                <NewEventForm />
            </DialogContent>
        </Dialog>
    );
}
