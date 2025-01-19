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

// Composant générique pour gérer les listes (Tickets ou Extras)
const EditableList = ({
    items,
    setItems,
    errors,
    title,
    placeholder,
    addButtonText,
    onAddItem,
    onRemoveItem,
}: {
    items: any[];
    setItems: (items: any[]) => void;
    errors?: string;
    title: string;
    placeholder: string;
    addButtonText: string;
    onAddItem: () => void;
    onRemoveItem: (index: number) => void;
}) => {
    const handleChange = (idx: number, field: string, value: any) => {
        const updatedItems = [...items];
        updatedItems[idx][field] = value;
        setItems(updatedItems);
    };

    return (
        <div className="space-y-4 overflow-x-hidden overflow-y-auto">
            <Title level="h4" title={title} />
            <div className="grid grid-cols-6  gap-2">
                <Label
                    htmlFor="name"
                    className="col-span-2 md:col-span-3 text-sm"
                >
                    Nom
                </Label>
                <Label
                    htmlFor="quantity"
                    className="col-span-2 md:col-span-1 text-sm"
                >
                    Quantité
                </Label>
                <Label htmlFor="price" className="text-sm">
                    Prix
                </Label>
                {items.map((item, idx) => (
                    <div
                        key={idx}
                        className="col-span-6 grid grid-cols-6 gap-2"
                    >
                        <Input
                            name="name"
                            placeholder={placeholder}
                            value={item.name}
                            onChange={(e) =>
                                handleChange(idx, 'name', e.target.value)
                            }
                            className="col-span-2 md:col-span-3"
                        />
                        <Input
                            type="number"
                            name="quantity"
                            placeholder="0"
                            value={item.quantity}
                            onChange={(e) =>
                                handleChange(
                                    idx,
                                    'quantity',
                                    parseInt(e.target.value, 10)
                                )
                            }
                            className="col-span-2 md:col-span-1"
                        />
                        <Input
                            type="number"
                            name="price"
                            placeholder="0.00"
                            value={item.price}
                            onChange={(e) =>
                                handleChange(
                                    idx,
                                    'price',
                                    parseFloat(e.target.value)
                                )
                            }
                        />
                        <Button
                            variant="ghost"
                            className="w-fit"
                            onClick={() => onRemoveItem(idx)}
                        >
                            <Cross1Icon />
                        </Button>
                    </div>
                ))}
            </div>
            <Button variant="outline" onClick={onAddItem}>
                <PlusIcon className="mr-2" /> {addButtonText}
            </Button>
            {errors && <p className="text-red-500 text-xs mt-6">{errors}</p>}
        </div>
    );
};

// Composant principal TicketsStep
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
            <EditableList
                items={tickets}
                setItems={setTickets}
                errors={errors?.tickets}
                title="Billets"
                placeholder="Billet"
                addButtonText="Ajouter un billet"
                onAddItem={addTicket}
                onRemoveItem={removeTicket}
            />
            <EditableList
                items={extras}
                setItems={setExtras}
                errors={errors?.extras}
                title="Extras"
                placeholder="Extra"
                addButtonText="Ajouter un extra"
                onAddItem={addExtra}
                onRemoveItem={removeExtra}
            />
        </div>
    );
};
