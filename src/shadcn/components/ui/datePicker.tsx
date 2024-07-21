"use client";

import { fr } from "date-fns/locale";
import dayjs from "dayjs";
import { Calendar as CalendarIcon } from "lucide-react";
import { useState } from "react";
import { Button } from "shadcn/components/ui/button";
import { Calendar } from "shadcn/components/ui/calendar";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "shadcn/components/ui/popover";
import { cn } from "shadcn/lib/utils";

type DatePickerProps = {
    className?: string;
    onChange: (date?: Date) => void;
    selected?: Date;
    minDate?: Date | null;
};

export function DatePicker({
    className,
    onChange,
    selected,
    minDate,
}: DatePickerProps) {
    const [calendarOpen, setCalendarOpen] = useState(false);
    const onSelect = (date?: Date) => {
        setCalendarOpen(false);
        onChange(date);
    };
    return (
        <Popover open={calendarOpen} onOpenChange={setCalendarOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant={"outline"}
                    className={cn(
                        "w-full rounded-lg border border-gray-300 bg-gray-50 p-2 text-left font-normal focus:border-cta focus:ring-cta",
                        !selected && "text-muted-foreground",
                        className
                    )}
                >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {selected ? (
                        dayjs(selected).format("D MMMM YYYY")
                    ) : (
                        <span>Choisir une date</span>
                    )}
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
                <Calendar
                    mode="single"
                    selected={selected}
                    onSelect={onSelect}
                    initialFocus
                    fromDate={minDate ? dayjs(minDate).toDate() : undefined}
                    locale={fr}
                    showOutsideDays={false}
                    weekStartsOn={1}
                />
            </PopoverContent>
        </Popover>
    );
}
