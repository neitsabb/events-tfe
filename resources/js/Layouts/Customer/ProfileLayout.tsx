import React from 'react';
import { CustomerContainer } from '@/Components/Customer/CustomerContainer';
import { Button } from '@/Components/ui/button';
import CustomerLayout from '@/Layouts/Customer/CustomerLayout';
import { Link } from '@inertiajs/react';
import { MoveUpRightIcon } from 'lucide-react';

const aside = [
    {
        name: 'Mes informations',
        href: '/me',
    },
    {
        name: 'Mes commandes',
        href: '/me/orders',
    },
    {
        name: 'Mes adresses',
        href: '/me/addresses',
    },
    {
        name: 'Mes avis',
        href: '/me/reviews',
    },
];

export const ProfileLayout = ({
    title,
    children,
}: {
    title: string;
    children: React.ReactNode;
}) => {
    return (
        <CustomerLayout>
            <CustomerContainer>
                <header className="space-y-6 py-12">
                    <h2 className="text-6xl font-bold">Mon profil</h2>
                    <Link href="/dashboard" className="block">
                        <Button variant="customer_blue">
                            Je suis un organisateur
                            <MoveUpRightIcon
                                size={16}
                                strokeWidth={3}
                                className="ml-2"
                            />
                        </Button>
                    </Link>
                </header>
                <div className="flex mb-16 gap-16 ">
                    <aside className="w-64 shrink-0 border-r border-dashed">
                        <nav>
                            <ul className="space-y-6 divide-y divide-dashed ">
                                {aside.map((item, index) => (
                                    <li key={index}>
                                        <Link
                                            href={item.href}
                                            className="flex first-child:pt-0 pt-6 items-center space-x-2 text-gray-700 hover:text-primary"
                                        >
                                            <span>{item.name}</span>
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </nav>
                    </aside>
                    <main className="font-mono w-full">
                        <h3 className="text-2xl mb-8 font-integral">{title}</h3>
                        {children}
                    </main>
                </div>
            </CustomerContainer>
        </CustomerLayout>
    );
};
