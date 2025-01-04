import { CustomerContainer } from '@/Components/Customer/CustomerContainer';
import { Button } from '@/Components/ui/button';
import CustomerLayout from '@/Layouts/Customer/CustomerLayout';
import { Event, PageProps } from '@/types';
import { capitalize, compactAddress } from '@/utils';
import { Link } from '@inertiajs/react';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { MoveUpRightIcon } from 'lucide-react';

const View = ({ events }: PageProps & { events: Event[] }) => {
    return (
        <CustomerLayout isHome={true} background={false}>
            <section className="z-auto flex items-center bg-primary  w-full h-[632px]">
                <CustomerContainer className="relative z-10 space-y-6">
                    <h1 className="text-6xl font-black text-white">
                        trouve des evenements proche de chez TOI
                    </h1>
                    <Button variant="customer_yellow">
                        Je suis un organisateur
                        <MoveUpRightIcon
                            size={16}
                            strokeWidth={3}
                            className="ml-2"
                        />
                    </Button>
                </CustomerContainer>
                <img
                    src="/images/hero-bg.png"
                    alt="hero"
                    className="absolute top-0 right-0 h-[632px] object-cover -z-0"
                />
            </section>
            <section className="py-16">
                <CustomerContainer className="flex flex-col">
                    <h2 className="font-bold text-2xl">Evenements</h2>
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 my-10">
                        {events.map((event) => (
                            <EventCard event={event} key={event.id} />
                        ))}
                    </div>
                    <Link href={route('customer.events.index')}>
                        <Button variant="customer_yellow" className="mx-auto">
                            DECOUVRIR PLUS D'EVENEMENTS
                            <MoveUpRightIcon
                                size={16}
                                strokeWidth={3}
                                className="ml-2"
                            />
                        </Button>
                    </Link>
                </CustomerContainer>
            </section>
        </CustomerLayout>
    );
};

export default View;

export const EventCard: React.FC<EventProps> = ({ event }) => {
    const startDate = new Date(event.start_date);
    const endDate = new Date(event.end_date);

    const formattedStartDate = capitalize(
        format(startDate, 'EEEE dd MMM', {
            locale: fr,
        })
    );
    const formattedStartTime = capitalize(
        format(startDate, 'HH:mm', { locale: fr })
    );

    const formattedEndDate = capitalize(
        format(endDate, 'EEEE dd MMM', { locale: fr })
    );

    console.log(event);
    return (
        <Link
            key={event.id}
            href={route('customer.events.show', { slug: event.slug })}
        >
            <div className="w-full aspect-video mb-2">
                <img
                    src={event.image}
                    alt={event.name}
                    className="w-full h-full object-cover"
                />
            </div>
            <h2 className="text-lg font-medium truncate">{event.name}</h2>
            <span className="block text-sm font-mono uppercase font-medium truncate">
                {compactAddress({
                    street: event.location.street,
                    city: event.location.city,
                    zip_code: event.location.zip_code,
                    country: event.location.country,
                })}
            </span>
            <div className="flex items-center gap-4 text-semibold font-mono font-semibold text-sm mb-2 text-black/50">
                {event.start_date && event.end_date ? (
                    <p className="flex flex-row gap-2">
                        <span className="">{formattedStartDate}</span>-
                        <span className="">{formattedEndDate}</span>
                    </p>
                ) : (
                    <p className="text-secondary">
                        {formattedStartDate} | {formattedStartTime}
                    </p>
                )}
            </div>
            <span className="block font-medium">{event.price} €</span>
        </Link>
    );
};
