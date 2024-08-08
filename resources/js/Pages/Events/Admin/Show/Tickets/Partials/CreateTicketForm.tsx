import { Button } from "@/Components/ui/button";
import { DialogFooter } from "@/Components/ui/dialog";
import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/Components/ui/popover";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/Components/ui/select";
import { ErrorsProps } from "@/types";
import { cn } from "@/utils";
import { useForm } from "@inertiajs/react";
import { DialogTrigger } from "@radix-ui/react-dialog";
import { ChevronDownIcon, IdCardIcon, StarIcon } from "@radix-ui/react-icons";
import React, { useState } from "react";
import { HexColorPicker } from "react-colorful";

export const CreateTicketForm = ({
    eventId,
    setOpen,
}: {
    eventId: string;
    setOpen: (value: boolean) => void;
}) => {
    const [type, setType] = useState<"admission" | "extra" | undefined>(
        undefined
    );
    const [color, setColor] = useState("#aabbcc");

    const { data, setData, post, processing, errors } = useForm({
        type: type,
        name: "",
        // color,
        price: 0,
        quantity: 0,
    });

    const cancel = () => {
        setType(undefined);
        setColor("#aabbcc");
    };

    const handleTypeChange = (type: "admission" | "extra") => {
        setType(type as "admission" | "extra");
        setData("type", type);
    };

    const submit = (e: any) => {
        e.preventDefault();
        console.log("submit", data);
        post(route("events.tickets.store", { id: eventId }), {
            onSuccess: () => setOpen(false),
            onError: (errs) => {
                console.error("errors", errs);
            },
        });
    };

    return (
        <>
            <div className="space-y-8">
                <SwitchTicketType type={type} setType={handleTypeChange} />
                {type !== undefined && (
                    <div className="space-y-4">
                        <Row>
                            <Field
                                className="w-3/5 shrink-0"
                                label="Nom"
                                id="name"
                                errors={errors}
                            >
                                <Input
                                    id="name"
                                    required={true}
                                    onChange={(e) =>
                                        setData("name", e.target.value)
                                    }
                                />
                            </Field>
                            <Field label="Couleur" id="color" errors={errors}>
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <Button
                                            variant="outline"
                                            className="!pl-1.5 !pr-2"
                                        >
                                            <div
                                                className="w-full h-6 rounded-md"
                                                style={{
                                                    backgroundColor: color,
                                                }}
                                            ></div>
                                            <ChevronDownIcon className="w-6 h-6 ml-1.5" />
                                        </Button>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-48 aspect-square">
                                        <HexColorPicker
                                            color={color}
                                            onChange={setColor}
                                            className="w-full"
                                        />
                                    </PopoverContent>
                                </Popover>
                            </Field>
                        </Row>
                        <Row>
                            <Field
                                className="w-1/2"
                                id="price"
                                label="Prix"
                                errors={errors}
                            >
                                <Input
                                    id="price"
                                    type="number"
                                    onChange={(e) =>
                                        setData("price", e.target.value as any)
                                    }
                                    required={true}
                                />
                            </Field>

                            <Field
                                className="w-1/2"
                                id="quantity"
                                label="Quantité"
                                errors={errors}
                            >
                                <Input
                                    id="quantity"
                                    type="number"
                                    required={true}
                                    onChange={(e) =>
                                        setData(
                                            "quantity",
                                            e.target.value as any
                                        )
                                    }
                                />
                            </Field>
                        </Row>
                    </div>
                )}
                <CreateTicketFooter
                    type={type}
                    cancel={cancel}
                    submit={submit}
                />
            </div>
        </>
    );
};

const SwitchTicketType = ({
    type,
    setType,
}: {
    type: "admission" | "extra" | undefined;
    setType: (type: "extra" | "admission") => void;
}) => {
    return (
        <div className="flex gap-4">
            <div
                className={cn(
                    "w-full bg-accent hover:bg-accent-foreground/10 font-medium transition-colors text-accent-foreground rounded-md p-4 text-sm cursor-pointer",
                    {
                        "bg-accent-foreground/10 ring-2 ring-offset-2 ring-primary":
                            type === "admission",
                    }
                )}
                onClick={() => {
                    setType("admission");
                }}
            >
                <IdCardIcon className="w-4 h-4 mb-2" />
                Billet d'entrée
                <p className="text-xs font-normal text-accent-foreground">
                    Un billet d'entrée, un pass VIP etc. <br /> Une personne par
                    billet.
                </p>
            </div>
            <div
                className={cn(
                    "w-full bg-accent hover:bg-accent-foreground/10 font-medium transition-colors text-accent-foreground rounded-md p-4 text-sm cursor-pointer",
                    {
                        "bg-accent-foreground/10 ring-2 ring-offset-2 ring-primary":
                            type === "extra",
                    }
                )}
                onClick={() => {
                    setType("extra");
                }}
            >
                <StarIcon className="w-4 h-4 mb-2" />
                Extra
                <p className="text-xs font-normal text-accent-foreground">
                    Des tickets boissons, Une place de parking, etc.
                </p>
            </div>
        </div>
    );
};

const CreateTicketFooter = ({
    type,
    cancel,
    submit,
}: {
    type: "admission" | "extra" | undefined;
    cancel: () => void;
    submit: (e: any) => void;
}) => {
    return (
        type !== undefined && (
            <DialogFooter>
                <DialogTrigger asChild>
                    <Button variant="ghost" onClick={cancel}>
                        Annuler
                    </Button>
                </DialogTrigger>

                <Button type="submit" onClick={submit}>
                    Sauvegarder {type === "extra" ? "l'extra" : "le billet"}
                </Button>
            </DialogFooter>
        )
    );
};

const Field = ({
    label,
    id,
    children,
    className,
    errors,
}: {
    label: string;
    id: string;
    children: React.ReactNode;
    className?: string;
    errors: ErrorsProps;
}) => {
    return (
        <div className={cn("w-full flex flex-col gap-2", className)}>
            <Label htmlFor={id} className="flex justify-between items-center">
                {label} <span className="text-xs font-light">Obligatoire</span>
            </Label>
            {children}
            {errors[id] && <p className="text-xs text-red-500">{errors[id]}</p>}
        </div>
    );
};

const Row = ({ children }: { children: React.ReactNode }) => {
    return <div className="flex gap-4 w-full">{children}</div>;
};
