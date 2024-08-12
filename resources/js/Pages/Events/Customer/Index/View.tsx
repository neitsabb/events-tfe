import CustomerLayout from "@/Layouts/Customer/CustomerLayout";
import { Button } from "@/Components/ui/button";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/Components/ui/command";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/Components/ui/popover";
import { cn } from "@/utils";
import { useState } from "react";
import { CheckIcon, ChevronDownIcon } from "@radix-ui/react-icons";
import { Badge } from "@/Components/ui/badge";
import { Event, PageProps } from "@/types";
import { Building } from "lucide-react";
import { Link } from "@inertiajs/react";

const cities = [
    // Cities in belgium
    {
        label: "Anvers",
        value: "antwerp",
    },
    {
        label: "Bruxelles",
        value: "brussels",
    },
    {
        label: "Gand",
        value: "ghent",
    },
    {
        label: "Louvain",
        value: "leuven",
    },
    {
        label: "Liège",
        value: "liege",
    },
    {
        label: "Mechelen",
        value: "mechelen",
    },
    {
        label: "Namur",
        value: "namur",
    },
    {
        label: "Ostende",
        value: "ostend",
    },
    {
        label: "Ypres",
        value: "ypres",
    },
    {
        label: "Mons",
        value: "mons",
    },
    {
        label: "Charleroi",
        value: "charleroi",
    },
    {
        label: "Tournai",
        value: "tournai",
    },
];

const festivals = [
    {
        image: "https://res.cloudinary.com/shotgun/image/upload/ar_2:3,c_limit,f_auto,fl_lossy,q_auto,w_480/v1702033187/production/artworks/RES_2024_Billetterie_Shotgun_720x1080_ldntxi",
        title: "Rock En Seine 2024",
        location: "Saint-Cloud, France",
        start_date: "mer 21",
        end_date: "dim 25 août",
    },
    {
        image: "https://res.cloudinary.com/shotgun/image/upload/ar_2:3,c_limit,f_auto,fl_lossy,q_auto,w_480/v1717594842/production/artworks/RDRE24-BILLETTERIE-artistes_hisrt6",
        title: "Rock En Seine 2024",
        location: "Saint-Cloud, France",
        start_date: "mer 21",
        end_date: "dim 25 août",
    },
    {
        image: "https://res.cloudinary.com/shotgun/image/upload/ar_2:3,c_limit,f_auto,fl_lossy,q_auto,w_480/v1706883275/production/artworks/shotgun-2024-2000x3000_-_rubrique_festival_hog5dp",
        title: "Rock En Seine 2024",
        location: "Saint-Cloud, France",
        start_date: "mer 21",
        end_date: "dim 25 août",
    },
    {
        image: "https://res.cloudinary.com/shotgun/image/upload/ar_2:3,c_limit,f_auto,fl_lossy,q_auto,w_480/v1723046821/production/artworks/maMARTEN_LOU_BANNER_2000x3000_1_e81ptj",
        title: "Rock En Seine 2024",
        location: "Saint-Cloud, France",
        start_date: "mer 21",
        end_date: "dim 25 août",
    },
];

const View = ({ events }: PageProps & { events: Event[] }) => {
    return (
        <CustomerLayout>
            <div className="!bg-[#222121] overflow-hidden">
                <div className="container !max-w-7xl">
                    <header className="pt-8">
                        <h2 className="text-3xl font-black uppercase tracking-widest text-white">
                            événements populaires à <Locations />
                        </h2>
                    </header>
                    <EventsList events={events} />

                    <h2 className="text-2xl font-black uppercase tracking-widest text-white">
                        Villes proches
                    </h2>

                    <div className="pb-12">
                        <div className="flex grid-cols-2 gap-x-4 gap-y-12 mt-6">
                            {Array.from({ length: 4 }).map((_, i) => (
                                <div className="bg-accent hover:bg-accent/50 rounded-lg p-4 w-full aspect-video flex flex-col justify-center items-center text-white/90">
                                    <Building />
                                    <h3 className="text-lg font-semibold">
                                        Anvers
                                    </h3>
                                    <p className="text-sm text-white/60">
                                        15 événements
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            <div className=" py-6 bg-[rgba(255,251,238,1.00)]">
                <div className="container !max-w-7xl">
                    <header className="py-16 flex items-end gap-16">
                        <h2 className="text-[48px] leading-none w-[180px] break-words font-black uppercase tracking-widest ">
                            FESTIVALS 2024
                        </h2>
                        <p className="max-w-[400px]">
                            Envie de scénographies immersives, de corps bronzés,
                            d’outfits incroyables, d’artistes talentueux et de
                            musique hors du commun ? Choisis ton ambiance pour
                            la saison des Festivals !
                        </p>
                    </header>
                    <div className="grid grid-cols-4 gap-6">
                        {festivals.map((festival) => (
                            <div>
                                <div className="aspect-[2 / 3] pb-2 h-[480px]">
                                    <img
                                        className="w-full !h-full object-cover"
                                        src={festival.image}
                                    />
                                </div>
                                <h2 className="text-md font-medium ">
                                    {festival.title}
                                </h2>
                                <span className="text-sm text-muted-foreground">
                                    {festival.location}
                                </span>
                                <div className="text-sm flex items-center gap-4 text-semibold">
                                    <p className="flex items-center gap-1">
                                        <span className="text-orange">
                                            {festival.start_date} -{" "}
                                            {festival.end_date}
                                        </span>
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </CustomerLayout>
    );
};

export default View;

const Locations = () => {
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState("");

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant={"none"}
                    role="combobox"
                    aria-expanded={open}
                    className="w-fit text-3xl font-black uppercase tracking-wider bg-transparent text-white/50 hover:text-white ml-4"
                >
                    {value ? (
                        cities.find((city) => city.value === value)?.label
                    ) : (
                        <div className="flex items-center gap-2">
                            BRUXELLES <ChevronDownIcon />
                        </div>
                    )}
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-fit p-0 dark border-border">
                <Command>
                    <CommandInput placeholder="Chercher une ville..." />
                    <CommandList className="no-scrollbar">
                        <CommandEmpty>Pas de ville trouvée.</CommandEmpty>
                        <CommandGroup>
                            {cities.map((city) => (
                                <CommandItem
                                    key={city.value}
                                    value={city.value}
                                    onSelect={(currentValue) => {
                                        setValue(
                                            currentValue === value
                                                ? ""
                                                : currentValue
                                        );
                                        setOpen(false);
                                    }}
                                >
                                    <CheckIcon
                                        className={cn(
                                            "mr-2 h-4 w-4",
                                            value === city.value
                                                ? "opacity-100"
                                                : "opacity-0"
                                        )}
                                    />
                                    {city.label}
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    );
};

const EventsList = ({ events }: { events: Event[] }) => {
    return (
        <>
            <div className="grid grid-cols-2 gap-x-4 gap-y-12 mt-6">
                {events.map((event) => (
                    <EventCard key={event.id} event={event} />
                ))}
            </div>
            <div className="flex justify-center my-20">
                <Button variant={"customer"}>
                    Voir les événements à bruxelles
                </Button>
            </div>
        </>
    );
};

const EventCard = ({ event }: { event: Event }) => {
    return (
        <Link
            key={event.id}
            href={route("customer.events.show", { slug: event.slug })}
        >
            <div className="w-full aspect-video mb-2">
                <img
                    src={event.image}
                    alt={event.name}
                    className="w-full h-full object-cover rounded-lg"
                />
            </div>
            <h2 className="text-lg font-medium text-white/90">{event.name}</h2>
            <span className="text-sm text-white/60">Mirano Bruxelles</span>
            <div className="flex items-center gap-4 text-semibold">
                <p className="flex items-center gap-1 text-white/40">
                    <span className="text-orange">Ven 13 sept.</span>|
                    <span className="text-orange">23:00</span>
                </p>
                <span className="text-white font-semibold">15,99 €</span>
            </div>
            <div className="flex items-center gap-1 mt-2">
                <Badge variant="genreTag">techno</Badge>
                <Badge variant="genreTag">hard techno</Badge>
                <Badge variant="genreTag">hard trance</Badge>
            </div>
        </Link>
    );
};
