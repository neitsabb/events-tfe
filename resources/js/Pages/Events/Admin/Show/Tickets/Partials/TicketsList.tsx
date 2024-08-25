import { Title } from '@/Components/Admin/Title';
import { Badge } from '@/Components/ui/badge';

import { Label } from '@/Components/ui/label';
import { Progress } from '@/Components/ui/progress';
import { Admission, Event, Extra } from '@/types';
import { useState } from 'react';
import { TicketDetailsDialog } from './TicketDetailsDialog';

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
                <div className="flex items-center flex-row gap-2">
                    <div className="w-3/6 text-xs shrink-0">Nom</div>
                    <div className="text-xs w-full">Prix</div>
                    <div className="text-xs w-2/6 shrink-0">&Eacute;mis</div>
                </div>
                <div className="mt-3 w-full flex flex-col space-y-3 divide-y divide-border">
                    {Object.values(admissions).map((ticket) =>
                        TicketItem({ ticket, setSelectedTicket })
                    )}
                </div>
            </div>
            <div className="space-y-4">
                <Title title="Extras" level="h4" />
                <div className="flex items-center flex-row gap-2">
                    <Label htmlFor="name" className="w-3/6 text-xs shrink-0">
                        Nom
                    </Label>

                    <Label htmlFor="price" className="text-xs w-full">
                        Prix
                    </Label>
                    <Label
                        htmlFor="quantity"
                        className="text-xs w-2/6 shrink-0"
                    >
                        &Eacute;mis
                    </Label>
                </div>
                <div className="mt-3 w-full flex flex-col space-y-3 ">
                    {Object.values(extras).map((ticket) =>
                        TicketItem({ ticket, setSelectedTicket })
                    )}
                </div>
            </div>
        </div>
    );
};

const TicketItem = ({
    ticket,
    setSelectedTicket,
}: {
    ticket: Admission | Extra;
    setSelectedTicket: (value: Admission | Extra) => void;
}) => {
    return (
        <div
            className="[&:not(:first-child)]:pt-3 cursor-pointer hover:bg-accent hover:text-accent-foreground w-full flex items-center gap-2 px-6 py-2 border-l-2 border-primary border-t-0"
            key={ticket.name}
            onClick={() => setSelectedTicket(ticket)}
        >
            <div className="w-3/6 shrink-0 font-medium">{ticket.name}</div>
            <div className="w-full text-sm grid place-content-left text-left">
                {ticket.price} €
            </div>
            <div className="w-2/6 shrink-0 flex flex-col gap-2">
                <Progress value={0} />
                <div className="!text-[10px] flex items-center justify-between">
                    <Badge variant="green" className=" !py-0.5">
                        Disponible
                    </Badge>
                    <span>0 / 100</span>
                </div>
            </div>
        </div>
    );
};
