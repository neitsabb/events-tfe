import { Button } from '@/Components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/Components/ui/dialog';
import { EventProps } from '@/types';
import { PlusIcon } from '@radix-ui/react-icons';
import { useState } from 'react';
import { CreateTicketForm } from './CreateTicketForm';

export const CreateTicketDialog: React.FC<EventProps> = ({ event }) => {
  const [open, setOpen] = useState<boolean>(false);
  return (
    <Dialog open={open}>
      <DialogTrigger asChild>
        <Button variant={'outline'} onClick={() => setOpen(true)}>
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
