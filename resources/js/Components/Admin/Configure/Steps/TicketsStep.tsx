import { Cross1Icon, PlusIcon } from '@radix-ui/react-icons';
import { Button } from '@/Components/ui/button';
import { Title } from '@/Components/Admin/Title';
import { Label } from '@/Components/ui/label';
import { Input } from '@/Components/ui/input';
import { Admission, ErrorsProps, Extra } from '@/types';

// Définir les types ou interfaces pour Admission, Extra et ErrorsProps

interface TicketsStepProps {
  tickets: Admission[];
  setTickets: (tickets: Admission[]) => void;
  extras: Extra[];
  setExtras: (extras: Extra[]) => void;
  errors: ErrorsProps;
}

export const TicketsStep = ({
  tickets,
  setTickets,
  extras,
  setExtras,
  errors,
}: TicketsStepProps) => {
  const addTicket = () =>
    setTickets([...tickets, { name: '', quantity: 0, price: 0.0 }]);

  const addExtra = () =>
    setExtras([...extras, { name: '', quantity: 0, price: 0.0 }]);

  const removeTicket = (idx: number) =>
    setTickets(tickets.filter((_, i) => i !== idx));

  const removeExtra = (idx: number) =>
    setExtras(extras.filter((_, i) => i !== idx));

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div>
          <Title level="h4" title={'Billets'} />
          <p className="text-xs text-primary/50">
            Vous pouvez ajouter autant de types de billets que vous le
            souhaitez.
          </p>
        </div>
        <div className="grid grid-cols-6 gap-2">
          <Label htmlFor="name" className="col-span-3 text-sm">
            Nom
          </Label>
          <Label htmlFor="quantity" className="text-sm">
            Quantité
          </Label>
          <Label htmlFor="price" className="text-sm">
            Prix
          </Label>

          {tickets.map((ticket, idx) => (
            <div key={idx} className="col-span-6 grid grid-cols-6 gap-2">
              <Input
                name="name"
                placeholder="Billet"
                value={ticket.name}
                onChange={(e) => {
                  const newTickets = [...tickets];
                  newTickets[idx].name = e.target.value;
                  setTickets(newTickets);
                }}
                className="col-span-3"
              />
              <Input
                type="number"
                name="quantity"
                placeholder="0"
                value={ticket.quantity}
                onChange={(e) => {
                  const newTickets = [...tickets];
                  newTickets[idx].quantity = parseInt(e.target.value, 10);
                  setTickets(newTickets);
                }}
              />
              <Input
                type="number"
                name="price"
                value={ticket.price}
                placeholder="0.00"
                onChange={(e) => {
                  const newTickets = [...tickets];
                  newTickets[idx].price = parseFloat(e.target.value);
                  setTickets(newTickets);
                }}
              />
              <Button
                variant="ghost"
                className="w-fit"
                onClick={() => removeTicket(idx)}
              >
                <Cross1Icon />
              </Button>
            </div>
          ))}
        </div>
        <Button variant={'outline'} onClick={addTicket}>
          <PlusIcon className="mr-2" /> Ajouter un billet
        </Button>
      </div>
      <div className="space-y-4">
        <Title level="h4" title={'Extras'} />

        <div className="grid grid-cols-6 gap-2">
          <Label htmlFor="name" className="col-span-3 text-sm">
            Nom
          </Label>
          <Label htmlFor="quantity" className="text-sm">
            Quantité
          </Label>
          <Label htmlFor="price" className="text-sm">
            Prix
          </Label>

          {extras.map((extra, idx) => (
            <div key={idx} className="col-span-6 grid grid-cols-6 gap-2">
              <Input
                name="name"
                placeholder="Extra"
                value={extra.name}
                onChange={(e) => {
                  const newExtras = [...extras];
                  newExtras[idx].name = e.target.value;
                  setExtras(newExtras);
                }}
                className="col-span-3"
              />
              <Input
                type="number"
                name="quantity"
                placeholder="0"
                value={extra.quantity}
                onChange={(e) => {
                  const newExtras = [...extras];
                  newExtras[idx].quantity = parseInt(e.target.value, 10);
                  setExtras(newExtras);
                }}
              />
              <Input
                type="number"
                name="price"
                value={extra.price}
                placeholder="0.00"
                onChange={(e) => {
                  const newExtras = [...extras];
                  newExtras[idx].price = parseFloat(e.target.value);
                  setExtras(newExtras);
                }}
              />
              <Button
                variant="ghost"
                className="w-fit"
                onClick={() => removeExtra(idx)}
              >
                <Cross1Icon />
              </Button>
            </div>
          ))}
        </div>
        <Button variant={'outline'} onClick={addExtra}>
          <PlusIcon className="mr-2" /> Ajouter un extra
        </Button>
      </div>
      {errors?.extras && (
        <p className="text-red-500 text-xs mt-6">{errors.extras}</p>
      )}
    </div>
  );
};
