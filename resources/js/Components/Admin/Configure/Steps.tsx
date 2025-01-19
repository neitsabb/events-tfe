import { useForm } from '@inertiajs/react';
import { ChevronLeftIcon, ChevronRightIcon } from '@radix-ui/react-icons';
import { useEffect, useState } from 'react';

import { Button } from '@/Components/ui/button';
import { DialogDescription, DialogTitle } from '@/Components/ui/dialog';

import { Title } from '@/Components/Admin/Title';
import { Badge } from '@/Components/ui/badge';

import { CoordsProps, ErrorsProps, Event, Extra } from '@/types';
import { EventStepName } from '@/types/enums';
import { DateStep } from './Steps/DateStep';
import { LocationStep } from './Steps/LocationStep';
import { TicketsStep } from './Steps/TicketsStep';
import { SteppersTabs } from './Tabs';
import { GeneralStep } from './Steps/GeneralStep';

const steps = [
    {
        key: EventStepName.GENERAL,
        label: 'Général',
        idx: 0,
    },
    {
        key: EventStepName.DATE,
        label: 'Date',
        idx: 1,
    },
    {
        key: EventStepName.LOCATION,
        label: 'Localisation',
        idx: 2,
    },
    {
        key: EventStepName.TICKETS,
        label: 'Types de billets',
        idx: 3,
    },
    {
        key: EventStepName.RESUME,
        label: 'Résumé',
        idx: 4,
    },
];

export const Steps = ({
    event,
    setSuccess,
}: {
    event: Event;
    setSuccess: (value: boolean) => void;
}) => {
    const [currentStep, setCurrentStep] = useState(0);

    const [generalInformations, setGeneralInformations] = useState({
        title: event.name,
        description: event.description || '',
        tags: [] as string[],
        image: null as File | null,
    });

    const [startDate, setStartDate] = useState<Date>(new Date());
    const [endDate, setEndDate] = useState<Date>(new Date());

    const [tickets, setTickets] = useState([
        { name: 'Early Bird', quantity: 100, price: 5.0 },
    ]);
    const [extras, setExtras] = useState<Extra[]>([
        { name: 'Parking', quantity: 750, price: 5.0 },
        { name: 'Voucher Boissons (4 pieces)', quantity: 500, price: 2.0 },
    ]);

    const [coords, setCoords] = useState<CoordsProps>({
        lat: 0,
        lng: 0,
    });

    const [errors, setErrors] = useState<ErrorsProps>({});

    const { data, setData, post } = useForm({
        location: {
            street: '',
            city: '',
            country: '',
            zip_code: '',
        },
        start_date: startDate,
        end_date: endDate,
        tickets: tickets,
        extras: extras,
        coords: coords,
        title: generalInformations.title,
        description: generalInformations.description,
        tags: generalInformations.tags,
        image: generalInformations.image,
    });

    const validateDateStep = () => {
        if (!startDate || !endDate) {
            setErrors({
                ...errors,
                date: "Veuillez sélectionner une date ou marquer comme 'Date à déterminer'.",
            });
            return false;
        }

        if (startDate > endDate) {
            setErrors({
                ...errors,
                date: 'La date de fin ne peut pas être antérieure à la date de début.',
            });
            return false;
        }

        // If duration is less than 1 hour
        if (endDate.getTime() - startDate.getTime() < 3600000) {
            setErrors({
                ...errors,
                date: "La durée de l'événement doit être d'au moins 1 heure.",
            });
            return false;
        }

        setErrors({});
        return true;
    };

    const validateLocationStep = () => {
        if (
            !coords.lat ||
            !coords.lng ||
            (coords.lat === 0 && coords.lng === 0)
        ) {
            setErrors({
                ...errors,
                location: 'Veuillez sélectionner une localisation.',
            });

            return false;
        }

        if (!data.location.city) {
            setErrors({
                ...errors,
                location: 'Veuillez sélectionner une ville.',
            });

            return false;
        }

        setErrors({});
        return true;
    };

    const validateTicketsStep = () => {
        if (tickets.length === 0) {
            setErrors({
                ...errors,
                tickets: 'Veuillez ajouter au moins un type de billet.',
            });
            return false;
        }
        if (
            tickets.some((ticket) => ticket.quantity == 0) ||
            extras.some((extra) => extra.quantity == 0)
        ) {
            setErrors({
                ...errors,
                tickets: `Veuillez ajouter une quantité pour chaque type de billet ou d'extra.`,
            });
            return false;
        }
        setErrors({});
        return true;
    };

    const validateGeneralStep = () => {
        if (!generalInformations.title) {
            setErrors({
                ...errors,
                name: 'Veuillez renseigner un nom pour votre événement.',
            });
            return false;
        }

        if (generalInformations.image) {
            if (generalInformations.image.size > 2097152) {
                setErrors({
                    ...errors,
                    image: "L'image ne doit pas dépasser 2Mo.",
                });
                return false;
            }

            if (
                generalInformations.image.type !== 'image/jpeg' &&
                generalInformations.image.type !== 'image/png' &&
                generalInformations.image.type !== 'image/jpg' &&
                generalInformations.image.type !== 'image/svg' &&
                generalInformations.image.type !== 'image/webp' &&
                generalInformations.image.type !== 'image/avif'
            ) {
                setErrors({
                    ...errors,
                    image: "L'image doit être de type WEBP, AVIF, SVG, PNG, JPG ou JPEG.",
                });
                return false;
            }
        }

        setErrors({});
        return true;
    };

    const step = steps[currentStep];
    const idx = steps.findIndex((s) => s.key === step.key);

    const handleNext = () => {
        let isValid = false;
        if (step.key === EventStepName.GENERAL) isValid = validateGeneralStep();
        else if (step.key === EventStepName.DATE) isValid = validateDateStep();
        else if (step.key === EventStepName.LOCATION)
            isValid = validateLocationStep();
        else if (step.key === EventStepName.TICKETS)
            isValid = validateTicketsStep();

        if (!isValid) return;

        if (currentStep === steps.length - 2) {
            // Submit form
            submit();
        }
        setCurrentStep((prev) => prev + 1);
    };

    const submit = () => {
        // Submit form

        post(route('events.configure', { id: event.id }), {
            data: {
                ...data,
                tags: generalInformations.tags,
            },
            onSuccess: (response) => {
                setSuccess(true);
                console.log(response);
            },
            onError: (errors) => {
                console.error(errors);
            },
        });
    };

    const handlePrevious = () => {
        if (step.key === EventStepName.TICKETS) {
            setCoords({
                lat: 0,
                lng: 0,
            });
        }
        setCurrentStep((prev) => prev - 1);
    };

    useEffect(() => {
        setData('start_date', startDate);
        setData('end_date', endDate);
    }, [startDate, endDate]);

    useEffect(() => {
        setData('tickets', tickets);
        setData('extras', extras);
    }, [tickets, extras]);

    useEffect(() => {
        setData('coords', coords);
    }, [coords]);

    useEffect(() => {
        setData('title', generalInformations.title);
        setData('description', generalInformations.description);
        setData('tags', generalInformations.tags);
        setData('image', generalInformations.image);

        console.log('new tags', generalInformations.tags);
    }, [generalInformations]);

    return (
        <div className="flex items-stretch justify-between h-full">
            <div className="hidden md:block border-r border-border p-4 w-1/4 ">
                <DialogTitle>{event.name}</DialogTitle>
                <DialogDescription />
                <SteppersTabs currentStep={currentStep} steps={steps} />
            </div>
            <div className="p-6 md:p-8 w-full md:w-3/4 h-full">
                <div className="overflow-y-auto md:h-[490px]">
                    {currentStep < steps.length - 1 && (
                        <Badge variant="outline" className="mb-1">
                            Étape {idx + 1} / {steps.length}
                        </Badge>
                    )}
                    <Title
                        title={
                            step.key === EventStepName.GENERAL
                                ? 'Informations générales'
                                : EventStepName.DATE
                                ? 'Quand aura lieu votre événement ?'
                                : step.key === EventStepName.LOCATION
                                ? 'Où aura lieu votre événement ?'
                                : step.key === EventStepName.TICKETS
                                ? 'Quels types de billets proposez-vous ?'
                                : ''
                        }
                        level="h2"
                    ></Title>

                    <div className="mt-4 px-1">
                        {step.key === EventStepName.GENERAL && (
                            <GeneralStep
                                informations={generalInformations}
                                setInformations={setGeneralInformations}
                                errors={errors}
                            />
                        )}
                        {step.key === EventStepName.DATE && (
                            <DateStep
                                errors={errors}
                                startDate={startDate}
                                setStartDate={setStartDate}
                                endDate={endDate}
                                setEndDate={setEndDate}
                            />
                        )}
                        {step.key === EventStepName.LOCATION && (
                            <LocationStep
                                setData={setData}
                                errors={errors}
                                coords={coords}
                                setCoords={setCoords}
                            />
                        )}
                        {step.key === EventStepName.TICKETS && (
                            <TicketsStep
                                errors={errors}
                                extras={extras}
                                setExtras={setExtras}
                                tickets={tickets}
                                setTickets={setTickets}
                            />
                        )}
                        {step.key === EventStepName.RESUME && (
                            <div className="w-full h-full flex justify-center items-center ">
                                <Title
                                    level="h1"
                                    title="Vos paramètres sont sauvegardés"
                                    className=" absolute top-[50%] translate-y-[-50%] block"
                                ></Title>
                            </div>
                        )}
                    </div>
                </div>

                {step.key !== EventStepName.RESUME && (
                    <div className="flex justify-end items-center mt-auto">
                        <div className="flex items-center gap-4">
                            {currentStep > 0 && (
                                <Button
                                    variant="outline"
                                    onClick={handlePrevious}
                                >
                                    <ChevronLeftIcon />
                                    Précédent
                                </Button>
                            )}
                            <Button onClick={handleNext} className="">
                                {currentStep === steps.length - 1
                                    ? 'Sauvegarder'
                                    : 'Suivant'}
                                <ChevronRightIcon />
                            </Button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};
