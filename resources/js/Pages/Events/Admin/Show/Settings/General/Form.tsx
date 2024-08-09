import { Button } from "@/Components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/Components/ui/card";
import { DatePickerWithRange } from "@/Components/ui/datepicker";
import { Input } from "@/Components/ui/input";
import { Textarea } from "@/Components/ui/textarea";
import React from "react";
import { DateRange } from "react-day-picker";
import { Field } from "../../Tickets/Partials/CreateTicketForm";
import { RadioGroup, RadioGroupItem } from "@/Components/ui/radio-group";
import { Label } from "@/Components/ui/label";

type Field = {
    label: string;
    id: string;
    type: string;
    required?: boolean;
    helperText?: string;
};

export const GeneralForm = () => {
    const [date, setDate] = React.useState<DateRange | undefined>({
        from: new Date(),
        to: new Date(),
    });
    return (
        <>
            <FormSection
                title="Paramètres de votre événement"
                description="Vous pouvez modifier les paramètres généraux ici."
            >
                <Field label="Nom de votre événement" id="name">
                    <Input name="name" />
                </Field>
                <Field label="Description" id="description" required={false}>
                    <Textarea name="description" />
                    <p className="text-xs text-muted-foreground">
                        Écrivez quelques phrases à propos de votre événement.
                    </p>
                </Field>
            </FormSection>

            <FormSection
                title="Quand se déroule votre événement ?"
                description="Vous pouvez modifier les dates et heures de votre événement ici."
            >
                <Field label="Début et fin" id="date">
                    <DatePickerWithRange date={date} setDate={setDate} />
                </Field>
            </FormSection>

            <FormSection
                title="Où se déroule votre événement ?"
                description="Vous pouvez modifier le lieu de votre événement ici."
            >
                <RadioGroup defaultValue="option-one">
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="option-one" id="option-one" />
                        <Label
                            htmlFor="option-one"
                            className="font-normal cursor-pointer"
                        >
                            Pas de localisation fixe
                        </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="option-two" id="option-two" />
                        <Label
                            htmlFor="option-two"
                            className="font-normal cursor-pointer"
                        >
                            Sélectionner une localisation
                        </Label>
                    </div>
                </RadioGroup>
            </FormSection>
        </>
    );
};

export const FormSection = ({
    title,
    description,
    children,
}: {
    title: string;
    description: string;
    children: React.ReactNode;
}) => {
    return (
        <Card className="divide-y">
            <CardHeader>
                <CardTitle>{title}</CardTitle>
                <CardDescription
                    dangerouslySetInnerHTML={{ __html: description }}
                    className="leading-tight"
                />
            </CardHeader>
            <CardContent className="space-y-4 py-6">{children}</CardContent>
            <CardFooter className="pt-6 justify-end gap-4">
                <Button variant="ghost">Annuler</Button>
                <Button>Sauvegarder</Button>
            </CardFooter>
        </Card>
    );
};
