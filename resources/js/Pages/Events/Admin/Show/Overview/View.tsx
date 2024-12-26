import { Title } from '@/Components/Admin/Title';
import { Avatar, AvatarFallback, AvatarImage } from '@/Components/ui/avatar';
import { Button } from '@/Components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
} from '@/Components/ui/card';
import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from '@/Components/ui/chart';
import EventSingleLayout from '@/Layouts/Admin/EventSingleLayout';
import { EventProps } from '@/types';
import { Link } from '@inertiajs/react';
import { ChevronRightIcon, ImageIcon, RocketIcon } from '@radix-ui/react-icons';
import { Bar, BarChart, CartesianGrid, LabelList, XAxis } from 'recharts';
const stats = [
    {
        title: 'Total des ventes',
        value: '1,200 €',
        percentage: '+ 20% par rapport au mois dernier',
    },
    {
        title: 'Nombre de clients',
        value: '1,200 €',
        percentage: '+ 20% par rapport au mois dernier',
    },
    {
        title: 'Total des billets vendus',
        value: '38',
        percentage: '+ 20% par rapport au mois dernier',
    },
    {
        title: "Nombre d'événements",
        value: '4',
        percentage: 'depuis le début',
    },
];

const sales = [
    {
        id: 1,
        name: 'John Doe',
        avatar: 'https://via.placeholder.com/50',
        tickets: 2,
        date: 'Il y a 2 jours',
    },
    {
        id: 2,
        name: 'John Doe',
        avatar: 'https://via.placeholder.com/50',
        tickets: 1,
        date: 'Il y a 2 jours',
    },
];

const chartData = [
    { month: 'Janvier', value: 186 },
    { month: 'Février', value: 305 },
    { month: 'Mars', value: 237 },
    { month: 'Avril', value: 73 },
    { month: 'Mai', value: 209 },
    { month: 'Juin', value: 214 },
    { month: 'Juillet', value: 186 },
    { month: 'Août', value: 305 },
    { month: 'Septembre', value: 237 },
    { month: 'Octobre', value: 73 },
    { month: 'Novembre', value: 209 },
    { month: 'Décembre', value: 214 },
];
const chartConfig = {
    value: {
        label: 'Revenue',
        color: 'hsl(var(--chart-primary))',
    },
} satisfies ChartConfig;

const View: React.FC<EventProps> = ({ event }) => {
    return (
        <EventSingleLayout event={event}>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 my-4">
                {stats.map((stat, index) => (
                    <Card key={index}>
                        <CardHeader className="flex flex-row items-center justify-between">
                            <Title title={stat.title} level="h4" />
                            <RocketIcon className="w-4 h-4 text-foreground/50" />
                        </CardHeader>
                        <CardContent className="space-y-1">
                            <p className="text-3xl font-semibold">
                                {stat.value}
                            </p>
                            <p className="text-xs text-muted-foreground">
                                {stat.percentage}
                            </p>
                        </CardContent>
                    </Card>
                ))}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card className="col-span-2">
                    <CardHeader>
                        <Title title="Revenues" level="h4" />
                    </CardHeader>
                    <CardContent>
                        <ChartContainer config={chartConfig}>
                            <BarChart
                                accessibilityLayer
                                data={chartData}
                                margin={{
                                    top: 20,
                                }}
                            >
                                <CartesianGrid vertical={false} />
                                <XAxis
                                    dataKey="month"
                                    tickLine={false}
                                    tickMargin={10}
                                    axisLine={false}
                                    tickFormatter={(value) => value.slice(0, 3)}
                                />
                                <ChartTooltip
                                    cursor={false}
                                    content={<ChartTooltipContent hideLabel />}
                                />
                                <Bar
                                    dataKey="value"
                                    fill="var(--color-value)"
                                    radius={8}
                                >
                                    <LabelList
                                        position="top"
                                        offset={12}
                                        className="fill-foreground"
                                        fontSize={12}
                                    />
                                </Bar>
                            </BarChart>
                        </ChartContainer>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <Title title="Ventes récentes" level="h4" />
                        <CardDescription>
                            Vous avez vendu 38 billets ce mois-ci.
                        </CardDescription>
                    </CardHeader>

                    <CardContent>
                        <ul className="space-y-8">
                            {sales.map((sale) => (
                                <li
                                    key={sale.id}
                                    className="group cursor-pointer"
                                >
                                    <Link
                                        href="#"
                                        className="flex items-center justify-between"
                                    >
                                        <div className="flex items-center gap-4">
                                            <Avatar className="w-11 h-11">
                                                <AvatarImage
                                                    src={sale.avatar}
                                                />
                                                <AvatarFallback>
                                                    <ImageIcon className="w-4 h-4" />
                                                </AvatarFallback>
                                            </Avatar>
                                            <div>
                                                <p className="font-medium text-sm truncate">
                                                    {sale.name} a acheté{' '}
                                                    {sale.tickets === 1
                                                        ? 'un'
                                                        : sale.tickets}{' '}
                                                    billet
                                                    {sale.tickets > 1 && 's'}
                                                </p>

                                                <p className="text-xs text-muted-foreground">
                                                    Il y a 2 jours
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
                    </CardContent>
                </Card>
            </div>
        </EventSingleLayout>
    );
};
export default View;
