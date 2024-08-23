import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/Components/ui/dialog';
import { Admission, Event, Extra } from '@/types';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/Components/ui/tabs';
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
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>{ticket.name}</DialogTitle>
          <DialogDescription>
            Vous pouvez modifier les détails de ce billet ici.
          </DialogDescription>
        </DialogHeader>
        <Tabs defaultValue="settings" className="!ring-0 !h-[400px]">
          <TabsList className="grid w-full grid-cols-2 mb-4">
            <TabsTrigger value="settings">Paramètres</TabsTrigger>
            <TabsTrigger value="availability">Disponibilité</TabsTrigger>
          </TabsList>
          <TabsContent value="settings" className="!ring-0">
            <CreateTicketForm
              eventId={event.id}
              setOpen={handleClose}
              data={ticket}
            />
          </TabsContent>
          <TabsContent value="availability">Disponibilité</TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};
