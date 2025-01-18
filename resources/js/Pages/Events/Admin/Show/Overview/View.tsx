import { Title } from '@/Components/Admin/Title';
import { Avatar, AvatarFallback, AvatarImage } from '@/Components/ui/avatar';
import { Button } from '@/Components/ui/button';
import { Card, CardContent, CardHeader } from '@/Components/ui/card';
import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from '@/Components/ui/chart';
import EventSingleLayout from '@/Layouts/Admin/EventSingleLayout';
import { Event, PageProps, Transaction } from '@/types';
import { capitalize } from '@/utils';
import { Link, usePage } from '@inertiajs/react';
import { ChevronRightIcon, ImageIcon } from '@radix-ui/react-icons';
import {
    differenceInCalendarDays,
    differenceInDays,
    formatDistanceToNow,
} from 'date-fns';
import { fr } from 'date-fns/locale';
import { Bar, BarChart, CartesianGrid, XAxis } from 'recharts';

const chartConfig = {
    value: {
        label: 'Ventes',
        color: 'hsl(var(--chart-primary))',
    },
} satisfies ChartConfig;

type AdminShowOverviewProps = {
    event: Event;
};

const StatCard = ({
    title,
    value,
    percentage,
}: {
    title: string;
    value: string | number;
    percentage?: string;
}) => (
    <Card>
        <CardHeader className="flex flex-row items-center justify-between">
            <Title title={title} level="h4" />
        </CardHeader>
        <CardContent className="space-y-1 flex items-center gap-2">
            <p className="text-3xl font-semibold">{value}</p>
            {percentage && (
                <p className="text-sm text-muted-foreground">{percentage}</p>
            )}
        </CardContent>
    </Card>
);

const RecentSales = ({ transactions }: { transactions: Transaction[] }) => {
    const { event } = usePage<PageProps<AdminShowOverviewProps>>().props;
    return (
        <ul className="space-y-8">
            {transactions.slice(-10).map((sale) => (
                <li key={sale.id} className="group cursor-pointer">
                    <Link
                        href={route('events.transactions.show', {
                            event: event.id,
                            transaction: sale.id,
                        })}
                        className="flex flex-row items-center justify-between"
                    >
                        <div className="flex items-center gap-4">
                            <Avatar className="w-11 h-11 hidden lg:block">
                                <AvatarImage src={sale.userImage} />
                                <AvatarFallback>
                                    <ImageIcon className="w-4 h-4" />
                                </AvatarFallback>
                            </Avatar>
                            <div>
                                <p className="font-medium text-sm truncate">
                                    {capitalize(sale.name)} a acheté{' '}
                                    {sale.tickets_count === 1
                                        ? 'un'
                                        : sale.tickets_count}{' '}
                                    billet{sale.tickets_count > 1 && 's'}
                                </p>
                                <p className="text-xs text-muted-foreground">
                                    {formatDistanceToNow(sale.created_at, {
                                        addSuffix: true,
                                        locale: fr,
                                    })}
                                </p>
                            </div>
                        </div>
                        <Button
                            variant="link"
                            className="text-card-foreground/50 group-hover:translate-x-2 transition-transform"
                        >
                            <ChevronRightIcon className="w-6 h-6" />
                        </Button>
                    </Link>
                </li>
            ))}
        </ul>
    );
};

const View = () => {
    const { event } = usePage<PageProps<AdminShowOverviewProps>>().props;

    console.log(event);
    const totalVentes = event.transactions.reduce(
        (acc, transaction) => acc + transaction.amount,
        0
    );
    const totalCapacity = Object.values(event.tickets.admissions).reduce(
        (acc, ticket) => acc + ticket.quantity,
        0
    );
    const totalTickets = Object.values(event.tickets)
        .flatMap((tickets) => Object.values(tickets))
        .reduce((acc, ticket) => acc + ticket.quantity, 0);

    const stats = [
        {
            title: 'Revenus',
            value: `${totalVentes} €`,
        },
        {
            title: 'Participants',
            value: `${event.tickets.participants}`,
            percentage: `sur ${totalCapacity} (capacité totale)`,
        },
        {
            title: 'Billets vendus',
            value: event.tickets.total_sold,
            percentage: `sur ${totalTickets}`,
        },
        {
            title: 'Jours restants',
            value: differenceInCalendarDays(
                new Date(event.start_date),
                new Date()
            ),
            percentage: `jour${
                differenceInCalendarDays(
                    new Date(event.start_date),
                    new Date()
                ) > 1
                    ? 's'
                    : ''
            } avant l'événement`,
        },
    ];

    const chartData = Object.values(event.tickets)
        .flatMap((category) => Object.values(category))
        .map((ticket) => ({
            ticket: ticket.name,
            value: ticket.sold,
        }));

    return (
        <EventSingleLayout event={event}>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 my-4">
                {stats.map((stat, index) => (
                    <StatCard
                        key={index}
                        title={stat.title}
                        value={stat.value}
                        percentage={stat.percentage}
                    />
                ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
                <Card className="col-span-2">
                    <CardHeader>
                        <Title title="Ventes par billets" level="h4" />
                    </CardHeader>
                    <CardContent>
                        <ChartContainer config={chartConfig}>
                            <BarChart
                                accessibilityLayer
                                data={chartData}
                                margin={{ top: 20 }}
                            >
                                <CartesianGrid vertical={false} />
                                <XAxis
                                    dataKey="ticket"
                                    tickLine={false}
                                    tickMargin={10}
                                    axisLine={false}
                                />
                                <ChartTooltip
                                    cursor={false}
                                    content={<ChartTooltipContent hideLabel />}
                                />
                                <Bar
                                    dataKey="value"
                                    fill="var(--color-value)"
                                    radius={8}
                                    label={{ position: 'top' }}
                                />
                            </BarChart>
                        </ChartContainer>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <Title title="Ventes récentes" level="h4" />
                    </CardHeader>
                    <CardContent>
                        <RecentSales transactions={event.transactions} />
                    </CardContent>
                </Card>
            </div>
        </EventSingleLayout>
    );
};

export default View;
