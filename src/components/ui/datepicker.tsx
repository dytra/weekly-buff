"use client";

import * as React from "react";
import { CalendarIcon } from "@radix-ui/react-icons";
import { addDays, format, startOfWeek } from "date-fns";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
interface DatePickerProps {
  placeholder?: string;
  onChange?:(date:Date) => void;
}
export const DatePicker: React.FC<DatePickerProps> = ({ placeholder,onChange }) => {
  const [date, setDate] = React.useState<Date>();
  const firstDayOfWeek = startOfWeek(new Date(), { weekStartsOn: 0 });
  const endDayOfWeek = addDays(firstDayOfWeek, 6);
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-[240px] justify-start text-left font-normal w-full",
            !date && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? (
            format(date, "PPP")
          ) : (
            <span>{placeholder ?? "Pick a Date"}</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          fromDate={firstDayOfWeek}
          toDate={endDayOfWeek}
          onDayClick={(date) => {
            if(onChange) onChange(date)
          }}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
};
