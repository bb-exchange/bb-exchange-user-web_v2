import "./Calendar.scss";

import * as React from "react";
import { DayPicker } from "react-day-picker";

import dayjs from "dayjs";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { Button } from "@/shared/components/ui/button";

export type CalendarProps = React.ComponentProps<typeof DayPicker> & {
  selected?: any;
  setSelected?: React.Dispatch<React.SetStateAction<any>>;
};

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  selected,
  setSelected,
  ...props
}: CalendarProps) {
  const today = new Date();
  const onDayClick = (selectDay: Date) => {
    if (setSelected) setSelected(selectDay);
  };

  return (
    <DayPicker
      mode="single"
      required={false}
      selected={selected}
      today={today}
      showOutsideDays={showOutsideDays}
      className={className}
      classNames={{
        root: "custom-calendar",
        months: "months",
        month: "month",
        month_caption: "caption",
        caption_label: "caption_label",
        nav: "nav",
        button_previous: "nav_button button_previous",
        button_next: "nav_button button_next",

        weekdays: "weekdays",
        weekday: "weekday",
        day: "day",
        day_button: "day_button",

        weeks: "weeks",
        outside: "outside",
        hidden: "hidden",
        ...classNames,
      }}
      components={{
        DayButton: ({ day, modifiers }) => {
          const isToday = modifiers.today;
          const isSelected = modifiers.selected;
          return (
            <Button
              variant={isSelected ? "solid" : isToday ? "outline" : "ghost"}
              color="gray"
              highContrast={isSelected}
              size="2"
              onClick={() => onDayClick(day.date)}
            >
              {dayjs(day.date).format("D")}
            </Button>
          );
        },
        Chevron: ({ orientation }) => (orientation === "left" ? <ChevronLeft /> : <ChevronRight />),
      }}
      {...props}
    />
  );
}
Calendar.displayName = "Calendar";

export { Calendar };
