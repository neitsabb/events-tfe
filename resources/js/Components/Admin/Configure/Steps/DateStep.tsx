import { Label } from '@/Components/ui/label';

import { cn } from '@/utils';
import { DatetimePicker } from '@/Components/ui/datetimepicker';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/Components/ui/popover';
import { Button } from '@/Components/ui/button';
import { CalendarIcon } from 'lucide-react';
import { format, formatDuration, intervalToDuration } from 'date-fns';
import { fr } from 'date-fns/locale';
import { Dispatch, SetStateAction } from 'react';

export const DateStep = ({
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    errors,
}: {
    startDate: Date;
    setStartDate: Dispatch<SetStateAction<Date>>;
    endDate: Date;
    setEndDate: Dispatch<SetStateAction<Date>>;
    errors: { [key: string]: string };
}) => {
    return (
        <>
            <EventDatePicker
                startDate={startDate}
                setStartDate={setStartDate}
                endDate={endDate}
                setEndDate={setEndDate}
            />
            {errors?.date && (
                <p className="text-red-500 text-xs mt-6">{errors?.date}</p>
            )}
        </>
    );
};

export const EventDatePicker = ({
    startDate,
    setStartDate,
    endDate,
    setEndDate,
}: {
    startDate: Date;
    setStartDate: Dispatch<SetStateAction<Date>>;
    endDate: Date;
    setEndDate: Dispatch<SetStateAction<Date>>;
}) => {
    const getDuration = () => {
        if (startDate && endDate && startDate < endDate) {
            const duration = intervalToDuration({
                start: startDate,
                end: endDate,
            });
            return formatDuration(duration, {
                format: ['days', 'hours', 'minutes'],
                delimiter: ', ',
                locale: fr,
            });
        }
        return false;
    };

    return (
        <div className="flex flex-col gap-2.5">
            <div className="flex gap-4 my-4">
                <DateField
                    date={startDate}
                    setDate={setStartDate}
                    label="Date de début"
                />
                <DateField
                    date={endDate}
                    setDate={setEndDate}
                    label="Date de fin"
                    disabledBeforeDate={startDate}
                />
            </div>
            {getDuration() && (
                <p className="text-xs text-primary/50">
                    Durée de l'événement : {getDuration()}
                </p>
            )}
        </div>
    );
};

const DateField = ({
    date,
    setDate,
    label,
    disabledBeforeDate,
}: {
    date: Date;
    setDate: Dispatch<SetStateAction<Date>>;
    label: string;
    disabledBeforeDate?: Date;
}) => {
    return (
        <div className="flex flex-col gap-2.5 w-full">
            <Label htmlFor="description">{label}</Label>
            <Popover>
                <PopoverTrigger asChild>
                    <Button
                        variant={'outline'}
                        className={cn(
                            'w-full justify-start text-left font-normal',
                            !date && 'text-muted-foreground'
                        )}
                    >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {date ? (
                            format(date, 'PPP HH:mm')
                        ) : (
                            <span>Choisir une date</span>
                        )}
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-4">
                    <DatetimePicker
                        selected={date}
                        setDate={setDate}
                        disabled={
                            disabledBeforeDate
                                ? { before: disabledBeforeDate }
                                : undefined
                        }
                    />
                </PopoverContent>
            </Popover>
        </div>
    );
};
