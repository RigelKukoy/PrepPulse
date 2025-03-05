"use client";

import * as React from "react";
import { CalendarIcon } from "@radix-ui/react-icons";
import { format } from "date-fns";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

export function DateTimePicker({ selectedSchedule, onChange }) {
  const [isOpen, setIsOpen] = React.useState(false);

  const hours = Array.from({ length: 12 }, (_, i) => i + 1);

  const handleDateSelect = (selectedDate) => {
    if (selectedDate) {
      onChange(selectedDate);
    }
  };

  const handleTimeChange = (type, value) => {
    if (selectedSchedule) {
      const newDate = new Date(selectedSchedule);
      if (type === "hour") {
        newDate.setHours(
          (parseInt(value) % 12) + (newDate.getHours() >= 12 ? 12 : 0)
        );
      } else if (type === "minute") {
        newDate.setMinutes(parseInt(value));
      } else if (type === "ampm") {
        const currentHours = newDate.getHours();
        if (value === "PM" && currentHours < 12) {
          newDate.setHours(currentHours + 12);
        } else if (value === "AM" && currentHours >= 12) {
          newDate.setHours(currentHours - 12);
        }
      }
      onChange(newDate);
    }
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            "w-full justify-start text-left font-normal",
            !selectedSchedule && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {selectedSchedule ? (
            format(selectedSchedule, "MM/dd/yyyy hh:mm aa")
          ) : (
            <span>MM/DD/YYYY hh:mm aa</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0 bg-white">
        <div className="sm:flex">
          <Calendar
            mode="single"
            selected={selectedSchedule}
            onSelect={handleDateSelect}
            initialFocus
          />
          <div className="flex flex-col sm:flex-row sm:h-[300px] divide-y sm:divide-y-0 sm:divide-x">
            <ScrollArea className="w-64 sm:w-auto h-75 border overflow-auto">
              <div className="flex sm:flex-col p-2 h-full">
                {hours.reverse().map((hour) => (
                  <Button
                    key={hour}
                    size="icon"
                    variant={"ghost"}
                    className={cn(
                      "sm:w-full shrink-0 aspect-square hover:bg-gray-200",
                      selectedSchedule &&
                        selectedSchedule.getHours() % 12 === hour % 12
                        ? "bg-black text-white hover:bg-black hover:text-white aria-selected:bg-black aria-selected:text-white"
                        : ""
                    )}
                    onClick={() => handleTimeChange("hour", hour.toString())}
                  >
                    {hour}
                  </Button>
                ))}
              </div>
              <ScrollBar orientation="vertical" />
            </ScrollArea>
            <ScrollArea className="w-64 sm:w-auto overflow-auto">
              <div className="flex sm:flex-col p-2 h-full">
                {Array.from({ length: 12 }, (_, i) => i * 5).map((minute) => (
                  <Button
                    key={minute}
                    size="icon"
                    variant={"ghost"}
                    className={cn(
                      "sm:w-full shrink-0 aspect-square hover:bg-gray-200",
                      selectedSchedule &&
                        selectedSchedule.getMinutes() === minute
                        ? "bg-black text-white hover:bg-black hover:text-white"
                        : ""
                    )}
                    onClick={() =>
                      handleTimeChange("minute", minute.toString())
                    }
                  >
                    {minute.toString().padStart(2, "0")}
                  </Button>
                ))}
              </div>
              <ScrollBar orientation="vertical" />
            </ScrollArea>
            <ScrollArea className="overflow-auto">
              <div className="flex sm:flex-col p-2 h-full">
                {["AM", "PM"].map((ampm) => (
                  <Button
                    key={ampm}
                    size="icon"
                    variant={"ghost"}
                    className={cn(
                      "sm:w-full shrink-0 aspect-square hover:bg-gray-200",
                      selectedSchedule &&
                        ((ampm === "AM" &&
                          (selectedSchedule.getHours() === 0 ||
                            selectedSchedule.getHours() < 12)) ||
                          (ampm === "PM" &&
                            (selectedSchedule.getHours() === 12 ||
                              selectedSchedule.getHours() >= 12)))
                        ? "bg-black text-white hover:bg-black hover:text-white"
                        : ""
                    )}
                    onClick={() => handleTimeChange("ampm", ampm)}
                  >
                    {ampm}
                  </Button>
                ))}
              </div>
            </ScrollArea>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
