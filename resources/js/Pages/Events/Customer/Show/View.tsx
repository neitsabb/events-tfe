import { Button } from '@/Components/ui/button';
import CustomerLayout from '@/Layouts/Customer/CustomerLayout';
import { Admission, EventProps, Extra } from '@/types';
import { cn, compactAddress } from '@/utils';
import { Link, useForm } from '@inertiajs/react';
import { APIProvider, AdvancedMarker, Map } from '@vis.gl/react-google-maps';
import { format, isSameDay } from 'date-fns';
import { Calendar, Heart, House, Minus, Pin, Plus } from 'lucide-react';
import { PropsWithChildren, useEffect, useState } from 'react';
import { fr } from 'date-fns/locale';
import { CustomerContainer } from '@/Components/Customer/CustomerContainer';

const artists = [
    {
        name: 'KAROL DHE',
        image: 'https://res.cloudinary.com/shotgun/image/upload/ar_1:1,c_limit,f_auto,fl_lossy,q_auto,w_240/v1712868422/production/artworks/artists/karol_dhe',
    },
];

const tags = [
    {
        name: 'House',
    },
    {
        name: 'Techno',
    },
    {
        name: 'Electro',
    },
    {
        name: 'Hip-Hop',
    },
    {
        name: 'Rap',
    },
    {
        name: 'Reggae',
    },
    {
        name: 'Dancehall',
    },
    {
        name: 'Afrobeat',
    },
];

type TicketSelected = Admission | Extra;

const View: React.FC<EventProps> = ({ event }) => {
    const { admissions, extras } = event.tickets;

    const [admissionsSelected, setAdmissionsSelected] = useState<
        { ticket: Admission; quantity: number }[]
    >([]);
    const [extrasSelected, setExtrasSelected] = useState<
        { ticket: Extra; quantity: number }[]
    >([]);

    const { data, setData, post } = useForm({
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

    const handleCheckout = () => {
        post(route('payment.checkout'));
    };

    useEffect(() => {
        setData({
            admissions: admissionsSelected,
            extras: extrasSelected,
        });
    }, [admissionsSelected, extrasSelected]);
    return (
        <CustomerLayout background={true}>
            <div className="border-b border-muted/20 border-dashed">
                <div className="absolute top-0 left-0 w-full h-[60vh] blur-3xl z-0">
                    <img
                        src={event.image}
                        alt={event.name}
                        className="w-full h-full object-cover opacity-40"
                    />
                </div>
                <CustomerContainer className="py-12 md:gap-16 lg:gap-0 flex flex-col-reverse md:flex-row items-center justify-between ">
                    <div className="shrink-0 w-full md:w-1/3 grow-0 min-h-[70vh] flex flex-col gap-4 justify-center z-30">
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
                                <div className="w-full text-muted-foreground  border-white/10 border-b py-4 text-primary-foreground">
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
                        <div className="flex md:flex-col gap-4">
                            <Button variant={'customer_blue'}>
                                Maintenant à 16,50 €
                            </Button>
                        </div>
                        <p className="text-primary-foreground text-sm">
                            <b>62</b> sont personnes intéressé(e)s
                        </p>
                    </div>
                    <div className="w-full md:max-w-xl lg:max-w-3xl z-40">
                        <img
                            className="w-full object-cover aspect-video rounded-sm shadow-2xl"
                            src={event.image}
                            alt={event.name}
                        />
                    </div>
                </CustomerContainer>
                <CustomerContainer className="grid grid-cols-3 mb-20">
                    <div className="col-span-2">
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
                        <Section title="Description" className="!max-w-xl">
                            <p className="text-muted-foreground tracking-wider">
                                {event.description}
                            </p>
                        </Section>
                        <Section title="Organisé par">
                            <div className="flex items-center gap-4">
                                <img
                                    src="https://res.cloudinary.com/shotgun/image/upload/ar_1:1,c_limit,f_auto,fl_lossy,h_48,q_auto,w_48/v1721265352/production/artworks/White_garden_photo_profil_rbdg42"
                                    alt="Karol Dhe"
                                    className="w-12 h-12 rounded-full"
                                />
                                <div className="w-fit max-w-[300px] gap-12 flex items-center justify-between">
                                    <div>
                                        <h4 className="text-primary-foreground text-md font-semibold">
                                            {event.organization.name}
                                        </h4>
                                        <p className="text-primary-foreground text-xs">
                                            9 abonnés
                                        </p>
                                        <p className="text-primary-foreground text-sm">
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
                        <Section title="Vibes">
                            <ul className="!max-w-xl flex flex-wrap items-center gap-2">
                                {tags.map((tag, i) => (
                                    <li
                                        key={i}
                                        className="px-5 py-2 border border-white/5 rounded-full bg-primary-foreground/20"
                                    >
                                        <span className="text-primary-foreground uppercase text-sm font-semibold tracking-wide">
                                            {tag.name}
                                        </span>
                                    </li>
                                ))}
                            </ul>
                        </Section>
                        <Section title="Lieu">
                            <ul className="text-primary-foreground mb-4">
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
                    {extrasSelected.length > 0 ||
                    admissionsSelected.length > 0 ? (
                        <div className="bg-background rounded-lg  self-start space-y-4">
                            <h3 className="p-4 text-lg font-semibold text-background-foreground">
                                Récapitulatif
                            </h3>
                            <ul className="divide-y">
                                {[...admissionsSelected, ...extrasSelected].map(
                                    ({ id, name, price, quantity }, idx) => {
                                        // Calcul du total pour ce ticket
                                        const totalPrice = price * quantity;

                                        return (
                                            <li key={idx} className=" p-4">
                                                <h4 className="font-medium text-sm">
                                                    {name}
                                                </h4>
                                                <div className="flex items-center justify-between">
                                                    x {quantity}{' '}
                                                    <span>{totalPrice} €</span>
                                                </div>
                                            </li>
                                        );
                                    }
                                )}
                            </ul>
                            <div className="p-4 border-t">
                                <div className="flex items-center justify-between">
                                    <span>Total</span>
                                    <span>
                                        {
                                            // Calcul du total global
                                            [
                                                ...admissionsSelected,
                                                ...extrasSelected,
                                            ]
                                                .map(
                                                    ({ price, quantity }) =>
                                                        price * quantity
                                                ) // Calculer prix * quantité
                                                .reduce(
                                                    (acc, curr) => acc + curr,
                                                    0
                                                ) // Additionner tous les totaux
                                        }{' '}
                                        €
                                    </span>
                                </div>
                                <Button
                                    onClick={() =>
                                        post(route('payment.checkout'))
                                    }
                                    variant={'customer_blue'}
                                    className="w-full mt-4"
                                >
                                    Payer
                                </Button>
                            </div>
                        </div>
                    ) : null}
                </CustomerContainer>
            </div>
        </CustomerLayout>
    );
};

export default View;

const Section = ({
    children,
    className,
    title,
    ...props
}: PropsWithChildren<{ className?: string; title: string }>) => {
    return (
        <section className={cn('!max-w-3xl py-8', className)} {...props}>
            <h3 className="text-primary-foreground text-2xl font-semibold mb-4">
                {title}
            </h3>
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
        <div className="border-white/5 border-2 p-6 rounded-sm flex items-center justify-between">
            <div>
                <h4 className="text-primary-foreground text-lg font-semibold">
                    {ticket.name}
                </h4>
                <p className="text-primary-foreground text-sm">
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
                            variant="secondary"
                            className="!px-4 !py-3 uppercase !font-semibold w-8 h-8 grid place-content-center rounded-full"
                            onClick={handleDecrementQuantity}
                        >
                            -
                        </Button>
                        <span className="text-primary-foreground">
                            {quantity}
                        </span>
                        <Button
                            variant="secondary"
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
