import { AdminHeader } from '@/Components/Admin/AdminHeader';
import { Button } from '@/Components/ui/button';
import { DatePickerWithRange } from '@/Components/ui/datepicker';
import { Tabs, TabsList, TabsTrigger } from '@/Components/ui/tabs';
import AuthenticatedLayout from '@/Layouts/Admin/AuthenticatedLayout';
import { Head, useForm, usePage } from '@inertiajs/react';
import { Notifications } from './Partials/Notifications';
import { Overview } from './Partials/Overview';
import { Statistiques } from './Partials/Statistiques';

import { useState } from 'react';
import { PageProps } from '@/types';

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
