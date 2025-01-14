import { CustomerContainer } from '@/Components/Customer/CustomerContainer';
import { Button } from '@/Components/ui/button';
import CustomerLayout from '@/Layouts/Customer/CustomerLayout';
import { Admission, Event, Extra, PageProps } from '@/types';
import { cn, compactAddress, getCookie, setCookie } from '@/utils';
import { Link, useForm, usePage } from '@inertiajs/react';
import { HeartFilledIcon, HeartIcon } from '@radix-ui/react-icons';
import { APIProvider, AdvancedMarker, Map } from '@vis.gl/react-google-maps';
import { format, isSameDay } from 'date-fns';
import { fr } from 'date-fns/locale';
import { Calendar, Pin } from 'lucide-react';
import { PropsWithChildren, useEffect, useState } from 'react';

type TicketSelected = Admission | Extra;

const View = () => {
    const { event } = usePage<
        PageProps<{
            event: Event;
        }>
    >().props;

    const { admissions, extras } = event.tickets;

    const [admissionsSelected, setAdmissionsSelected] = useState<
        { ticket: Admission; quantity: number }[]
    >([]);
    const [extrasSelected, setExtrasSelected] = useState<
        { ticket: Extra; quantity: number }[]
    >([]);

    const { setData, post } = useForm({
        admissions: admissionsSelected,
        extras: extrasSelected,
    });

    const updateAdmissionQuantity = (
        ticket: TicketSelected,
        quantity: number
    ) => {
        setAdmissionsSelected((prev) => {
            if (quantity === 0) {
                // Supprimer le ticket si la quantité est 0
                return prev.filter((t) => t.id !== ticket.id);
            }

            // Vérifier si le ticket existe déjà
            const exists = prev.find((t) => t.id === ticket.id);
            if (exists) {
                // Mettre à jour la quantité si le ticket existe déjà
                return prev.map((t) =>
                    t.id === ticket.id ? { ...t, quantity } : t
                );
            } else {
                // Ajouter un nouveau ticket avec l'ID, le nom, le prix et la quantité
                return [
                    ...prev,
                    {
                        id: ticket.id,
                        name: ticket.name,
                        price: ticket.price,
                        quantity,
                    },
                ];
            }
        });
    };

    // Fonction pour mettre à jour ou supprimer un ticket d'extra
    const updateExtraQuantity = (ticket: TicketSelected, quantity: number) => {
        setExtrasSelected((prev) => {
            if (quantity === 0) {
                // Supprimer le ticket si la quantité est 0
                return prev.filter((t) => t.id !== ticket.id);
            }

            // Vérifier si le ticket existe déjà
            const exists = prev.find((t) => t.id === ticket.id);
            if (exists) {
                // Mettre à jour la quantité si le ticket existe déjà
                return prev.map((t) =>
                    t.id === ticket.id ? { ...t, quantity } : t
                );
            } else {
                // Ajouter un nouveau ticket avec l'ID, le nom, le prix et la quantité
                return [
                    ...prev,
                    {
                        id: ticket.id,
                        name: ticket.name,
                        price: ticket.price,
                        quantity,
                    },
                ];
            }
        });
    };

    useEffect(() => {
        setData({
            admissions: admissionsSelected,
            extras: extrasSelected,
        });
    }, [admissionsSelected, extrasSelected]);

    const summaryHasContent =
        extrasSelected.length > 0 || admissionsSelected.length > 0;

    return (
        <CustomerLayout background={false} isHome={true}>
            <div className="border-b border-muted/20 border-dashed ">
                <Hero event={event} />
                <CustomerContainer className="grid grid-cols-3 gap-x-10 mt-10 mb-20 text-foreground">
                    <div className="col-span-3 md:col-span-2">
                        <Section title="Billets">
                            <TicketList
                                tickets={admissions}
                                onUpdateQuantity={updateAdmissionQuantity}
                            />
                        </Section>
                        <Section title="Extras">
                            <TicketList
                                tickets={extras}
                                onUpdateQuantity={updateExtraQuantity}
                            />
                        </Section>
                        {event.description && (
                            <Section title="Description" className="!max-w-xl">
                                <p className="text-muted-foreground tracking-wider">
                                    {event.description}
                                </p>
                            </Section>
                        )}

                        <Section title="Organisé par">
                            <div className="flex items-center gap-4">
                                <img
                                    src={event.organization.logo}
                                    alt={event.organization.name}
                                    className="w-12 h-12 rounded-full"
                                />
                                <div className="w-fit max-w-[300px] gap-12 flex items-center justify-between">
                                    <div>
                                        <h4 className="text-primary text-md font-semibold">
                                            {event.organization.name}
                                        </h4>
                                        <p className="text-black text-xs">
                                            9 abonnés
                                        </p>
                                        <p className="text-black text-sm">
                                            {event.organization.events_count}{' '}
                                            événements
                                        </p>
                                    </div>
                                    <Button variant="customer_blue">
                                        Suivre
                                    </Button>
                                </div>
                            </div>
                        </Section>
                        {event.tags.length > 0 && (
                            <Section title="Vibes">
                                <ul className="!max-w-xl flex flex-wrap items-center gap-2">
                                    {event.tags.map((tag, i) => (
                                        <li
                                            key={i}
                                            className="px-5 py-2 border border-white/5 rounded-full bg-primary"
                                        >
                                            <span className="text-primary-foreground uppercase text-sm font-semibold tracking-wide">
                                                {tag}
                                            </span>
                                        </li>
                                    ))}
                                </ul>
                            </Section>
                        )}
                        <Section title="Lieu">
                            <ul className="text-black mb-4">
                                <li className="flex items-center gap-6">
                                    <div>
                                        <Pin />
                                    </div>
                                    <div className="w-ful py-4">
                                        <span className="">
                                            {compactAddress(event.location)}
                                        </span>{' '}
                                    </div>
                                </li>
                            </ul>
                            <div className="w-full h-[186px] rounded-lg overflow-hidden">
                                <APIProvider
                                    apiKey={
                                        'AIzaSyCBSL2QY5gvl7EiXFTs-K2R1rQ6qrbEN5E'
                                    }
                                >
                                    <Map
                                        style={{
                                            width: '100%',
                                            height: '186px',
                                            borderRadius: '16px',
                                        }}
                                        zoom={16}
                                        center={{
                                            lat: event.coords.lat,
                                            lng: event.coords.lng,
                                        }}
                                        mapId="35f7ad3bd275c6c"
                                        disableDefaultUI={true}
                                    >
                                        <AdvancedMarker
                                            position={{
                                                lat: event.coords.lat,
                                                lng: event.coords.lng,
                                            }}
                                        >
                                            <Pin />
                                        </AdvancedMarker>
                                    </Map>
                                </APIProvider>
                            </div>
                        </Section>
                    </div>
                    {summaryHasContent && (
                        <Summary
                            admissionsSelected={admissionsSelected}
                            extrasSelected={extrasSelected}
                            post={post}
                        />
                    )}
                </CustomerContainer>
            </div>
        </CustomerLayout>
    );
};

export default View;

const Hero = ({ event }: { event: Event }) => {
    return (
        <>
            <div className="absolute top-0 left-0 w-full h-[60vh] blur-3xl z-0">
                <img
                    src={`${event.image}`}
                    alt={event.name}
                    className="w-full h-full object-cover opacity-40"
                />
            </div>
            <div className="bg-primary pt-16 lg:pt-0">
                <CustomerContainer className="py-12 gap-10 lg:gap-16 flex flex-col-reverse lg:flex-row items-center justify-between ">
                    <div className="shrink-0 w-full lg:w-1/3 grow-0 lg:min-h-[70vh] flex flex-col gap-4 justify-center z-30">
                        <h2 className="text-4xl font-black uppercase text-primary-foreground">
                            {event.name}
                        </h2>
                        <div className="text-sm text-primary-foreground tracking-wide">
                            Par{' '}
                            <Link
                                href="#"
                                className="font-semibold text-accent"
                            >
                                {event.organization.name}
                            </Link>
                        </div>
                        <ul className="text-primary-foreground">
                            <li className="flex items-center gap-6">
                                <div>
                                    <Calendar />
                                </div>
                                <div className="w-full text-muted border-white/10 border-b py-4">
                                    {isSameDay(
                                        new Date(event.start_date),
                                        new Date(event.end_date)
                                    ) ? (
                                        <>
                                            <span className="text-orange">
                                                {format(
                                                    new Date(event.start_date),
                                                    'EEEE dd/MM/yyyy',
                                                    { locale: fr }
                                                )}
                                            </span>{' '}
                                            de{' '}
                                            {format(
                                                new Date(event.start_date),
                                                'HH:mm',
                                                { locale: fr }
                                            )}{' '}
                                            <span className="text-primary-foreground">
                                                à
                                            </span>{' '}
                                            {format(
                                                new Date(event.end_date),
                                                'HH:mm',
                                                { locale: fr }
                                            )}
                                        </>
                                    ) : (
                                        <>
                                            Du{' '}
                                            <span className="text-muted">
                                                {format(
                                                    new Date(event.start_date),
                                                    'EE dd/MM/yyyy',
                                                    { locale: fr }
                                                )}
                                            </span>{' '}
                                            à{' '}
                                            {format(
                                                new Date(event.start_date),
                                                'HH:mm',
                                                { locale: fr }
                                            )}{' '}
                                            <br />
                                            Au{' '}
                                            <span className="text-muted">
                                                {format(
                                                    new Date(event.end_date),
                                                    'EE dd/MM/yyyy',
                                                    { locale: fr }
                                                )}
                                            </span>{' '}
                                            à{' '}
                                            {format(
                                                new Date(event.end_date),
                                                'HH:mm',
                                                { locale: fr }
                                            )}{' '}
                                        </>
                                    )}
                                </div>
                            </li>
                            <li className="flex items-center gap-6">
                                <div>
                                    <Pin />
                                </div>
                                <div className="w-full text-muted-foreground py-4">
                                    <span className="text-primary-foreground">
                                        {compactAddress(event.location)}
                                    </span>{' '}
                                </div>
                            </li>
                        </ul>
                        <div className="flex flex-col lg:flex-row gap-4 ">
                            <Button
                                variant={'customer_blue'}
                                className="w-full"
                            >
                                Maintenant à {event.price} €
                            </Button>
                            <InterestedButton eventId={event.id as string} />
                        </div>
                        <p className="text-primary-foreground text-sm text-center lg:text-left">
                            <b>62</b> sont personnes intéressé(e)s
                        </p>
                    </div>
                    <div className="w-full lg:max-w-xl xl:max-w-3xl z-40">
                        <img
                            className="w-full object-cover aspect-video rounded-sm shadow-2xl"
                            src={`${event.image}`}
                            alt={event.name}
                        />
                    </div>
                </CustomerContainer>
            </div>
        </>
    );
};

const InterestedButton: React.FC<{ eventId: string }> = ({ eventId }) => {
    const [isInterested, setIsInterested] = useState(false);

    useEffect(() => {
        const interestedEvents = getCookie('interested_events');
        if (interestedEvents) {
            const interestedIds = JSON.parse(interestedEvents);
            setIsInterested(interestedIds.includes(eventId));
        }
    }, [eventId]);

    const toggleInterest = () => {
        const interestedEvents = getCookie('interested_events');
        let interestedIds = interestedEvents
            ? JSON.parse(interestedEvents)
            : [];

        if (isInterested) {
            // Si déjà intéressé, on retire l'ID
            interestedIds = interestedIds.filter(
                (id: string) => id !== eventId
            );
        } else {
            // Ajouter l'ID de l'événement
            interestedIds.push(eventId);
        }

        // Mettre à jour le cookie
        setCookie('interested_events', JSON.stringify(interestedIds), 7); // Expire dans 7 jours
        setIsInterested(!isInterested);
    };

    return (
        <Button
            variant={'customer_blue'}
            className="w-full flex items-center gap-1"
            onClick={toggleInterest}
        >
            {isInterested ? (
                <HeartFilledIcon />
            ) : (
                <HeartIcon strokeWidth={3} className="mt-0.5" />
            )}
            {isInterested ? 'Intéressé' : 'Intéressé(e)'}
        </Button>
    );
};

const Summary = ({
    admissionsSelected,
    extrasSelected,
    post,
}: {
    admissionsSelected: { ticket: Admission; quantity: number }[];
    extrasSelected: { ticket: Extra; quantity: number }[];
    post: (url: string) => void;
}) => {
    const [isOpen, setIsOpen] = useState(false);

    const total = [...admissionsSelected, ...extrasSelected]
        .map(({ price, quantity }) => price * quantity) // Calculer prix * quantité
        .reduce((acc, curr) => acc + curr, 0); // Additionner tous les totaux

    return (
        <div
            className={cn(
                'fixed right-0 left-0 bottom-0 md:relative bg-white z-40 md:bg-background rounded-lg self-start space-y-4 text-black transition-height duration-300',
                isOpen ? 'translate-y-0' : 'translate-y-[79%] md:translate-y-0'
            )}
        >
            <h3
                className="p-4  pb-0 text-lg font-semibold flex justify-between items-center cursor-pointer md:cursor-auto"
                onClick={() => setIsOpen(!isOpen)}
            >
                Récapitulatif
            </h3>
            <ul>
                {[...admissionsSelected, ...extrasSelected].map(
                    ({ id, name, price, quantity }, idx) => {
                        // Calcul du total pour ce ticket
                        const totalPrice = price * quantity;

                        return (
                            <li key={idx} className=" p-4">
                                <h4 className="font-medium text-sm">{name}</h4>
                                <div className="flex items-center justify-between">
                                    x {quantity} <span>{totalPrice} €</span>
                                </div>
                            </li>
                        );
                    }
                )}
            </ul>
            <div className="p-4 border-t">
                <div className="flex items-center justify-between">
                    <span>Total</span>
                    <span>{total}€</span>
                </div>
                <Button
                    onClick={() => post(route('payment.checkout'))}
                    variant={'customer_primary'}
                    className="w-full mt-4"
                >
                    Payer
                </Button>
            </div>
        </div>
    );
};
const Section = ({
    children,
    className,
    title,
    ...props
}: PropsWithChildren<{ className?: string; title: string }>) => {
    return (
        <section className={cn('!max-w-3xl py-8', className)} {...props}>
            <h3 className="text-black text-2xl font-semibold mb-4">{title}</h3>
            {children}
        </section>
    );
};

const TicketList = ({
    tickets,
    onUpdateQuantity,
}: {
    tickets: (Admission | Extra)[]; // Peut contenir Admission ou Extra
    onUpdateQuantity: (ticket: TicketSelected, quantity: number) => void;
}) => {
    return (
        <div className="grid grid-cols-1 gap-4 mt-6">
            {Object.values(tickets).map((ticket) => (
                <Ticket
                    ticket={ticket}
                    key={ticket.id}
                    onUpdateQuantity={onUpdateQuantity}
                />
            ))}
        </div>
    );
};

const Ticket = ({
    ticket,
    onUpdateQuantity,
}: {
    ticket: Admission | Extra;
    onUpdateQuantity: (ticket: Admission | Extra, quantity: number) => void;
}) => {
    const [quantity, setQuantity] = useState(0);

    const handleIncrementQuantity = () => {
        setQuantity((prev) => prev + 1);
        onUpdateQuantity(ticket, quantity + 1);
    };

    const handleDecrementQuantity = () => {
        if (quantity > 0) {
            setQuantity((prev) => prev - 1);
            onUpdateQuantity(ticket, quantity - 1);
        }
    };

    return (
        <div className="border-black/5 border-2 p-6 flex items-center justify-between gap-4">
            <div>
                <div className="space-y-2">
                    <h4 className="text-primary text-lg font-semibold">
                        {ticket.name}
                    </h4>
                    <p className="text-black text-sm font-mono">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Odit suscipit commodi ullam cupiditate ab aut quasi
                        ipsa, deserunt dicta officiis alias quo hic esse
                        temporibus porro consequuntur rem? Accusantium, fugit?
                    </p>
                </div>
                <p className="text-black font-medium text-sm">
                    {ticket.price} €
                </p>
            </div>
            <div className="flex items-center gap-2">
                {quantity === 0 ? (
                    <Button
                        variant={'customer_yellow'}
                        onClick={handleIncrementQuantity}
                    >
                        Ajouter
                    </Button>
                ) : (
                    <>
                        <Button
                            variant="customer_blue"
                            className="!px-4 !py-3 uppercase !font-semibold w-8 h-8 grid place-content-center rounded-full"
                            onClick={handleDecrementQuantity}
                        >
                            -
                        </Button>
                        <span className="text-black">{quantity}</span>
                        <Button
                            variant="customer_blue"
                            className="!px-4 !py-3 uppercase !font-semibold w-8 h-8 grid place-content-center rounded-full"
                            onClick={handleIncrementQuantity}
                        >
                            +
                        </Button>
                    </>
                )}
            </div>
        </div>
    );
};
