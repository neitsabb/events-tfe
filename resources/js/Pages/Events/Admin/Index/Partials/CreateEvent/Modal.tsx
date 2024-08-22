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
import { useState } from 'react';
import { EventTypeSelectionForm } from './Form';

export function CreateEventDialog() {
  const [eventType, setEventType] = useState<string | null>(null);
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          <PlusIcon className="mr-2" /> Créer un événement
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Créer un événement</DialogTitle>
          <DialogDescription>
            Remplissez les informations nécessaires pour accéder à la prochaine
            étape.
          </DialogDescription>
        </DialogHeader>
        <EventTypeSelectionForm
          eventType={eventType}
          setEventType={setEventType}
        />
      </DialogContent>
    </Dialog>
  );
}
