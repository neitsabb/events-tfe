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
import React, { useMemo, useState } from 'react';
import { DateRange } from 'react-day-picker';
import { RadioGroup, RadioGroupItem } from '@/Components/ui/radio-group';
import { Label } from '@/Components/ui/label';
import { useForm } from '@inertiajs/react';
import { CoordsProps, Event, EventProps } from '@/types';
import { Field } from '@/Components/Admin/Field';
import { LocationStep } from '@/Components/Admin/Configure/Steps/LocationStep';

type Field = {
    label: string;
    id: string;
    type: string;
    required?: boolean;
    helperText?: string;
};

export const GeneralForm: React.FC<EventProps> = ({ event }) => {
    return (
        <>
            <GeneralDataForm event={event} />
            <DateForm event={event} />
            <LocationForm event={event} />
        </>
    );
};

const GeneralDataForm = ({ event }: { event: Event }) => {
    const { data, setData, errors, processing, post, reset } = useForm({
        name: event.name,
        description: event.description,
    });

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        post(route('events.update', { id: event.id }), {
            onSuccess: () => {
                console.log('success');
            },
            onError: () => {
                console.log('error');
            },
        });
    };

    const fieldsChanged = useMemo(
        () =>
            data.name !== event.name || data.description !== event.description,
        [data, event]
    );

    return (
        <FormSection
            title="Paramètres de votre événement"
            description="Vous pouvez modifier les paramètres généraux ici."
            disabled={!fieldsChanged || processing}
            reset={reset}
            onSubmit={handleSubmit}
        >
            <Field label="Nom de votre événement" id="name" errors={errors}>
                <Input
                    name="name"
                    value={data.name}
                    onChange={(e) => setData('name', e.target.value)}
                />
            </Field>
            <Field
                label="Description"
                id="description"
                required={false}
                errors={errors}
            >
                <Textarea
                    name="description"
                    value={data.description}
                    onChange={(e) => setData('description', e.target.value)}
                />
                {errors.description ? (
                    <p className="text-xs text-red-500">{errors.description}</p>
                ) : (
                    <p className="text-xs text-muted-foreground">
                        Écrivez quelques phrases à propos de votre événement.
                    </p>
                )}
            </Field>
        </FormSection>
    );
};

const DateForm = ({ event }: { event: Event }) => {
    const [date, setDate] = React.useState<DateRange | undefined>({
        from: event.start_date ? new Date(event?.start_date) : undefined,
        to: event.end_date ? new Date(event?.end_date) : undefined,
    });

    const { data, setData, errors, processing, post } = useForm({
        start_date: date?.from,
        end_date: date?.to,
    });

    const handleSubmitDatesForm = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        post(route('events.update', { id: event.id }), {
            preserveScroll: true,
            onSuccess: () => {
                console.log('success');
            },
            onError: () => {
                console.log('error');
            },
        });
    };

    const fieldsChanged = useMemo(
        () =>
            data.start_date !== event.start_date ||
            data.end_date !== event.end_date,
        [data, event]
    );

    const handleDateChange = (date: DateRange | undefined) => {
        setData('start_date', date?.from);
        setData('end_date', date?.to);
    };
    return (
        <FormSection
            title="Quand se déroule votre événement ?"
            description="Vous pouvez modifier les dates et heures de votre événement ici."
            disabled={!fieldsChanged || processing}
            onSubmit={handleSubmitDatesForm}
        >
            <Field label="Début et fin" id="date" errors={errors}>
                <DatePickerWithRange
                    date={date}
                    setDate={setDate}
                    handleChange={handleDateChange}
                />
            </Field>
        </FormSection>
    );
};

const LocationForm = ({ event }: { event: Event }) => {
    const [coords, setCoords] = useState<CoordsProps>({
        lat: event.coords.lat,
        lng: event.coords.lng,
    });

    const { setData, errors, data } = useForm({
        coords: {
            lat: 0,
            lng: 0,
        },
    });

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log('submit', data);
    };
    return (
        <FormSection
            title="Où se déroule votre événement ?"
            description="Vous pouvez modifier le lieu de votre événement ici."
            onSubmit={handleSubmit}
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

            <LocationStep
                setData={setData}
                errors={errors}
                coords={coords}
                setCoords={setCoords}
            />
        </FormSection>
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
    onSubmit?: (e: React.FormEvent<HTMLFormElement>) => void;
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
                {onSubmit && (
                    <CardFooter className="pt-6 justify-end gap-4">
                        <Button onClick={handleReset} variant="ghost">
                            Annuler
                        </Button>
                        <Button disabled={disabled}>Sauvegarder</Button>
                    </CardFooter>
                )}
            </form>
        </Card>
    );
};
