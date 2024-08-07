import { useForm } from "@inertiajs/react";
import { ChevronLeftIcon, ChevronRightIcon } from "@radix-ui/react-icons";
import { useEffect, useState } from "react";
import { DateRange } from "react-day-picker";

import { Button } from "@/Components/ui/button";
import { DialogDescription, DialogTitle } from "@/Components/ui/dialog";

import { Title } from "@/Components/Admin/Title";
import { Badge } from "@/Components/ui/badge";

import { ErrorsProps, Event, StepsFields } from "@/types";
import { EventStepName } from "@/types/enums";
import { DateStep } from "./Steps/DateStep";
import { LocationStep } from "./Steps/LocationStep";
import { TicketsStep } from "./Steps/TicketsStep";
import { SteppersTabs } from "./Tabs";

const steps = [
    {
        key: EventStepName.DATE,
        label: "Date",
        idx: 0,
    },
    {
        key: EventStepName.LOCATION,
        label: "Localisation",
        idx: 1,
    },
    {
        key: EventStepName.TICKETS,
        label: "Types de billets",
        idx: 2,
    },
    {
        key: EventStepName.RESUME,
        label: "Résumé",
        idx: 3,
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

    const [date, setDate] = useState<DateRange | undefined>({
        from: new Date(),
        to: undefined,
    });

    const [tickets, setTickets] = useState([
        { name: "Early Bird", quantity: 100, price: 5.0 },
    ]);
    const [extras, setExtras] = useState([
        { name: "Parking", quantity: 750, price: 5.0 },
        { name: "Voucher Boissons (4 pieces)", quantity: 500, price: 2.0 },
    ]);

    const [isUniqueEvent, setIsUniqueEvent] = useState(true);
    const [isDateToBeDetermined, setIsDateToBeDetermined] = useState(false);

    const [errors, setErrors] = useState<ErrorsProps>({});

    const {
        data,
        setData,
        post,
        processing,
        errors: _errors,
    } = useForm({
        location: undefined,
        start_date: date?.from,
        end_date: date?.to,
        tickets: tickets,
        extras: extras,
    });

    const validateDateStep = () => {
        if (isDateToBeDetermined) return true;

        if (!date?.from) {
            setErrors({
                ...errors,
                date: "Veuillez sélectionner une date ou marquer comme 'Date à déterminer'.",
            });
            return false;
        }

        setErrors({});
        return true;
    };

    const validateLocationStep = () => {
        if (!data.location) {
            setErrors({
                ...errors,
                location: "Veuillez sélectionner une localisation.",
            });
            console.log(errors);

            return false;
        }
        setErrors({});
        return true;
    };

    const validateTicketsStep = () => {
        if (tickets.length === 0) {
            setErrors({
                ...errors,
                tickets: "Veuillez ajouter au moins un type de billet.",
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

    const handleNext = () => {
        let isValid = false;
        if (currentStep === 0) isValid = validateDateStep();
        else if (currentStep === 1) isValid = validateLocationStep();
        else if (currentStep === 2) isValid = validateTicketsStep();

        if (!isValid) return;

        if (currentStep === steps.length - 2) {
            // Submit form
            submit();
        }
        setCurrentStep((prev) => prev + 1);
    };

    const submit = () => {
        // Submit form
        console.log("submit", data);

        post(route("events.configure", { id: event.id }), {
            onSuccess: (resp) => {
                setSuccess(true);
            },
        });
    };

    const handlePrevious = () => {
        setCurrentStep((prev) => prev - 1);
    };

    useEffect(() => {
        setData("start_date", date?.from);
        setData("end_date", date?.to);
    }, [date]);

    useEffect(() => {
        setData("tickets", tickets);
        setData("extras", extras);
    }, [tickets, extras]);

    const step = steps[currentStep];
    const idx = steps.findIndex((s) => s.key === step.key);

    return (
        <div className="flex items-stretch justify-between h-full">
            <div className=" border-r border-border p-4 w-1/4 ">
                <DialogTitle>{event.name}</DialogTitle>
                <DialogDescription />
                <SteppersTabs currentStep={currentStep} steps={steps} />
            </div>
            <div className="p-8 w-3/4 h-full flex flex-col">
                <div className="overflow-y-auto h-[480px]">
                    {currentStep < steps.length - 1 && (
                        <Badge variant="outline" className="mb-1">
                            Étape {idx + 1} / {steps.length}
                        </Badge>
                    )}
                    <Title
                        title={
                            step.key === EventStepName.DATE
                                ? "Quand aura lieu votre événement ?"
                                : step.key === EventStepName.LOCATION
                                ? "Où aura lieu votre événement ?"
                                : step.key === EventStepName.TICKETS
                                ? "Quels types de billets proposez-vous ?"
                                : ""
                        }
                        level="h2"
                    ></Title>

                    <div className="mt-4">
                        {step.key === EventStepName.DATE && (
                            <DateStep
                                errors={errors}
                                date={date}
                                setDate={setDate}
                                setData={setData}
                                isUniqueEvent={isUniqueEvent}
                                setIsUniqueEvent={setIsUniqueEvent}
                                isDateToBeDetermined={isDateToBeDetermined}
                                setIsDateToBeDetermined={
                                    setIsDateToBeDetermined
                                }
                            />
                        )}
                        {step.key === EventStepName.LOCATION && (
                            <LocationStep setData={setData} errors={errors} />
                        )}
                        {step.key === EventStepName.TICKETS && (
                            <TicketsStep
                                setData={setData}
                                errors={errors}
                                extras={extras}
                                setExtras={setExtras}
                                tickets={tickets}
                                setTickets={setTickets}
                            />
                        )}
                        {step.key === EventStepName.RESUME && (
                            <div className="w-full h-full flex justify-center items-center">
                                <Title
                                    level="h1"
                                    title="Vos paramètres sont sauvegardés"
                                    className="block"
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
                                    ? "Sauvegarder"
                                    : "Suivant"}
                                <ChevronRightIcon />
                            </Button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};
