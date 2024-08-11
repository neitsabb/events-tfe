import { Button } from "@/Components/ui/button";
import CustomerLayout from "@/Layouts/Customer/CustomerLayout";
import { Admission, Event, Extra } from "@/types";
import { cn } from "@/utils";
import { Link } from "@inertiajs/react";
import { APIProvider, AdvancedMarker, Map } from "@vis.gl/react-google-maps";
import { Calendar, Heart, House, Pin } from "lucide-react";
import { PropsWithChildren } from "react";

const artists = [
    {
        name: "KAROL DHE",
        image: "https://res.cloudinary.com/shotgun/image/upload/ar_1:1,c_limit,f_auto,fl_lossy,q_auto,w_240/v1712868422/production/artworks/artists/karol_dhe",
    },
];

const tags = [
    {
        name: "House",
    },
    {
        name: "Techno",
    },
    {
        name: "Electro",
    },
    {
        name: "Hip-Hop",
    },
    {
        name: "Rap",
    },
    {
        name: "Reggae",
    },
    {
        name: "Dancehall",
    },
    {
        name: "Afrobeat",
    },
];
const View = ({ event }: { event: Event }) => {
    const { admissions, extras } = event.tickets;

    console.log(event);
    return (
        <CustomerLayout bg={true}>
            <div className="absolute top-0 left-0 w-full h-[60vh] blur-3xl z-0">
                <img
                    src={event.image}
                    alt={event.name}
                    className="w-full h-full object-cover opacity-40"
                />
            </div>
            <section className="container !max-w-7xl py-12 md:gap-16 lg:gap-0 flex flex-col-reverse md:flex-row items-center justify-between ">
                <div className="shrink-0 w-full md:w-1/3 grow-0 min-h-[70vh] flex flex-col gap-4 justify-center z-30">
                    <h2 className="text-4xl font-black uppercase text-white/90">
                        {event.name}
                    </h2>
                    <div className="text-sm text-muted-foreground tracking-wide">
                        Par{" "}
                        <Link href="#" className="font-semibold text-white/90">
                            RADUAL KONCEPT - GARDEN
                        </Link>
                    </div>
                    <ul className="text-white/55">
                        <li className="flex items-center gap-6">
                            <div>
                                <Calendar />
                            </div>
                            <div className="w-full text-muted-foreground  border-white/10 border-b py-4">
                                <span className="text-orange">
                                    Samedi 11 août
                                </span>{" "}
                                de <b>13:00</b> à <b>20:00</b>
                            </div>
                        </li>
                        <li className="flex items-center gap-6">
                            <div>
                                <House />
                            </div>
                            <div className="w-full text-muted-foreground  border-white/10 border-b py-4">
                                <span className="text-white/90">
                                    Tous ensemble
                                </span>{" "}
                            </div>
                        </li>
                        <li className="flex items-center gap-6">
                            <div>
                                <Pin />
                            </div>
                            <div className="w-full text-muted-foreground py-4">
                                <span className="text-white/90">
                                    Chau. d'Houthem 15, 7780 Comines-Warneton,
                                    Belgique
                                </span>{" "}
                            </div>
                        </li>
                    </ul>
                    <div className="flex md:flex-col gap-4">
                        <Button className="!px-4 !py-3 !h-auto uppercase !font-semibold">
                            Maintenant à 16,50 €
                        </Button>
                        <Button
                            variant="secondary"
                            className="!px-4 !py-3 !h-auto uppercase !font-semibold"
                        >
                            <Heart className="mr-2" size={18} />
                            intéressé(e)
                        </Button>
                    </div>
                    <p className="text-white/90 text-sm">
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
            </section>
            <div className="container !max-w-7xl">
                <Section title="Billets">
                    <TicketList tickets={admissions} />
                </Section>
                <Section title="Description" className="!max-w-xl">
                    <p className="text-muted-foreground tracking-wider">
                        Lorem ipsum dolor sit amet, consectetur adipisicing
                        elit. Quisquam, voluptate. Quisquam, voluptate.
                    </p>
                </Section>
                <Section title="Line up">
                    {artists.map((artist) => (
                        <Link
                            href="#"
                            key={artist.name}
                            className="flex flex-col gap-2 group "
                        >
                            <img
                                src={artist.image}
                                alt={artist.name}
                                className="w-28 h-28 rounded-md opacity-80 hover:opacity-100 transition-all"
                            />
                            <div>
                                <h4 className="text-white/65 transition-colors group-hover:text-white/90 text-xs font-semibold">
                                    {artist.name}
                                </h4>
                            </div>
                        </Link>
                    ))}
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
                                <h4 className="text-white/90 text-md font-semibold">
                                    Karol Dhe
                                </h4>
                                <p className="text-white/55 text-xs">
                                    9 abonnés
                                </p>
                                <p className="text-white/75 text-sm">
                                    1 événement
                                </p>
                            </div>
                            <Button
                                variant="secondary"
                                className="!px-4 !py-3 !h-auto uppercase !font-semibold bg-white text-primary-foreground"
                            >
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
                                <span className="text-white/90 uppercase text-sm font-semibold tracking-wide">
                                    {tag.name}
                                </span>
                            </li>
                        ))}
                    </ul>
                </Section>
                <Section title="Lieu">
                    <ul className="text-white/55 mb-4">
                        <li className="flex items-center gap-6">
                            <div>
                                <House />
                            </div>
                            <div className="w-full text-muted-foreground  border-white/10 border-b py-4">
                                <span className="text-white/90">
                                    Tous ensemble
                                </span>{" "}
                            </div>
                        </li>
                        <li className="flex items-center gap-6">
                            <div>
                                <Pin />
                            </div>
                            <div className="w-full text-muted-foreground py-4">
                                <span className="text-white/90">
                                    Chau. d'Houthem 15, 7780 Comines-Warneton,
                                    Belgique
                                </span>{" "}
                            </div>
                        </li>
                    </ul>
                    <div className="w-full h-[186px] rounded-lg overflow-hidden">
                        <APIProvider
                            apiKey={"AIzaSyCBSL2QY5gvl7EiXFTs-K2R1rQ6qrbEN5E"}
                        >
                            <Map
                                style={{
                                    width: "100%",
                                    height: "186px",
                                    borderRadius: "16px",
                                }}
                                zoom={16}
                                center={{ lat: 0, lng: 0 }}
                                mapId="35f7ad3bd275c6c"
                                disableDefaultUI={true}
                            >
                                <AdvancedMarker
                                    position={{
                                        lat: 0,
                                        lng: 0,
                                    }}
                                >
                                    <Pin />
                                </AdvancedMarker>
                            </Map>
                        </APIProvider>
                    </div>
                </Section>
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
        <section className={cn("!max-w-3xl py-8", className)} {...props}>
            <h3 className="text-white/90 text-2xl font-semibold mb-4">
                {title}
            </h3>
            {children}
        </section>
    );
};

const TicketList = ({ tickets }: { tickets: Admission[] | Extra[] }) => {
    return (
        <div className="grid grid-cols-1 gap-4 mt-6">
            {Object.values(tickets).map((ticket) => (
                <Ticket ticket={ticket} key={ticket.id} />
            ))}
        </div>
    );
};

const Ticket = ({ ticket }: { ticket: Admission | Extra }) => {
    console.log(ticket);
    return (
        <div className="border-white/5 border-2 p-6 rounded-sm flex items-center justify-between">
            <div>
                <h4 className="text-white/90 text-lg font-semibold">
                    {ticket.name}
                </h4>
                <p className="text-white/55 text-sm">{ticket.price} €</p>
            </div>
            <div>
                <Button
                    className={cn(
                        "!px-4 !py-3 !h-auto uppercase !font-semibold"
                    )}
                    disabled={ticket.sold === ticket.quantity}
                    dangerouslySetInnerHTML={{
                        __html:
                            ticket.sold === ticket.quantity
                                ? `&Eacute;puisé`
                                : "Acheter",
                    }}
                />
            </div>
        </div>
    );
};
