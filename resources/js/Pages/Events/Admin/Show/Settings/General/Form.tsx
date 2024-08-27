import { Button } from '@/Components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/Components/ui/card';
import { DatePickerWithRange } from '@/Components/ui/datepicker';
import { Input } from '@/Components/ui/input';
import { Textarea } from '@/Components/ui/textarea';
import React, { useMemo } from 'react';
import { DateRange } from 'react-day-picker';
import { RadioGroup, RadioGroupItem } from '@/Components/ui/radio-group';
import { Label } from '@/Components/ui/label';
import { useForm } from '@inertiajs/react';
import { EventProps } from '@/types';
import { Field } from '@/Components/Admin/Field';

type Field = {
    label: string;
    id: string;
    type: string;
    required?: boolean;
    helperText?: string;
};

export const GeneralForm: React.FC<EventProps> = ({ event }) => {
    console.log(event);
    // Mettre la date de l'event dans le state
    const [date, setDate] = React.useState<DateRange | undefined>({
        from: event.start_date ? new Date(event?.start_date) : undefined,
        to: event.end_date ? new Date(event?.end_date) : undefined,
    });

    const {
        data: generalData,
        setData: setGeneralData,
        errors: generalErrors,
        processing: generalProcessing,
        post: postGeneral,
        reset,
    } = useForm({
        name: event.name,
        description: event.description,
    });

    const handleSubmitGeneralForm = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log('submitted', generalData);

        postGeneral(route('events.update', { id: event.id }), {
            onSuccess: () => {
                console.log('success');
            },
            onError: () => {
                console.log('error');
            },
        });
    };

    const generalFieldsChanged = useMemo(
        () =>
            generalData.name !== event.name ||
            generalData.description !== event.description,
        [generalData, event]
    );

    const {
        data: datesData,
        setData: setDatesData,
        errors: datesErrors,
        processing: datesProcessing,
        post: postDates,
    } = useForm({
        start_date: date?.from,
        end_date: date?.to,
    });

    const handleSubmitDatesForm = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        postDates(route('events.update', { id: event.id }), {
            preserveScroll: true,
            onSuccess: () => {
                console.log('success');
            },
            onError: () => {
                console.log('error');
            },
        });
    };

    const datesFieldsChanged = useMemo(
        () =>
            datesData.start_date !== event.start_date ||
            datesData.end_date !== event.end_date,
        [datesData, event]
    );

    const handleDateChange = (date: DateRange | undefined) => {
        setDatesData('start_date', date?.from);
        setDatesData('end_date', date?.to);
    };

    return (
        <>
            <FormSection
                title="Paramètres de votre événement"
                description="Vous pouvez modifier les paramètres généraux ici."
                disabled={!generalFieldsChanged || generalProcessing}
                reset={reset}
                onSubmit={handleSubmitGeneralForm}
            >
                <Field
                    label="Nom de votre événement"
                    id="name"
                    errors={generalErrors}
                >
                    <Input
                        name="name"
                        value={generalData.name}
                        onChange={(e) => setGeneralData('name', e.target.value)}
                    />
                </Field>
                <Field
                    label="Description"
                    id="description"
                    required={false}
                    errors={generalErrors}
                >
                    <Textarea
                        name="description"
                        value={generalData.description}
                        onChange={(e) =>
                            setGeneralData('description', e.target.value)
                        }
                    />
                    {generalErrors.description ? (
                        <p className="text-xs text-red-500">
                            {generalErrors.description}
                        </p>
                    ) : (
                        <p className="text-xs text-muted-foreground">
                            Écrivez quelques phrases à propos de votre
                            événement.
                        </p>
                    )}
                </Field>
            </FormSection>

            <FormSection
                title="Quand se déroule votre événement ?"
                description="Vous pouvez modifier les dates et heures de votre événement ici."
                disabled={!datesFieldsChanged || datesProcessing}
                onSubmit={handleSubmitDatesForm}
            >
                <Field label="Début et fin" id="date" errors={datesErrors}>
                    <DatePickerWithRange
                        date={date}
                        setDate={setDate}
                        handleChange={handleDateChange}
                    />
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
    disabled = false,
    reset,
    onSubmit,
}: {
    title: string;
    description: string;
    children: React.ReactNode;
    disabled?: boolean;
    reset?: () => void;
    onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}) => {
    const handleReset = () => {
        if (reset) reset();
    };
    return (
        <Card className="divide-y">
            <CardHeader>
                <CardTitle>{title}</CardTitle>
                <CardDescription
                    dangerouslySetInnerHTML={{ __html: description }}
                    className="leading-tight"
                />
            </CardHeader>
            <form onSubmit={onSubmit}>
                <CardContent className="space-y-4 py-6">{children}</CardContent>
                <CardFooter className="pt-6 justify-end gap-4">
                    <Button onClick={handleReset} variant="ghost">
                        Annuler
                    </Button>
                    <Button disabled={disabled}>Sauvegarder</Button>
                </CardFooter>
            </form>
        </Card>
    );
};
