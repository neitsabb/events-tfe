import { AdminHeader } from '@/Components/Admin/AdminHeader';
import { Button } from '@/Components/ui/button';
import { DatePickerWithRange } from '@/Components/ui/datepicker';
import { Tabs, TabsList, TabsTrigger } from '@/Components/ui/tabs';
import AuthenticatedLayout from '@/Layouts/Admin/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { Notifications } from './Partials/Notifications';
import { Overview } from './Partials/Overview';
import { Statistiques } from './Partials/Statistiques';

export default function Dashboard() {
  return (
    <AuthenticatedLayout>
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
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
        </TabsList>
        <Overview />
        <Statistiques />
        <Notifications />
      </Tabs>
    </AuthenticatedLayout>
  );
}
