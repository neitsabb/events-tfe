import { Button } from '@/Components/ui/button';
import { Checkbox } from '@/Components/ui/checkbox';
import { DialogClose, DialogFooter } from '@/Components/ui/dialog';
import { Input } from '@/Components/ui/input';
import { Label } from '@/Components/ui/label';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/Components/ui/select';
import { Textarea } from '@/Components/ui/textarea';
import { useForm } from '@inertiajs/react';
import { ChevronLeftIcon } from '@radix-ui/react-icons';

const EVENT_TYPES = [
  {
    id: 1,
    slug: 'new-event',
    name: 'Nouvel événement',
    description: 'Lancez la vente de billets pour un nouvel événement',
  },
  {
    id: 2,
    slug: 'new-edition',
    name: 'Nouvelle édition',
    description:
      "Lancez la vente de billets pour une nouvelle édition d'un événement existant.",
  },
];

type SetEventType = (type: string | null) => void;

export const EventTypeSelectionForm = ({
  eventType,
  setEventType,
}: {
  eventType: string | null;
  setEventType: SetEventType;
}) => {
  return (
    <>
      <hr className="my-2 h-1" />
      {eventType === null ? (
        <div className="flex flex-col gap-4 ">
          {EVENT_TYPES.map((type) => (
            <div
              key={type.id}
              className="bg-accent hover:bg-accent-foreground/10 transition-colors text-secondary-foreground rounded-md p-4 text-sm font-medium cursor-pointer"
              onClick={() => setEventType(type.slug)}
            >
              {type.name}
              <p className="text-xs text-muted-foreground">
                {type.description}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <Button
          variant="outline"
          className="w-fit "
          onClick={() => setEventType(null)}
        >
          <ChevronLeftIcon className="mr-2" /> Retour
        </Button>
      )}
      {eventType === 'new-event' ? (
        <NewEventForm setEventType={setEventType} />
      ) : eventType === 'new-edition' ? (
        <NewEditionForm eventType={eventType} setEventType={setEventType} />
      ) : null}
    </>
  );
};

const NewEventForm = ({ setEventType }: { setEventType: SetEventType }) => {
  const { setData, post, processing, errors } = useForm({
    name: '',
    description: '',
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    post(route('events.store'), {
      preserveState: true,
      onSuccess: () => {
        console.log('success');
      },
    });
  };

  const checkFields = () => {
    return true;
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex flex-col space-y-4 mb-4">
        <div className="flex flex-col gap-2.5">
          <Label htmlFor="name">Nom</Label>
          <Input
            id="name"
            placeholder="Fête de la musique"
            onChange={(e) => setData('name', e.target.value)}
          />
          {errors.name && <p className="text-red-500 text-xs">{errors.name}</p>}
        </div>
        <div className="flex flex-col gap-2.5">
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            placeholder="Description"
            onChange={(e) => setData('description', e.target.value)}
          />
          <p className="text-muted-foreground text-xs">
            &Eacute;crivez quelques phrases à propos de votre événement.
          </p>
          {errors.description && (
            <p className="text-red-500 text-xs">{errors.description}</p>
          )}
        </div>
      </div>
      <hr className="my-2 h-1" />

      <DialogFooter>
        <DialogClose asChild>
          <Button variant="ghost" onClick={() => setEventType(null)}>
            Annuler
          </Button>
        </DialogClose>
        <Button type="submit" disabled={!checkFields() || processing}>
          {processing ? 'Traitement...' : 'Sauvegarder'}
        </Button>
      </DialogFooter>
    </form>
  );
};

const NewEditionForm = ({
  eventType,
  setEventType,
}: {
  eventType: string | null;
  setEventType: SetEventType;
}) => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('submit');
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex flex-col space-y-4 mb-4">
        <div className="flex flex-col gap-2.5">
          <Label htmlFor="event">&Eacute;vénement</Label>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Sélectionnez un événement" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>&Eacute;vénements</SelectLabel>
                <SelectItem value="event">&Eacute;vénement 1</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div className="flex flex-col gap-2.5">
          <Label htmlFor="name">Nom de la nouvelle édition</Label>
          <Input id="name" placeholder="Edition 2024" />
          <p className="text-muted-foreground text-xs">
            Une référence à l'édition, par exemple "2024"
          </p>
        </div>
        <div className="flex flex-row items-center gap-2.5">
          <Checkbox id="copySettings" />
          <Label htmlFor="copySettings">
            Copier les paramètres de la première édition
          </Label>
        </div>
      </div>
      <hr className="my-2 h-1" />
      <DialogFooter>
        <DialogClose asChild>
          <Button variant="ghost" onClick={() => setEventType(null)}>
            Annuler
          </Button>
        </DialogClose>
        <Button type="submit" disabled={eventType === null}>
          Sauvegarder
        </Button>
      </DialogFooter>
    </form>
  );
};
