import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from '@/Components/ui/dialog';
import { Admission, Event, Extra } from '@/types';

import { CreateTicketForm } from './CreateTicketForm';

export const TicketDetailsDialog = ({
    event,
    ticket,
    handleClose,
}: {
    event: Event;
    ticket: Admission | Extra | null;
    handleClose: () => void;
}) => {
    if (!ticket) return null;

    return (
        <Dialog open={!!ticket} onOpenChange={handleClose}>
            <DialogContent className="w-[90%] md:w-full md:max-w-2xl ">
                <DialogHeader>
                    <DialogTitle>{ticket.name}</DialogTitle>
                    <DialogDescription>
                        Vous pouvez modifier les détails de ce billet ici.
                    </DialogDescription>
                </DialogHeader>

                <CreateTicketForm
                    eventId={event.id}
                    setOpen={handleClose}
                    data={ticket}
                />
            </DialogContent>
        </Dialog>
    );
};
