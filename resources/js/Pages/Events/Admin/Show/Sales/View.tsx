import { DataTable } from "@/Components/Admin/DataTable";
import { Badge } from "@/Components/ui/badge";
import { Button } from "@/Components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from "@/Components/ui/dropdown-menu";
import EventSingleLayout from "@/Layouts/Admin/EventSingleLayout";
import { Event, PageProps } from "@/types";
import { CaretSortIcon, DotsVerticalIcon } from "@radix-ui/react-icons";
import { ColumnDef } from "@tanstack/react-table";

interface Sales {
    name: string;
    reference: string;
    price: number;
    paymentMethod: string;
    date: string;
    tickets: number;
}

export const columns: ColumnDef<Sales>[] = [
    {
        accessorKey: "name",
        meta: "Nom du client",
        header: ({ column }) => {
            return (
                <Button
                    variant="none"
                    onClick={() =>
                        column.toggleSorting(column.getIsSorted() === "asc")
                    }
                >
                    Nom
                    <CaretSortIcon className="ml-2 h-4 w-4" />
                </Button>
            );
        },
        cell: ({ row }) => row.getValue("name"),
    },
    {
        accessorKey: "reference",
        meta: "Référence",
        header: "Référence",
        cell: ({ row }) => {
            const ref = row.getValue("reference") as string;
            return (
                <div className="flex items-center space-x-2">
                    <div>{ref} billets</div>
                </div>
            );
        },
    },
    {
        accessorKey: "tickets",
        meta: "Billets",
        header: "Billets",
        cell: ({ row }) => {
            const tickets = row.getValue("tickets") as string;
            return (
                <span>
                    <b>{tickets}</b> billets achetés
                </span>
            );
        },
    },
    {
        accessorKey: "price",
        meta: "Prix",
        header: "Prix",
        cell: ({ row }) => {
            const price = row.getValue("price") as string;
            return (
                <div className="flex items-center space-x-2">
                    <div>{price} €</div>
                </div>
            );
        },
    },
    {
        accessorKey: "paymentMethod",
        meta: "Méthode de paiement",
        header: "Méthode de paiement",
        cell: ({ row }) => {
            const paymentMethod = row.getValue("paymentMethod") as string;
            return <Badge>{paymentMethod}</Badge>;
        },
    },
    {
        accessorKey: "date",
        meta: "Date",
        header: "Date",
        cell: ({ row }) => {
            const date = row.getValue("date") as string;
            return (
                <div className="flex items-center space-x-2">
                    <div>{date}</div>
                </div>
            );
        },
    },
    {
        id: "actions",
        header: "Actions",
        enableHiding: false,
        cell: ({ row }) => {
            const event = row.original;
            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Ouvrir le menu</span>
                            <DotsVerticalIcon className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem
                            onClick={() => console.log("view detail")}
                        >
                            Voir le détail
                        </DropdownMenuItem>
                        {/* <DropdownMenuSeparator />
											<DropdownMenuItem>View customer</DropdownMenuItem>
											<DropdownMenuItem>
													View payment details
											</DropdownMenuItem> */}
                    </DropdownMenuContent>
                </DropdownMenu>
            );
        },
    },
];

const data: Sales[] = [
    {
        name: "John Doe",
        reference: "REF-123",
        tickets: 2,
        price: 100,
        paymentMethod: "Paypal",
        date: "2021-12-12",
    },
];

const View = ({
    auth,
    event,
}: PageProps & {
    event: Event;
}) => {
    return (
        <EventSingleLayout auth={auth} event={event}>
            <DataTable
                title={`Ventes (${data.length})`}
                data={data}
                columns={columns}
                hideColumnsButton={true}
            />
        </EventSingleLayout>
    );
};
export default View;
