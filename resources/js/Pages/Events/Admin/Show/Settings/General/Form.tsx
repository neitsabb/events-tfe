import { EventDatePicker } from '@/Components/Admin/Configure/Steps/DateStep';
import { InputTags } from '@/Components/Admin/Configure/Steps/GeneralStep';
import { LocationStep } from '@/Components/Admin/Configure/Steps/LocationStep';
import { Field } from '@/Components/Admin/Field';
import { FormSection } from '@/Components/Admin/FormSection';
import { Input } from '@/Components/ui/input';
import { Textarea } from '@/Components/ui/textarea';
import { toast } from '@/Components/ui/use-toast';
import { CoordsProps, Event, PageProps } from '@/types';
import { compactAddress } from '@/utils';
import { useForm, usePage } from '@inertiajs/react';
import React, { useEffect, useMemo, useState } from 'react';

type Field = {
    label: string;
    id: string;
    type: string;
    required?: boolean;
    helperText?: string;
};

type GeneralFormProps = {
    event: Event;
};

export const GeneralForm: React.FC<GeneralFormProps> = ({ event }) => {
    return (
        <>
            <GeneralDataForm event={event} />
            <DateForm event={event} />
            <LocationForm event={event} />
        </>
    );
};

const GeneralDataForm = ({ event }: { event: Event }) => {
    const { flash } = usePage<PageProps>().props;
    const [tags, setTags] = useState<string[]>(event.tags);
    const { data, setData, errors, processing, post } = useForm({
        name: event.name,
        description: event.description,
        tags,
    });

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        post(route('events.update', { id: event.id }), {
            onSuccess: () => {
                toast({
                    title: 'Succès',
                    description: flash.success,
                });
            },
            onError: (e) => {
                console.log('Error while updating', e);
            },
        });
    };

    useEffect(() => {
        setData('tags', tags);
    }, [tags]);

    return (
        <FormSection
            title="Paramètres de votre événement"
            description="Vous pouvez modifier les paramètres généraux ici."
            disabled={processing}
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
            <Field label="Mots clés" id="tags" errors={errors}>
                <InputTags tags={tags} setTags={setTags} />
            </Field>
        </FormSection>
    );
};

const DateForm = ({ event }: { event: Event }) => {
    const { flash } = usePage<PageProps>().props;

    const [startDate, setStartDate] = useState<Date>(
        new Date(event.start_date)
    );
    const [endDate, setEndDate] = useState<Date>(new Date(event.end_date));

    const { data, setData, errors, processing, post } = useForm({
        start_date: startDate,
        end_date: endDate,
    });

    useEffect(() => {
        setData((prev) => ({
            ...prev,
            start_date: startDate,
        }));
        setData((prev) => ({
            ...prev,
            end_date: endDate,
        }));
    }, [startDate, endDate]);

    const handleSubmitDatesForm = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // Créer un objet avec les nouvelles valeurs
        const updatedData = {
            ...data,
            start_date: startDate,
            end_date: endDate,
        };

        // Envoyer les données mises à jour
        post(route('events.update', { id: event.id }), {
            data: updatedData, // Utiliser l'objet temporaire ici
            preserveScroll: true,
            onSuccess: () => {
                toast({
                    title: 'Succès',
                    description: flash.success,
                });
            },
            onError: (e) => {
                console.log('Error while updating', e);
            },
        });
    };

    const fieldsChanged = useMemo(
        () =>
            data.start_date !== event.start_date ||
            data.end_date !== event.end_date,
        [data, event]
    );

    return (
        <FormSection
            title="Quand se déroule votre événement ?"
            description="Vous pouvez modifier les dates et heures de votre événement ici."
            disabled={!fieldsChanged || processing}
            onSubmit={handleSubmitDatesForm}
        >
            <Field label="Début et fin" id="date" errors={errors}>
                <EventDatePicker
                    startDate={startDate}
                    setStartDate={setStartDate}
                    endDate={endDate}
                    setEndDate={setEndDate}
                />
            </Field>
        </FormSection>
    );
};

const LocationForm = ({ event }: { event: Event }) => {
    const { flash } = usePage<PageProps>().props;

    const [coords, setCoords] = useState<CoordsProps>({
        lat: event.coords.lat,
        lng: event.coords.lng,
    });

    const { setData, errors, post } = useForm({
        location: {
            street: '',
            city: '',
            country: '',
            zip_code: '',
        },
        coords: {
            lat: coords.lat,
            lng: coords.lng,
        },
    });

    useEffect(() => {
        setData('coords', coords);
    }, [coords]);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        post(route('events.update', { id: event.id }), {
            preserveScroll: true,
            onSuccess: () => {
                toast({
                    title: 'Succès',
                    description: flash.success,
                });
            },
            onError: (e) => {
                console.log('Error while updating', e);
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
                defaultValue={compactAddress(event.location)}
                setCoords={setCoords}
            />
        </FormSection>
    );
};
