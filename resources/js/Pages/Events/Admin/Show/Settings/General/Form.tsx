import { EventDatePicker } from '@/Components/Admin/Configure/Steps/DateStep';
import { InputTags } from '@/Components/Admin/Configure/Steps/GeneralStep';
import { LocationStep } from '@/Components/Admin/Configure/Steps/LocationStep';
import { Field } from '@/Components/Admin/Field';
import { FormSection } from '@/Components/Admin/FormSection';
import { Button } from '@/Components/ui/button';
import { Input } from '@/Components/ui/input';
import { Textarea } from '@/Components/ui/textarea';
import { toast } from '@/Components/ui/use-toast';
import { CoordsProps, Event } from '@/types';
import { compactAddress } from '@/utils';
import { useForm } from '@inertiajs/react';
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
    const [tags, setTags] = useState<string[]>(event.tags);
    const { data, setData, errors, processing, post } = useForm({
        name: event.name,
        description: event.description,
        tags,
        image: event.image,
    });

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        post(route('events.update', { id: event.id }), {
            onSuccess: ({ props: { flash } }) => {
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

    const [editImage, setEditImage] = useState(false);

    return (
        <FormSection
            title="Paramètres de votre événement"
            description="Vous pouvez modifier les paramètres généraux ici."
            disabled={processing}
            onSubmit={handleSubmit}
        >
            <Field
                label="Image de couverture"
                id="cover"
                errors={errors}
                required={false}
            >
                <div className="flex items-center gap-4">
                    {event.image && (
                        <img
                            src={event.image}
                            alt="cover"
                            className="w-20 h-20 rounded-full shrink-0"
                        />
                    )}
                    {editImage ? (
                        <div className="flex items-center justify-center w-full">
                            <label
                                htmlForor="dropzone-file"
                                className="flex flex-col items-center justify-center w-full h-36 border-input border  shadow-sm  rounded-md  cursor-pointer "
                            >
                                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                    <svg
                                        className="w-8 h-8 mb-4 text-gray-400 dark:text-gray-400"
                                        aria-hidden="true"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 20 16"
                                    >
                                        <path
                                            stroke="currentColor"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                                        />
                                    </svg>

                                    <p className="text-xs text-gray-400 dark:text-gray-400">
                                        SVG, PNG, JPG ou JPEG. Max 2Mo
                                    </p>
                                </div>
                                <input
                                    id="dropzone-file"
                                    type="file"
                                    className="hidden"
                                    onChange={(e) => {
                                        setData('image', e.target.files[0]);
                                    }}
                                />
                            </label>
                        </div>
                    ) : (
                        <Button
                            variant={'outline'}
                            onClick={() => setEditImage(true)}
                        >
                            Modifier l'image
                        </Button>
                    )}
                </div>
            </Field>

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
            onSuccess: ({ props: { flash } }) => {
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
            <Field label="" id="date" errors={errors}>
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
            onSuccess: ({ props: { flash } }) => {
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
