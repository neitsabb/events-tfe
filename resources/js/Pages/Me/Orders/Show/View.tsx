import { Button } from '@/Components/ui/button';
import { ProfileLayout } from '@/Layouts/Customer/ProfileLayout';
import { usePage } from '@inertiajs/react';
import React from 'react';

const View = () => {
    const { transaction } = usePage().props;

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
                <h3 className="font-integral text-base">Billets</h3>
                <ul className="space-y-2">
                    {transaction.tickets.map((ticket) => (
                        <li
                            key={ticket.id}
                            className="flex items-center justify-between border border-dashed px-4 p-4"
                        >
                            <div>
                                <strong>{ticket.name}</strong> {ticket.price} €
                            </div>
                            <Button variant="customer_yellow">
                                Télécharger
                            </Button>
                        </li>
                    ))}
                </ul>
            </div>
        </ProfileLayout>
    );
};

export default View;
