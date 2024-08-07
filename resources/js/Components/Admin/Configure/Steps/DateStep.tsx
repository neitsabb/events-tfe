import { DateRange } from "react-day-picker";
import { QuestionMarkCircledIcon, RocketIcon } from "@radix-ui/react-icons";

import { DatePickerWithRange } from "@/Components/ui/datepicker";
import { Label } from "@/Components/ui/label";

import { cn } from "@/utils";
import { StepsFields } from "@/types";

export const DateStep = ({
    date,
    setDate,
    setData,
    errors,
    isUniqueEvent,
    setIsUniqueEvent,
    isDateToBeDetermined,
    setIsDateToBeDetermined,
}: {
    date: DateRange | undefined;
    setDate: (date: DateRange | undefined) => void;
    setData: (key: keyof StepsFields, value: Date | undefined) => void;
    errors: { [key: string]: string };
    isUniqueEvent: boolean;
    setIsUniqueEvent: (isUniqueEvent: boolean) => void;
    isDateToBeDetermined: boolean;
    setIsDateToBeDetermined: (isDateToBeDetermined: boolean) => void;
}) => {
    const handleChange = (date: DateRange | undefined) => {
        setData("start_date", date?.from);
        setData("end_date", date?.to);
    };

    return (
        <>
            <div className="flex gap-4 mb-4">
                <div
                    className={cn(
                        "w-full bg-accent-foreground/10 hover:bg-accent-foreground/15 font-medium transition-colors text-secondary-foreground rounded-md p-4 text-sm cursor-pointer",
                        {
                            "bg-accent-foreground/15": isUniqueEvent,
                        }
                    )}
                    onClick={() => {
                        setIsUniqueEvent(true);
                        setIsDateToBeDetermined(false);
                    }}
                >
                    <RocketIcon className="w-6 h-6 mb-2" />
                    &Eacute;vénement unique
                </div>
                <div
                    className={cn(
                        "w-full bg-accent-foreground/10 hover:bg-accent-foreground/15 font-medium transition-colors text-secondary-foreground rounded-md p-4 text-sm cursor-pointer",
                        {
                            "bg-accent-foreground/15": isDateToBeDetermined,
                        }
                    )}
                    onClick={() => {
                        setIsUniqueEvent(false);
                        setIsDateToBeDetermined(true);
                        // handleNext();
                    }}
                >
                    <QuestionMarkCircledIcon className="w-6 h-6 mb-2" />
                    Date à déterminer
                </div>
            </div>

            {isUniqueEvent && (
                <div className="flex flex-col gap-2.5">
                    <Label htmlFor="description">Date de début et de fin</Label>
                    <DatePickerWithRange
                        date={date}
                        setDate={setDate}
                        handleChange={handleChange}
                    />
                    <p className="text-xs text-primary/50">
                        Si votre événement ne dure qu'une journée, vous pouvez
                        laisser la date de fin vide.
                    </p>
                </div>
            )}
            {errors?.date && (
                <p className="text-red-500 text-xs mt-6">{errors?.date}</p>
            )}
        </>
    );
};
