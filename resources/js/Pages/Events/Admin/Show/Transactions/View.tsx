import { DataTable } from '@/Components/Admin/DataTable';

import EventSingleLayout from '@/Layouts/Admin/EventSingleLayout';
import { Event } from '@/types';

import { Head } from '@inertiajs/react';
import { columns } from './columns';

type AdminShowSalesProps = {
    event: Event;
};

const View = ({ event }: AdminShowSalesProps) => {
    return (
        <EventSingleLayout event={event}>
            <Head title={`Transactions`} />

            <DataTable
                title={`Transactions (${event.transactions.length})`}
                data={event.transactions}
                columns={columns}
                hideColumnsButton={true}
                className="mt-6"
            />
        </EventSingleLayout>
    );
};
export default View;
