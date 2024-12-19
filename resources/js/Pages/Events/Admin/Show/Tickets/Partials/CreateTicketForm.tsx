import { Field } from '@/Components/Admin/Field';
import { Row } from '@/Components/Admin/Row';
import { Button } from '@/Components/ui/button';
import { DialogFooter } from '@/Components/ui/dialog';
import { Input } from '@/Components/ui/input';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/Components/ui/popover';
import { Admission, Extra, PageProps } from '@/types';
import { cn } from '@/utils';
import { useForm, usePage } from '@inertiajs/react';
import { DialogTrigger } from '@radix-ui/react-dialog';
import { ChevronDownIcon, IdCardIcon, StarIcon } from '@radix-ui/react-icons';
import React, { useState } from 'react';
import { HexColorPicker } from 'react-colorful';

interface TicketFormData {
    type: 'admission' | 'extra' | undefined;
    name: string;
    color: string;
    price: number;
    quantity: number;
}

interface CreateTicketFormProps {
    eventId: string;
    setOpen: (value: boolean) => void;
    data?: Admission | Extra;
}

export const CreateTicketForm: React.FC<CreateTicketFormProps> = ({
    eventId,
    setOpen,
    data,
}) => {
    const [type, setType] = useState<'admission' | 'extra' | undefined>(
        data?.type ?? undefined
    );
    const [color, setColor] = useState('#aabbcc');
    const { setData, post, errors } = useForm<TicketFormData>({
        type: type,
        name: data?.name ?? '',
        color,
        price: data?.price ?? 0,
        quantity: data?.quantity ?? 0,
    });

    const cancel = () => {
        setType(undefined);
        setColor('#aabbcc');
    };

    const handleTypeChange = (type: 'admission' | 'extra') => {
        setType(type);
        setData('type', type);
    };

    const submit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (data) {
            // Update
            post(
                route('events.tickets.update', {
                    event: eventId,
                    ticketId: data.id,
                }),
                {
                    onSuccess: () => setOpen(false),
                    onError: (errs) => {
                        console.error('errors', errs);
                    },
                }
            );
            return;
        } else {
            // Create
            post(route('events.tickets.store', { event: eventId }), {
                onSuccess: () => setOpen(false),
                onError: (errs) => {
                    console.error('errors', errs);
                },
            });
            return;
        }
    };

    return (
        <form onSubmit={submit} className="space-y-8">
            <SwitchTicketType type={type} setType={handleTypeChange} />
            {type !== undefined && (
                <div className="space-y-4">
                    <Row>
                        <Field
                            className="w-3/5 shrink-0"
                            label="Nom"
                            id="name"
                            errors={errors}
                        >
                            <Input
                                id="name"
                                required
                                defaultValue={data?.name}
                                onChange={(e) =>
                                    setData('name', e.target.value)
                                }
                            />
                        </Field>
                        <Field label="Couleur" id="color" errors={errors}>
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Button
                                        variant="outline"
                                        className="!pl-1.5 !pr-2"
                                    >
                                        <div
                                            className="w-full h-6 rounded-md"
                                            style={{
                                                backgroundColor: color,
                                            }}
                                        ></div>
                                        <ChevronDownIcon className="w-6 h-6 ml-1.5" />
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-48 aspect-square">
                                    <HexColorPicker
                                        color={color}
                                        onChange={setColor}
                                        className="w-full"
                                    />
                                </PopoverContent>
                            </Popover>
                        </Field>
                    </Row>
                    <Row>
                        <Field
                            className="w-1/2"
                            id="price"
                            label="Prix"
                            errors={errors}
                        >
                            <Input
                                id="price"
                                type="number"
                                defaultValue={data?.price}
                                onChange={(e) =>
                                    setData('price', Number(e.target.value))
                                }
                                required
                            />
                        </Field>

                        <Field
                            className="w-1/2"
                            id="quantity"
                            label="Quantité"
                            errors={errors}
                        >
                            <Input
                                id="quantity"
                                type="number"
                                defaultValue={data?.quantity}
                                required
                                onChange={(e) =>
                                    setData('quantity', Number(e.target.value))
                                }
                            />
                        </Field>
                    </Row>
                </div>
            )}
            <CreateTicketFooter type={type} cancel={cancel} />
        </form>
    );
};

interface SwitchTicketTypeProps {
    type: 'admission' | 'extra' | undefined;
    setType: (type: 'admission' | 'extra') => void;
}

const SwitchTicketType: React.FC<SwitchTicketTypeProps> = ({
    type,
    setType,
}) => {
    return (
        <div className="flex gap-4">
            <div
                className={cn(
                    'w-full bg-accent hover:bg-accent-foreground/10 font-medium transition-colors text-accent-foreground rounded-md p-4 text-sm cursor-pointer',
                    {
                        'bg-accent-foreground/10 ring-2 ring-offset-2 ring-primary':
                            type === 'admission',
                    }
                )}
                onClick={() => {
                    setType('admission');
                }}
            >
                <IdCardIcon className="w-4 h-4 mb-2" />
                Billet d'entrée
                <p className="hidden md:block text-xs font-normal text-accent-foreground">
                    Un billet d'entrée, un pass VIP etc. <br /> Une personne par
                    billet.
                </p>
            </div>
            <div
                className={cn(
                    'w-full bg-accent hover:bg-accent-foreground/10 font-medium transition-colors text-accent-foreground rounded-md p-4 text-sm cursor-pointer',
                    {
                        'bg-accent-foreground/10 ring-2 ring-offset-2 ring-primary':
                            type === 'extra',
                    }
                )}
                onClick={() => {
                    setType('extra');
                }}
            >
                <StarIcon className="w-4 h-4 mb-2" />
                Extra
                <p className="hidden md:block text-xs font-normal text-accent-foreground">
                    Des tickets boissons, Une place de parking, etc.
                </p>
            </div>
        </div>
    );
};

interface CreateTicketFooterProps {
    type: 'admission' | 'extra' | undefined;
    cancel: () => void;
}

const CreateTicketFooter: React.FC<CreateTicketFooterProps> = ({
    type,
    cancel,
}) => {
    const { props } = usePage<PageProps>();

    return (
        type !== undefined && (
            <DialogFooter>
                <DialogTrigger asChild>
                    <Button variant="ghost" onClick={cancel}>
                        Annuler
                    </Button>
                </DialogTrigger>

                <Button
                    type="submit"
                    disabled={props.permissions.event.tickets.update === false}
                >
                    Sauvegarder {type === 'extra' ? "l'extra" : 'le billet'}
                </Button>
            </DialogFooter>
        )
    );
};
