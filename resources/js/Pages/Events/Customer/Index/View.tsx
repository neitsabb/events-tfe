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
import { Event } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { Building, ChevronsUpDown, MoveUpRightIcon } from 'lucide-react';
import { useEffect, useState } from 'react';

type EventsByDate = {
    [key: string]: Event[];
};

type City = string;

const View = () => {
    const [events, setEvents] = useState<EventsByDate>([]);
    const [cities, setCities] = useState<City[]>([]);
    const [nearestCities, setNearestCities] = useState<
        { city: string; event_count: number }[]
    >([]);
    const [selectedCity, setSelectedCity] = useState<string>('');
    const [locationSent, setLocationSent] = useState(false);

    const getQueryParam = (key: string): string | null => {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get(key);
    };

    useEffect(() => {
        const cityFromUrl = getQueryParam('city');

        if (cityFromUrl) {
            fetch(`${route('api.events.index')}?city=${cityFromUrl}`)
                .then((response) => response.json())
                .then((data) => {
                    setSelectedCity(cityFromUrl);
                    setEvents(data.events);
                    setCities(data.cities);
                    setNearestCities(data.nearestCities);
                    setLocationSent(true);
                })
                .catch((error) =>
                    console.error(
                        'Erreur lors de la récupération des événements',
                        error
                    )
                );
        } else if (!locationSent && navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    // Mettre à jour l'URL avec les coordonnées
                    const newUrl = new URL(window.location.href);
                    newUrl.searchParams.set('latitude', latitude.toString());
                    newUrl.searchParams.set('longitude', longitude.toString());
                    window.history.pushState({}, '', newUrl.toString());
                    fetch(
                        `${route(
                            'api.events.index'
                        )}?latitude=${latitude}&longitude=${longitude}`
                    )
                        .then((response) => response.json())
                        .then((data) => {
                            setLocationSent(true);
                            setEvents(data.events);
                            setCities(data.cities);
                            setNearestCities(data.nearestCities);
                            setSelectedCity(data.selectedCity);
                        });
                },
                (error) => {
                    console.error('Erreur de géolocalisation', error);
                    setLocationSent(true);
                }
            );
        } else {
            setLocationSent(true);
        }
    }, [locationSent]);

    const handleCityChange = (city: string) => {
        setLocationSent(false);

        const newUrl = new URL(window.location.href);
        newUrl.searchParams.set('city', city);
        window.history.pushState({}, '', newUrl.toString());

        fetch(`${route('api.events.index')}?city=${city}`)
            .then((response) => response.json())
            .then((data) => {
                setSelectedCity(city);
                setEvents(data.events);
                setNearestCities(data.nearestCities);
                setLocationSent(true);
            })
            .catch((error) =>
                console.error(
                    'Erreur lors de la récupération des événements',
                    error
                )
            );
    };

    return (
        <CustomerLayout>
            <Head title="Événements" />
            <div className="z-auto w-full">
                <CustomerContainer className="relative z-10 mb-32">
                    <header className="space-y-6 pt-16 pb-16">
                        <h2 className="text-3xl md:text-6xl font-bold flex flex-col md:flex-row md:items-center md:gap-4">
                            EVENEMENTS À{' '}
                            {!locationSent ? (
                                <span className="animate-pulse bg-gray-200/50 h-9 w-48 md:h-14 md:w-80 "></span>
                            ) : (
                                <CityPicker
                                    cities={cities}
                                    defaultCity={selectedCity}
                                    onCityChange={handleCityChange} // Gérer le changement de ville
                                />
                            )}
                        </h2>
                        <Link href={route('dashboard')} className="block">
                            <Button variant="customer_blue">
                                PUBLIER MON EVENEMENT
                                <MoveUpRightIcon
                                    size={16}
                                    strokeWidth={3}
                                    className="ml-2"
                                />
                            </Button>
                        </Link>
                    </header>

                    {!locationSent ? (
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
                        <div className="grid grid-cols-1 md:grid-cols-5 !my-16">
                            {nearestCities
                                .filter((c) => c.city !== selectedCity)
                                .map((city, id) => (
                                    <Link
                                        href={`${route(
                                            'customer.events.index'
                                        )}?city=${city.city}`}
                                        key={id}
                                        className="p-6 text-primary flex flex-col gap-1 justify-center items-center border [&:not(:last-child)]:border-b-0 md:[&:not(:first-child)]:border-l md:border-b-0 md:border-t-0 md:border-0 border-dashed border-primary"
                                    >
                                        <Building strokeWidth={2} size={24} />
                                        <h3 className="text-xl font-bold">
                                            {city.city}
                                        </h3>
                                        <p className="font-mono lowercase text-sm">
                                            {city.event_count} événements
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
    onCityChange,
}: {
    cities: City[];
    defaultCity: string;
    onCityChange: (city: string) => void;
}) => {
    const [selectedCity, setSelectedCity] = useState(defaultCity);
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        setSelectedCity(defaultCity);
    }, [defaultCity]);

    const handleCitySelect = (city: string) => {
        setSelectedCity(city);
        setIsOpen(false);
        onCityChange(city);
    };

    return (
        <Popover open={isOpen} onOpenChange={setIsOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="none"
                    className="flex items-center justify-start md:justify-between gap-2"
                >
                    <span className="text-4xl md:text-6xl font-bold text-primary">
                        {selectedCity}
                    </span>
                    <ChevronsUpDown className="opacity-50 pt-2 md:mt-4" />
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
                        <CommandEmpty>No city found.</CommandEmpty>
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
