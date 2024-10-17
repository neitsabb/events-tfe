import { AdminHeader } from '@/Components/Admin/AdminHeader';
import { Button } from '@/Components/ui/button';
import { DatePickerWithRange } from '@/Components/ui/datepicker';
import { Tabs, TabsList, TabsTrigger } from '@/Components/ui/tabs';
import AuthenticatedLayout from '@/Layouts/Admin/AuthenticatedLayout';
import { Head, useForm, usePage } from '@inertiajs/react';
import { Notifications } from './Partials/Notifications';
import { Overview } from './Partials/Overview';
import { Statistiques } from './Partials/Statistiques';
import { Alert, AlertDescription, AlertTitle } from '@/Components/ui/alert';
import { MessageSquareWarningIcon } from 'lucide-react';
import { useState } from 'react';
import { PageProps } from '@/types';

export default function Dashboard() {
    const [isLoading, setIsLoading] = useState(false);

    // useForm pour gérer le formulaire avec Inertia
    const { post } = useForm();

    const handleClick = (e) => {
        e.preventDefault();
        setIsLoading(true);

        // Utilisation de Inertia pour soumettre la requête
        post(route('organizations.stripe.connect'), {
            onFinish: () => setIsLoading(false), // Fin du loading après la requête
            onError: () => setIsLoading(false), // Fin du loading en cas d'erreur
        });
    };

    const { props } = usePage<PageProps>();

    return (
        <AuthenticatedLayout className="space-y-6">
            <Head title="Dashboard" />
            <AdminHeader
                title="Vue d'ensemble"
                actions={
                    <>
                        <DatePickerWithRange />
                        <Button>Télécharger</Button>
                    </>
                }
                className="pb-4"
            />
            {props.auth.organizationLogged.stripe_status !== 'complete' && (
                <Alert>
                    <MessageSquareWarningIcon className="h-6 w-6" />
                    <AlertTitle>
                        Complétez votre organisation pour vendre des billets
                    </AlertTitle>
                    <AlertDescription>
                        Notre fournisseur de services de paiement a besoin des
                        détails de votre organisation pour que vous perceviez
                        vos revenus.
                    </AlertDescription>
                    <Button
                        onClick={handleClick}
                        variant={'ghost'}
                        className={
                            'underline underline-offset-4  ml-7 mt-4 whitespace-nowrap text-sm font-medium text-primary/90 hover:text-primary flex gap-2 disabled:text-accent-foreground disabled:cursor-not-allowed'
                        }
                        disabled={
                            isLoading || !props.permissions.organization.connect
                        }
                    >
                        {isLoading && (
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className={'animate-spin w-4'}
                            >
                                <path d="M21 12a9 9 0 1 1-6.219-8.56" />
                            </svg>
                        )}
                        Compléter mon compte Stripe
                    </Button>
                </Alert>
            )}
            <Tabs defaultValue="overview">
                <TabsList>
                    <TabsTrigger value="overview">Vue d'ensemble</TabsTrigger>
                    <TabsTrigger value="statistiques">Statistiques</TabsTrigger>
                    <TabsTrigger value="notifications">
                        Notifications
                    </TabsTrigger>
                </TabsList>
                <Overview />
                <Statistiques />
                <Notifications />
            </Tabs>
        </AuthenticatedLayout>
    );
}
