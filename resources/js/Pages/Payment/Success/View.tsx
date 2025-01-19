import { Button } from '@/Components/ui/button';
import { Link, usePage } from '@inertiajs/react';
import React from 'react';

const View = () => {
    const { transaction } = usePage().props;

    return (
        <div className="customer-theme bg-primary text-primary-foreground h-screen flex items-center justify-center font-mono overflow-hidden relative">
            <img
                src="/images/header-bg.png"
                alt="header"
                className="absolute top-0 right-0 -z-0"
            />
            <div className="max-w-xl mx-auto py-10 space-y-6 z-50">
                <div>
                    <h1 className="text-2xl font-integral">
                        Paiement réussi !
                    </h1>
                    <p className="mt-2 block">
                        Votre paiement a été effectué avec succès. Vous pouvez
                        consulter les détails de votre transaction ci-dessous.
                    </p>
                </div>
                <Link
                    href={route('customer.me.orders.show', {
                        id: transaction,
                    })}
                    className="block"
                >
                    <Button variant="customer_yellow">Voir ma commande</Button>
                </Link>
            </div>
            <img
                src="/images/footer-bg.png"
                alt="header"
                className="absolute bottom-0 -left-48 -z-0 rotate-90"
            />
        </div>
    );
};

export default View;
