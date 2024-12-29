import { Button } from '@/Components/ui/button';
import { ProfileLayout } from '@/Layouts/Customer/ProfileLayout';
import { PageProps, Transaction } from '@/types';
import { usePage } from '@inertiajs/react';

type CustomerOrderShowProps = {
    transaction: Transaction;
};
const View = () => {
    const { transaction } = usePage<PageProps<CustomerOrderShowProps>>().props;

    console.log(transaction);
    return (
        <ProfileLayout title="Ma commande">
            <ul className="border-b border-dashed pb-4">
                <li>
                    <strong>Transaction ID:</strong> {transaction.id}
                </li>
                <li>
                    <strong>Montant:</strong> {transaction.amount}
                </li>
            </ul>

            <div className="space-y-2 mt-4">
                <h3 className="font-integral text-base flex items-center justify-between !mb-4">
                    Tickets
                    <Button
                        variant="customer_primary"
                        className="!px-0 !py-0 bg-transparent text-primary underline underline-offset-4 underline-primary decoration-2"
                    >
                        télécharger tous les billets
                    </Button>
                </h3>
                <ul className="space-y-2">
                    {transaction.tickets.map((ticket) => (
                        <li
                            key={ticket.id}
                            className="flex items-center justify-between border border-dashed px-4 p-4"
                        >
                            <div>
                                <strong>{ticket.name}</strong> {ticket.price} €
                            </div>

                            <a
                                href={route('customer.tickets.download', {
                                    ticketId: ticket.pivot.id,
                                    transactionId: transaction.id,
                                })}
                                target="_blank"
                                rel="noreferrer"
                            >
                                <Button variant="customer_yellow">
                                    Télécharger
                                </Button>
                            </a>
                        </li>
                    ))}
                </ul>
            </div>
        </ProfileLayout>
    );
};

export default View;
