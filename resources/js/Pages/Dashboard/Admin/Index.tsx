import AuthenticatedLayout from "@/Layouts/Admin/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { PageProps } from "@/types";
import { Button } from "@/Components/ui/button";
import { DatePickerWithRange } from "@/Components/ui/datepicker";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/Components/ui/tabs";
import { Overview } from "./Partials/Overview";
import { Statistiques } from "./Partials/Statistiques";
import { Notifications } from "./Partials/Notifications";
import { AdminHeader } from "@/Components/Admin/AdminHeader";

export default function Dashboard({ auth }: PageProps) {
    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Dashboard" />
            <AdminHeader
                title="Dashboard"
                actions={
                    <>
                        <DatePickerWithRange />
                        <Button>Télécharger</Button>
                    </>
                }
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
