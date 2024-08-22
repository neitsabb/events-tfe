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
import { CreateEventDialog } from "@/Pages/Events/Admin/Index/Partials/CreateEvent/Modal";
import { Cross2Icon, PlusIcon } from "@radix-ui/react-icons";
import { Field } from "@/Pages/Events/Admin/Show/Tickets/Partials/CreateTicketForm";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";

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
                        <Button
                            variant={"outline"}
                            className={"w-full"}
                            onClick={() => setOpen(true)}
                        >
                            <PlusIcon className="mr-2 " />
                            Créer une organisation
                        </Button>
                    </SelectGroup>
                </SelectContent>
            </Select>
            <CreateOrganizationDialog open={open} handleOpen={setOpen} />
        </>
    );
};

const CreateOrganizationDialog = ({
    open,
    handleOpen,
}: {
    open: boolean;
    handleOpen: (open: boolean) => void;
}) => {
    return (
        <Dialog open={open} onOpenChange={handleOpen}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Créer une organisation</DialogTitle>
                    <DialogDescription>
                        Créez une nouvelle organisation pour gérer vos
                        événements.
                    </DialogDescription>
                </DialogHeader>
                <CreateOrganizationForm open={open} handleOpen={handleOpen} />
            </DialogContent>
        </Dialog>
    );
};

type CreateOrganizationInputFields =
    | "name"
    | "type"
    | "description"
    | "logo"
    | "website"
    | "genres";

const CreateOrganizationForm = ({
    open,
    handleOpen,
}: {
    open: boolean;
    handleOpen: (open: boolean) => void;
}) => {
    const [genres, setGenres] = useState<string[]>([]);
    const { data, setData, post, processing, errors, reset } = useForm({
        name: "",
        type: "association",
        description: "",
        genres: genres,
        logo: null as File | string | null,
        website: "",
    });

    useEffect(() => {
        setData("genres", genres);
    }, [genres]);

    const handleSubmit = () => {
        console.log(data);
        post(route("organizations.store"), {
            onSuccess: () => {
                handleOpen(false);
                reset();
            },
        });
    };

    return (
        <>
            <div className="space-y-4">
                <div className="grid grid-cols-3 gap-3">
                    <Field
                        label="Nom"
                        id="name"
                        className="col-span-2"
                        errors={errors}
                    >
                        <Input
                            id="name"
                            onChange={(e) => setData("name", e.target.value)}
                        />
                    </Field>
                    <Field label="Type" id="type" errors={errors}>
                        <Select
                            onValueChange={(value) => setData("type", value)}
                            defaultValue={"association"}
                        >
                            <SelectTrigger>
                                <SelectValue>Association</SelectValue>
                            </SelectTrigger>
                            <SelectContent align="end">
                                <SelectItem value="association">
                                    Association
                                </SelectItem>
                                <SelectItem value="entreprise">
                                    Entreprise
                                </SelectItem>
                                <SelectItem value="label">
                                    Label de musique
                                </SelectItem>
                                <SelectItem value="collectif">
                                    Collectif artistique
                                </SelectItem>
                                <SelectItem value="festival">
                                    Festival
                                </SelectItem>
                                <SelectItem value="autre">Autre</SelectItem>
                            </SelectContent>
                        </Select>
                    </Field>
                </div>
                <Field label="Description" id="description" errors={errors}>
                    <Textarea
                        id="description"
                        onChange={(e) => setData("description", e.target.value)}
                    />
                    <p className="text-xs text-muted-foreground">
                        &Eacute;crivez une brève description de votre
                        organisation (Mission, style musical, histoire, etc.)
                    </p>
                </Field>
                <Field
                    label="Genres musicaux"
                    id="genres"
                    required={false}
                    errors={errors}
                >
                    <InputTags tags={genres} setTags={setGenres} />
                    <p className="text-xs text-muted-foreground">
                        Quels genres musicaux représentez-vous ou produisez-vous
                        ? (Ex : Techno, House, Hip-Hop, Jazz, Rock)
                    </p>
                </Field>
                <Field label="Logo" id="logo" required={false} errors={errors}>
                    <Input
                        type="file"
                        id="logo"
                        onChange={(e) => setData("logo", e.target.value)}
                    />
                </Field>
                <Field
                    label="Site web"
                    id="website"
                    required={false}
                    errors={errors}
                >
                    <Input
                        id="website"
                        onChange={(e) => setData("description", e.target.value)}
                    />
                </Field>
            </div>
            <DialogFooter>
                <Button
                    variant="secondary"
                    onClick={() => {
                        handleOpen(false);
                    }}
                >
                    Annuler
                </Button>
                <Button onClick={handleSubmit}>Sauvegarder</Button>
            </DialogFooter>
        </>
    );
};

const InputTags = ({
    tags,
    setTags,
}: {
    tags: string[];
    setTags: React.Dispatch<React.SetStateAction<string[]>>;
}) => {
    const [inputValue, setInputValue] = useState("");

    const handleKeyDown = (event: any) => {
        if (event.key === "Enter") {
            setInputValue("");
            const tag =
                inputValue.trim().charAt(0).toUpperCase() + inputValue.slice(1);
            if (tags.includes(tag)) return;
            setTags([...tags, tag]);
        }
    };

    return (
        <div className="flex flex-col gap-3">
            <Input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
            />
            {tags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                    {tags.map((tag) => (
                        <div
                            key={tag}
                            className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-secondary text-secondary-foreground border border-muted-foreground/15"
                        >
                            {tag}
                            <span
                                onClick={() =>
                                    setTags(tags.filter((t) => t !== tag))
                                }
                                className="ml-1 cursor-pointer"
                            >
                                <Cross2Icon className="w-3" />
                            </span>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};
