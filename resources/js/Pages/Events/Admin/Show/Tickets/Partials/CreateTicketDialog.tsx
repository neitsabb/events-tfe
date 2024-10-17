import { Button } from '@/Components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/Components/ui/dialog';
import { EventProps, PageProps } from '@/types';
import { PlusIcon } from '@radix-ui/react-icons';
import { useState } from 'react';
import { CreateTicketForm } from './CreateTicketForm';
import { usePage } from '@inertiajs/react';

export const CreateTicketDialog: React.FC<EventProps> = ({ event }) => {
    const { props } = usePage<PageProps>();
    const [open, setOpen] = useState<boolean>(false);
    return (
        <Dialog open={open}>
            <DialogTrigger asChild>
                <Button
                    variant={'outline'}
                    onClick={() => setOpen(true)}
                    disabled={!props.permissions.event.tickets.create}
                >
                    <PlusIcon className="mr-2" />
                    Nouveau billet
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[525px]">
                <DialogHeader>
                    <DialogTitle>Créer un nouveau billet</DialogTitle>
                    <DialogDescription>
                        Veuillez remplir les champs ci-dessous pour continuer.
                    </DialogDescription>
                </DialogHeader>
                <CreateTicketForm eventId={event.id} setOpen={setOpen} />
            </DialogContent>
        </Dialog>
    );
};
