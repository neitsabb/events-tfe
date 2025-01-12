import { Button } from '@/Components/ui/button';
import { ProfileLayout } from '@/Layouts/Customer/ProfileLayout';
import { PageProps, Transaction } from '@/types';
import { Link, usePage } from '@inertiajs/react';

const View = () => {
    const { orders } = usePage<PageProps<{ orders: Transaction[] }>>().props;

    console.log(orders);

    return (
        <ProfileLayout title="Mes commandes">
            <ul className="space-y-6">
                {orders.map((order) => (
                    <li
                        key={order.id}
                        className="bg-white space-y-4 p-6 border border-dashed"
                    >
                        <div className="flex justify-between">
                            <span className="font-integral">Evenement</span>
                            <span>{order.event.name}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="font-integral">Statut</span>
                            <span>
                                {order.is_completed ? 'Payée' : 'En attente'}
                            </span>
                        </div>
                        <div className="flex justify-between">
                            <span className="font-integral">Total</span>
                            <span className="font-bold">{order.amount}€</span>
                        </div>
                        <Link
                            href={route('customer.me.orders.show', order.id)}
                            className="mt-2 block"
                        >
                            <Button variant="customer_yellow">
                                Voir la commande
                            </Button>
                        </Link>
                    </li>
                ))}
            </ul>
        </ProfileLayout>
    );
};

export default View;
