import { AdminHeader } from '@/Components/Admin/AdminHeader';
import { Button } from '@/Components/ui/button';
import { DatePickerWithRange } from '@/Components/ui/datepicker';
import { Tabs, TabsList, TabsTrigger } from '@/Components/ui/tabs';
import AuthenticatedLayout from '@/Layouts/Admin/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import { Notifications } from './Partials/Notifications';
import { Overview } from './Partials/Overview';
import { Statistiques } from './Partials/Statistiques';
import { Alert, AlertDescription, AlertTitle } from '@/Components/ui/alert';
import { MessageSquareWarningIcon } from 'lucide-react';

export default function Dashboard() {
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
            <Alert>
                <MessageSquareWarningIcon className="h-6 w-6" />
                <AlertTitle>
                    Complétez votre organisation pour publier votre premier
                    événement
                </AlertTitle>
                <AlertDescription>
                    Nous avons besoin de quelques informations supplémentaires
                    pour que vous puissiez commencer à créer des événements et
                    vendre des billets.
                </AlertDescription>
                <Link
                    href={route('organizations.settings')}
                    className={
                        'underline underline-offset-4 block ml-10 mt-4 whitespace-nowrap text-sm font-medium text-primary/90 hover:text-primary'
                    }
                >
                    Aller aux paramètres de l'organisation
                </Link>
            </Alert>
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
