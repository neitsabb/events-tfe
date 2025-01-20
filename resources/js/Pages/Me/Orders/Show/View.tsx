import { Button } from '@/Components/ui/button';
import { ProfileLayout } from '@/Layouts/Customer/ProfileLayout';
import { Admission, Extra, PageProps, Transaction } from '@/types';
import { usePage } from '@inertiajs/react';
import { format } from 'date-fns';

type CustomerOrderShowProps = {
    transaction: Transaction & {
        tickets: Admission[] | Extra[];
    };
};
const View = () => {
    const { transaction } = usePage<PageProps<CustomerOrderShowProps>>().props;

    return (
        <ProfileLayout title="Ma commande">
            <ul className="border-b border-dashed pb-4">
                <li>
                    <strong>Événement:</strong> {transaction.event.name}
                </li>
                <li>
                    <strong>Date:</strong>{' '}
                    {format(transaction.event.start_date, 'dd/MM/yyyy')}
                </li>
                <li>
                    <strong>Statut:</strong>{' '}
                    {transaction.is_completed ? 'Payée' : 'En attente'}
                </li>
                <li>
                    <strong>Montant:</strong> {transaction.amount}€
                </li>
            </ul>

            <div className="space-y-2 mt-4">
                <h3 className="font-integral text-base flex items-center justify-between !mb-4">
                    Billets ({transaction.tickets.length})
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
                                    transaction: transaction.id,
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
