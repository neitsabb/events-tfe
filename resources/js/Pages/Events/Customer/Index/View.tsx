import { CustomerContainer } from '@/Components/Customer/CustomerContainer';
import { Button } from '@/Components/ui/button';
import CustomerLayout from '@/Layouts/Customer/CustomerLayout';
import { EventCard } from '@/Pages/Welcome/View';
import { EventsProps } from '@/types';
import { Building, MoveUpRightIcon } from 'lucide-react';

const cites = [
    {
        name: 'ANVERS',
        events: 12,
    },
    {
        name: 'BRUGES',
        events: 8,
    },
    {
        name: 'GAND',
        events: 6,
    },
    {
        name: 'LIEGE',
        events: 4,
    },
    {
        name: 'NAMUR',
        events: 3,
    },
];
const View = ({ events }: EventsProps) => {
    return (
        <CustomerLayout>
            <section className="z-auto  w-full">
                <CustomerContainer className="relative z-10 mb-32">
                    <header className="space-y-6 py-16">
                        <h2 className="text-6xl font-bold">
                            eVENEMENTS A{' '}
                            <span className="text-primary">BRUXELLES</span>
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
                    <Section
                        title={
                            <h2 className="font-bold text-2xl">
                                MARDI 31 DEC.
                            </h2>
                        }
                    >
                        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                            {events.map((event) => (
                                <EventCard event={event} key={event.id} />
                            ))}
                        </div>
                    </Section>
                    <Section
                        title={
                            <h2 className="font-bold text-4xl">
                                VILLES PROCHE DE BRUXELLES
                            </h2>
                        }
                    >
                        <div className="grid grid-cols-5 !my-16">
                            {cites.map((city, id) => (
                                <div
                                    key={id}
                                    className="p-6 text-primary flex flex-col gap-1 justify-center items-center [&:not(:first-child)]:border-l border-dashed border-primary"
                                >
                                    <Building strokeWidth={2} size={24} />
                                    <h3 className="text-xl font-bold">
                                        {city.name}
                                    </h3>
                                    <p className="font-mono lowercase text-sm">
                                        {city.events} EVENEMENTS
                                    </p>
                                </div>
                            ))}
                        </div>
                    </Section>
                </CustomerContainer>
            </section>
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
        <section className="space-y-6 mb-16">
            {title}
            {children}
        </section>
    );
};
