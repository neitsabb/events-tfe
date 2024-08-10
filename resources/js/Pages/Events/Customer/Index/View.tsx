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

const View = ({ events }: PageProps & { events: Event[] }) => {
    return (
        <CustomerLayout>
            <header className="pt-8">
                <h1 className="text-3xl font-black uppercase tracking-widest text-white">
                    événements populaires à <Locations />
                </h1>
            </header>
            <EventsList events={events} />
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
                    className="w-fit text-3xl font-black uppercase tracking-wider  bg-transparent text-white/50 ml-4"
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
        <div className="grid grid-cols-2 gap-x-4 gap-y-12 mt-6">
            {events.map((event) => (
                <EventCard key={event.id} event={event} />
            ))}
        </div>
    );
};

const EventCard = ({ event }: { event: Event }) => {
    return (
        <article className="rounded-lg shadow-lg">
            <div className="w-full aspect-video mb-2">
                <img
                    src="https://res.cloudinary.com/shotgun/image/upload/ar_16:9,c_limit,f_auto,fl_lossy,q_auto,w_640/v1722927596/production/artworks/240913_UNFACED_EVENT_FACEBOOK_csgbbw"
                    alt="Événement 1"
                    className="w-full h-full object-cover rounded-lg"
                />
            </div>
            <h2 className="text-lg font-medium text-white/90">
                Unfaced 2 Years W/ And, Cloudy, Alt8, Fin Carroll
            </h2>
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
        </article>
    );
};
