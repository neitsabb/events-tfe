import React, { useEffect, useRef, useState } from "react";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "../ui/select";
import { Organization } from "@/types";
import { Link, useForm } from "@inertiajs/react";
import { Button, buttonVariants } from "../ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "../ui/dialog";
import { cn } from "@/utils";
import { Separator } from "../ui/separator";

export const OrganizationSwitcher = ({
    organizations,
    organizationLogged,
}: {
    organizations: Organization[];
    organizationLogged: Organization;
}) => {
    const isHandle = useRef(false);
    // Initialize state with the ID of the first organization
    const [selectedOrganizationId, setSelectedOrganizationId] =
        React.useState<number>(organizationLogged?.id || organizations[0]?.id);

    // useForm hook setup
    const { data, setData, post, errors } = useForm({
        organizationId: selectedOrganizationId,
    });

    useEffect(() => {
        if (!isHandle.current) return;
        post(route("organizations.switch"), {
            onSuccess: () => {
                console.log("success");
            },
        });
    }, [data]);

    const handleSelect = (id: string) => {
        const selectedId = parseInt(id, 10); // Convert string to number
        setSelectedOrganizationId(selectedId);
        setData("organizationId", selectedId);
        isHandle.current = true;
    };

    // Find the selected organization by ID
    const selectedOrganization = organizations.find(
        (org) => org.id === selectedOrganizationId
    );

    const [open, setOpen] = useState(false);

    return (
        <>
            <Select
                value={selectedOrganizationId?.toString()}
                onValueChange={handleSelect}
                open={open}
                onOpenChange={setOpen}
            >
                <SelectTrigger className="w-48 flex items-center gap-2 [&>span]:flex [&>span]:w-full  [&>span]:truncate [&>span]:gap-1">
                    <SelectValue>{selectedOrganization?.name}</SelectValue>
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup>
                        <SelectLabel>Organisations</SelectLabel>
                        {organizations.map((organization) => (
                            <SelectItem
                                key={organization.id} // Use ID as key
                                value={organization.id.toString()} // Use ID as value and convert to string
                            >
                                <div className="flex items-center gap-3">
                                    {organization.name}
                                </div>
                            </SelectItem>
                        ))}
                        <Separator className="my-1" />
                        <Link
                            href={route("organizations.create")}
                            className={cn(
                                buttonVariants({ variant: "secondary" }),
                                "w-full"
                            )}
                        >
                            Créer une organisation
                        </Link>
                    </SelectGroup>
                </SelectContent>
            </Select>
        </>
    );
};
