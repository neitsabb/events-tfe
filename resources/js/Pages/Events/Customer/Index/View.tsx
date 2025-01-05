import { CustomerContainer } from '@/Components/Customer/CustomerContainer';
import { Button } from '@/Components/ui/button';
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from '@/Components/ui/command';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/Components/ui/popover';

import CustomerLayout from '@/Layouts/Customer/CustomerLayout';
import { EventCard } from '@/Pages/Welcome/View';
import { Event, PageProps } from '@/types';
import { Link, router, usePage } from '@inertiajs/react';
import { Building, ChevronsUpDown, MoveUpRightIcon } from 'lucide-react';
import { useEffect, useState } from 'react';

type EventsByDate = {
    [key: string]: Event[];
};

type City = string;

const View = () => {
    const { events, cities, nearestCities, selectedCity } = usePage<
        PageProps<{
            events: EventsByDate;
            cities: City[];
            nearestCities: { city: string; distance: number }[];
            selectedCity: string;
        }>
    >().props;

    const [locationSent, setLocationSent] = useState(false);

    console.log(locationSent);
    useEffect(() => {
        if (!locationSent && navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;

                    router.get(
                        route('customer.events.index'),
                        { latitude, longitude },
                        {
                            preserveScroll: true,
                            preserveState: true,
                            onFinish: () => {
                                setLocationSent(true); // Succès : géolocalisation obtenue
                            },
                        }
                    );
                },
                (error) => {
                    console.error('Erreur de géolocalisation', error);
                    setLocationSent(true); // Erreur : passez quand même à l'état chargé
                }
            );
        } else {
            setLocationSent(true); // Géolocalisation non disponible
        }
    }, [locationSent]);

    return (
        <CustomerLayout>
            <div className="z-auto w-full">
                <CustomerContainer className="relative z-10 mb-32">
                    <header className="space-y-6 pt-16 pb-16">
                        <h2 className="text-6xl font-bold flex items-center gap-4">
                            EVENEMENTS À{' '}
                            {!locationSent ? (
                                <span className="animate-pulse bg-gray-200/50 h-14 w-80 "></span>
                            ) : (
                                <CityPicker
                                    cities={cities}
                                    defaultCity={selectedCity}
                                />
                            )}
                        </h2>
                        <Button variant="customer_blue">
                            PUBLIER MON EVENEMENT
                            <MoveUpRightIcon
                                size={16}
                                strokeWidth={3}
                                className="ml-2"
                            />
                        </Button>
                    </header>

                    {!locationSent ? (
                        // Affichage du Skeleton Loader pendant le chargement de la localisation
                        <SkeletonLoader />
                    ) : Object.entries(events).length > 0 ? (
                        Object.entries(events).map(([date, eventList], id) => (
                            <Section
                                key={id}
                                title={
                                    <h2 className="font-bold text-2xl">
                                        {date}
                                    </h2>
                                }
                            >
                                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                                    {eventList.map((event: Event) => (
                                        <EventCard
                                            event={event}
                                            key={event.id}
                                        />
                                    ))}
                                </div>
                            </Section>
                        ))
                    ) : (
                        'Aucun événement trouvé'
                    )}

                    <Section
                        title={
                            <h2 className="font-bold text-4xl !mt-16">
                                VILLES PROCHE DE {selectedCity.toUpperCase()}
                            </h2>
                        }
                    >
                        <div className="grid grid-cols-5 !my-16">
                            {nearestCities
                                .filter((c) => c.city !== selectedCity)
                                .map((city, id) => (
                                    <Link
                                        href={route('customer.events.index', {
                                            city: city.city,
                                        })}
                                        preserveState={true}
                                        key={id}
                                        className="p-6 text-primary flex flex-col gap-1 justify-center items-center [&:not(:first-child)]:border-l border-dashed border-primary"
                                    >
                                        <Building strokeWidth={2} size={24} />
                                        <h3 className="text-xl font-bold">
                                            {city.city}
                                        </h3>
                                        <p className="font-mono lowercase text-sm">
                                            {city.distance.toFixed(0)} km
                                        </p>
                                    </Link>
                                ))}
                        </div>
                    </Section>
                </CustomerContainer>
            </div>
        </CustomerLayout>
    );
};

export default View;

const Section = ({
    title,
    children,
}: {
    title: React.ReactNode;
    children: React.ReactNode;
}) => {
    return (
        <section className="space-y-6 mb-8">
            {title}
            {children}
        </section>
    );
};

const CityPicker = ({
    cities,
    defaultCity,
}: {
    cities: City[];
    defaultCity: string;
}) => {
    const [selectedCity, setSelectedCity] = useState(defaultCity);
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        setSelectedCity(defaultCity);
    }, [defaultCity]);

    const handleCitySelect = (city: string) => {
        setSelectedCity(city);
        setIsOpen(false);

        router.get(
            route('customer.events.index'),
            { city },
            {
                preserveScroll: true,
                preserveState: true,
            }
        );
    };

    return (
        <Popover open={isOpen} onOpenChange={setIsOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="none"
                    className="flex items-center justify-between gap-2"
                >
                    <span className="text-6xl font-bold text-primary">
                        {selectedCity}
                    </span>
                    <ChevronsUpDown className="opacity-50 mt-4" />
                </Button>
            </PopoverTrigger>
            <PopoverContent
                className="p-0 shadow-none rounded-none"
                side={'bottom'}
                sideOffset={20}
            >
                <Command className="border-2 rounded-none">
                    <CommandInput
                        placeholder="Rechercher une ville ..."
                        className="h-9 rounded-none font-mono"
                    />
                    <CommandList className="border-t-2">
                        <CommandEmpty>No framework found.</CommandEmpty>
                        <CommandGroup className="font-integral">
                            {cities.map((city) => (
                                <CommandItem
                                    key={city}
                                    value={city}
                                    onSelect={() => handleCitySelect(city)}
                                >
                                    {city}
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    );
};

const SkeletonLoader = () => {
    return (
        <>
            <span className="animate-pulse bg-gray-200/50 h-8 mb-6 w-48 block"></span>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                {[...Array(6)].map((_, index) => (
                    <div
                        key={index}
                        className="bg-gray-200/50 animate-pulse h-56"
                    ></div>
                ))}
            </div>
        </>
    );
};
