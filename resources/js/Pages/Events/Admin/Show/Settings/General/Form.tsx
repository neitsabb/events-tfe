import { LocationStep } from '@/Components/Admin/Configure/Steps/LocationStep';
import { Field } from '@/Components/Admin/Field';
import { FormSection } from '@/Components/Admin/FormSection';
import { Button } from '@/Components/ui/button';
import { DatePickerWithRange } from '@/Components/ui/datepicker';
import { Input } from '@/Components/ui/input';
import { Textarea } from '@/Components/ui/textarea';
import { CoordsProps, Event, EventProps } from '@/types';
import { useForm } from '@inertiajs/react';
import React, { useEffect, useMemo, useState } from 'react';
import { DateRange } from 'react-day-picker';

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
    const { data, setData, errors, processing, post } = useForm({
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

    const { setData, errors, data, post } = useForm({
        location: {
            street: '',
            city: '',
            country: '',
            zipcode: '',
        },
        coords: {
            lat: coords.lat,
            lng: coords.lng,
        },
    });

    useEffect(() => {
        setData('coords', coords);
    }, [coords]);

    useEffect(() => {
        console.log('Location changed', data.location);
    }, [data.location]);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        post(route('events.update', { id: event.id }), {
            preserveScroll: true,
            onSuccess: () => {
                console.log('Location updated successfully');
            },
            onError: () => {
                console.log('Error while updating location');
            },
        });
    };

    return (
        <FormSection
            title="Où se déroule votre événement ?"
            description="Vous pouvez modifier le lieu de votre événement ici."
            onSubmit={handleSubmit}
        >
            <LocationStep
                setData={setData}
                errors={errors}
                coords={coords}
                defaultValue={data.location}
                setCoords={setCoords}
            />
        </FormSection>
    );
};
