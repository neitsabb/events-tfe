import { Title } from '@/Components/Admin/Title';
import { Badge } from '@/Components/ui/badge';

import { Label } from '@/Components/ui/label';
import { Progress } from '@/Components/ui/progress';
import { Admission, Event, Extra } from '@/types';
import { useState } from 'react';
import { TicketDetailsDialog } from './TicketDetailsDialog';
import { Button } from '@/Components/ui/button';
import { TrashIcon } from '@radix-ui/react-icons';
import { router } from '@inertiajs/react';
import { toast } from '@/Components/ui/use-toast';

export const TicketsList = ({
    event,
    admissions,
    extras,
}: {
    event: Event;
    admissions: Admission[];
    extras: Extra[];
}) => {
    const [selectedTicket, setSelectedTicket] = useState<
        Admission | Extra | null
    >(null);

    const handleClose = () => {
        setSelectedTicket(null);
    };

    return (
        <div className="space-y-8">
            <TicketDetailsDialog
                event={event}
                ticket={selectedTicket}
                handleClose={handleClose}
            />
            <div className="space-y-4">
                <Title title="Admission générale" level="h4" />
                <div className="flex items-center flex-row gap-2 pr-5 md:pr-20">
                    <div className="w-2/6 md:w-3/6 text-xs shrink-0">Nom</div>
                    <div className="text-xs w-full pl-1 md:pl-2">Prix</div>
                    <div className="text-xs w-2/6 shrink-0">Vendus</div>
                </div>
                <div className="mt-3 w-full flex flex-col space-y-3 ">
                    {Object.values(admissions).map((ticket) =>
                        TicketItem({ event, ticket, setSelectedTicket })
                    )}
                </div>
            </div>
            <div className="space-y-4">
                <Title title="Extras" level="h4" />
                <div className="flex items-center flex-row gap-2 pr-5 md:pr-20">
                    <Label
                        htmlFor="name"
                        className="w-2/6 md:w-3/6 text-xs shrink-0"
                    >
                        Nom
                    </Label>

                    <Label
                        htmlFor="price"
                        className="text-xs w-full pl-1  md:pl-2"
                    >
                        Prix
                    </Label>
                    <Label
                        htmlFor="quantity"
                        className="text-xs w-2/6 shrink-0"
                    >
                        Vendus
                    </Label>
                </div>
                <div className="mt-3 w-full flex flex-col space-y-3 ">
                    {Object.values(extras).map((ticket) =>
                        TicketItem({ event, ticket, setSelectedTicket })
                    )}
                </div>
            </div>
        </div>
    );
};

const TicketItem = ({
    event,
    ticket,
    setSelectedTicket,
}: {
    event: Event;
    ticket: Admission | Extra;
    setSelectedTicket: (value: Admission | Extra) => void;
}) => {
    const handleClick = () => {
        if (ticket.sold && ticket.sold > 0) {
            return toast({
                title: 'Erreur',
                description:
                    'Impossible de supprimer un billet qui a déjà été vendu',
            });
        }
        console.log('Delete ticket', ticket);
        router.delete(
            route('events.tickets.delete', { event, ticket: ticket.id }),
            {
                preserveState: false,
                preserveScroll: true,
                onSuccess: (response) => {
                    toast({
                        title: 'Succès',
                        description: response.props.flash.success,
                    });
                },
            }
        );
    };

    const soldPercentage = (ticket.sold / ticket.quantity) * 100;

    return (
        <div
            className="[&:not(:first-child)]:pt-3 flex flex-col gap-y-4 md:flex-row md:items-center cursor-pointer hover:bg-accent hover:text-accent-foreground w-full  py-2 border-l-2 border-primary  pr-4"
            key={ticket.name}
        >
            <div
                onClick={() => setSelectedTicket(ticket)}
                className="w-full flex items-center gap-2 px-2 md:px-6"
            >
                <div className="truncate w-2/6 md:w-3/6 shrink-0 font-medium">
                    {ticket.name}
                </div>
                <div className="w-full text-sm grid place-content-left text-left">
                    {ticket.price} €
                </div>
                <div className="w-2/6 shrink-0 flex flex-col gap-2">
                    <Progress value={soldPercentage} className="" />
                    <div className="!text-[10px] flex flex-row flex-wrap gap-y-1 items-center justify-between">
                        <Badge
                            variant={
                                soldPercentage < 100 ? 'green' : 'destructive'
                            }
                            className=" !py-0.5 self-start"
                        >
                            {soldPercentage < 100 ? 'Disponible' : 'épuisé'}
                        </Badge>
                        <span>
                            {ticket.sold} / {ticket.quantity}
                        </span>
                    </div>
                </div>
            </div>
            <Button variant="outline" className="ml-2" onClick={handleClick}>
                <TrashIcon />
            </Button>
        </div>
    );
};
