import { Title } from "@/Components/Admin/Title";
import { Badge } from "@/Components/ui/badge";
import { Button } from "@/Components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/Components/ui/dialog";
import { Label } from "@/Components/ui/label";
import { Progress } from "@/Components/ui/progress";
import EventSingleLayout from "@/Layouts/Admin/EventSingleLayout";
import { Admission, Event, Extra, PageProps } from "@/types";
import { PlusIcon } from "@radix-ui/react-icons";
import { useState } from "react";
import { CreateTicketForm } from "./Partials/CreateTicketForm";

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/Components/ui/card";
import { Input } from "@/Components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/Components/ui/tabs";

const tickets = [
    { name: "Adulte", quantity: 100, price: 20.0 },
    { name: "Enfant", quantity: 50, price: 10.0 },
    { name: "VIP", quantity: 10, price: 100.0 },
];

const View = ({
    auth,
    event,
}: PageProps & {
    event: Event;
}) => {
    const { admissions, extras } = event.tickets;
    return (
        <EventSingleLayout auth={auth} event={event}>
            <div className="flex justify-between items-center mb-6">
                <Title title="Billets" level="h3" />
                <CreateTicketDialog event={event} />
            </div>
            <TicketsList
                event={event}
                admissions={admissions}
                extras={extras}
            />
        </EventSingleLayout>
    );
};

export default View;

const TicketsList = ({
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
                    {Object.values(admissions).map((ticket, id) => {
                        return (
                            <div
                                className="[&:not(:first-child)]:pt-3 cursor-pointer"
                                key={ticket.name}
                                onClick={() => setSelectedTicket(ticket)}
                            >
                                <div className="w-full flex items-center gap-2 px-6 py-1 border-l-2 border-primary">
                                    <div className="w-3/6 shrink-0 font-medium">
                                        {ticket.name}
                                    </div>
                                    <div className="w-full text-sm grid place-content-left text-left">
                                        {ticket.price} €
                                    </div>
                                    <div className="w-2/6 shrink-0 flex flex-col gap-2">
                                        <Progress value={0} />
                                        <div className="!text-[10px] flex items-center justify-between">
                                            <Badge
                                                variant="green"
                                                className=" !py-0.5"
                                            >
                                                Disponible
                                            </Badge>
                                            <span>0 / 100</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
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
                <div className="mt-3 w-full flex flex-col space-y-3 divide-y divide-border">
                    {Object.values(extras)?.map((ticket, id) => {
                        return (
                            <div
                                className="[&:not(:first-child)]:pt-3"
                                key={`${ticket.name}-${id}`}
                                onClick={() => setSelectedTicket(ticket)}
                            >
                                <div className="w-full flex items-center gap-2 px-6 py-1 border-l-2 border-primary">
                                    <div className="w-3/6 shrink-0 font-medium">
                                        {ticket.name}
                                    </div>
                                    <div className="w-full text-sm grid place-content-left text-left">
                                        {ticket.price} €
                                    </div>
                                    <div className="w-2/6 shrink-0 flex flex-col gap-2">
                                        <Progress value={0} />
                                        <div className="!text-[10px] flex items-center justify-between">
                                            <Badge
                                                variant="green"
                                                className=" !py-0.5"
                                            >
                                                Disponible
                                            </Badge>
                                            <span>0 / 100</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

const CreateTicketDialog = ({ event }: { event: Event }) => {
    const [open, setOpen] = useState<boolean>(false);
    return (
        <Dialog open={open}>
            <DialogTrigger asChild>
                <Button variant={"outline"} onClick={() => setOpen(true)}>
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

const TicketDetailsDialog = ({
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
                        <TabsTrigger value="availability">
                            Disponibilité
                        </TabsTrigger>
                    </TabsList>
                    <TabsContent value="settings" className="!ring-0">
                        <CreateTicketForm
                            eventId={event.id}
                            setOpen={handleClose}
                            data={ticket}
                        />
                    </TabsContent>
                    <TabsContent value="availability">
                        Disponibilité
                    </TabsContent>
                </Tabs>
            </DialogContent>
        </Dialog>
    );
};
