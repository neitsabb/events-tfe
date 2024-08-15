import React, { useEffect } from "react";
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
import { useForm } from "@inertiajs/react";

export const OrganizationSwitcher = ({
    organizations,
    organizationLogged,
}: {
    organizations: Organization[];
    organizationLogged: Organization;
}) => {
    // Initialize state with the ID of the first organization
    const [selectedOrganizationId, setSelectedOrganizationId] =
        React.useState<number>(organizationLogged?.id || organizations[0]?.id);

    // useForm hook setup
    const { data, setData, post, errors } = useForm({
        organizationId: selectedOrganizationId,
    });

    useEffect(() => {
        post(route("organizations.switch"), {
            onSuccess: () => {
                console.log("success");
            },
        });
        console.log("data change, post request");
    }, [data]);
    // Function to handle selection changes
    const handleSelect = (id: string) => {
        const selectedId = parseInt(id, 10); // Convert string to number
        setSelectedOrganizationId(selectedId);
        setData("organizationId", selectedId);

        // Optionally send a POST request or handle other actions
        // post(route("organizations.switch"), {
        //     onSuccess: () => {
        //         console.log("success");
        //     },
        // });
    };

    // Find the selected organization by ID
    const selectedOrganization = organizations.find(
        (org) => org.id === selectedOrganizationId
    );

    return (
        <Select
            value={selectedOrganizationId?.toString()} // Use ID as value and convert to string for compatibility
            onValueChange={handleSelect}
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
                </SelectGroup>
            </SelectContent>
        </Select>
    );
};
