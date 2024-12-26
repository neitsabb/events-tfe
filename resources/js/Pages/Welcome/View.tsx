import { CustomerContainer } from '@/Components/Customer/CustomerContainer';
import { Button } from '@/Components/ui/button';
import CustomerLayout from '@/Layouts/Customer/CustomerLayout';
import { Event, EventProps, PageProps } from '@/types';
import { Link } from '@inertiajs/react';
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
            <span className="text-sm font-mono uppercase font-medium">
                Mirano Bruxelles
            </span>
            <div className="flex items-center gap-4 text-semibold font-mono font-semibold">
                <p className="flex items-center gap-1">
                    <span className="text-secondary">Ven 13 sept.</span>|
                    <span className="text-secondary">23:00</span>
                </p>
                <span className="font-semibold">15,99 €</span>
            </div>
        </Link>
    );
};
