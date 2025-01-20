import { CustomerContainer } from '@/Components/Customer/CustomerContainer';
import { Button } from '@/Components/ui/button';
import CustomerLayout from '@/Layouts/Customer/CustomerLayout';
import { Event, PageProps } from '@/types';
import { capitalize, compactAddress, isMobileDevice } from '@/utils';
import { Link } from '@inertiajs/react';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { MoveUpRightIcon } from 'lucide-react';

const View = ({ events }: PageProps & { events: Event[] }) => {
    return (
        <CustomerLayout isHome={true} background={false}>
            <section className="z-auto flex items-center bg-primary  w-full h-[632px]">
                <CustomerContainer className="relative z-10 space-y-6">
                    <h1 className="text-4xl md:text-6xl w-full md:w-[75%] font-black text-white">
                        trouve des evenements proche de chez TOI
                    </h1>
                    <Link href={route('dashboard')} className="block">
                        <Button
                            variant="customer_yellow"
                            className="w-full md:w-auto"
                        >
                            Je veux publier un événement
                            <MoveUpRightIcon
                                size={16}
                                strokeWidth={3}
                                className="ml-2"
                            />
                        </Button>
                    </Link>
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
                    <Link
                        href={route('customer.events.index')}
                        className="mx-auto block"
                    >
                        <Button variant="customer_yellow" className="mx-auto">
                            {isMobileDevice()
                                ? 'Voir plus'
                                : "DECOUVRIR PLUS D'EVENEMENTS"}
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

export const EventCard: React.FC<{
    event: Event;
}> = ({ event }) => {
    const formattedStartDate = capitalize(
        format(event.start_date, 'EEEE dd MMM', {
            locale: fr,
        })
    );
    const formattedStartTime = capitalize(
        format(event.start_date, 'HH:mm', { locale: fr })
    );

    const formattedEndDate = capitalize(
        format(event.end_date, 'EEEE dd MMM', { locale: fr })
    );

    return (
        <Link
            key={event.id}
            href={route('customer.events.show', { slug: event.slug })}
        >
            <div className="w-full aspect-video mb-2">
                <img
                    src={`${event.image}`}
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
            <span className="block font-medium">
                {event.price === 'SOLD_OUT' ? 'Epuisé' : `${event.price} €`}
            </span>
        </Link>
    );
};
