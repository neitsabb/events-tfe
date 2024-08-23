import { Button } from '@/Components/ui/button';

import { DialogClose, DialogFooter } from '@/Components/ui/dialog';
import { Input } from '@/Components/ui/input';
import { Label } from '@/Components/ui/label';

import { Textarea } from '@/Components/ui/textarea';
import { useForm } from '@inertiajs/react';

export const NewEventForm: React.FC = () => {
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
          <Button variant="ghost">Annuler</Button>
        </DialogClose>
        <Button type="submit" disabled={!checkFields() || processing}>
          {processing ? 'Traitement...' : 'Sauvegarder'}
        </Button>
      </DialogFooter>
    </form>
  );
};
