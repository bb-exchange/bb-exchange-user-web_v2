import { useState } from "react";

import dayjs from "dayjs";
import { CalendarDays } from "lucide-react";

import { Button } from "@/shared/components/ui/button";
import { Calendar } from "@/shared/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/shared/components/ui/popover";

type DatePickerProps = {
  placeholder?: string;
  selected?: any;
  setSelected?: React.Dispatch<React.SetStateAction<any>>;
  format?: string;
};
const DatePicker = ({
  placeholder = "날짜를 선택해주세요.",
  selected,
  setSelected,
  format = "YYYY-MM-DD",
}: DatePickerProps) => {
  const [open, setOpen] = useState(false);
  // const [selected, setSelected] = useState<any>();

  const onDayClick = (e: Date) => {
    setOpen(false);
    if (setSelected) setSelected(e);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger>
        <Button variant="surface" color="gray">
          {selected ? dayjs(selected).format(format) : placeholder}
          <CalendarDays size={16} />
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <Calendar selected={selected} setSelected={onDayClick} />
      </PopoverContent>
    </Popover>
  );
};

DatePicker.displayName = "DatePicker";
export { DatePicker };
