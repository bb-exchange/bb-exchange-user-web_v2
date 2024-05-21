import "react-datepicker/dist/react-datepicker.css";

import { useRef } from "react";
import DatePicker from "react-datepicker";

import ChevronLt from ".assets/icons/ChevronLt.svg";
import ChevronRt from ".assets/icons/ChevronRt.svg";
import { getMonth, getYear } from "date-fns";
import ko from "date-fns/locale/ko";

interface IProps {
  date: Date;
  setDate: Function;
}

export default function CustomDatePicker({ date, setDate }: IProps) {
  const calendar = useRef<any | null>(null);

  const cancelDatePicker = () => calendar.current.setOpen(false);

  return (
    <DatePicker
      ref={calendar}
      className="customPickerInput"
      popperClassName="customPickerPopper"
      locale={ko}
      selected={date}
      onChange={(d: Date) => setDate(d)}
      dateFormat="yyyy.MM.dd"
      renderCustomHeader={({ date, increaseMonth, decreaseMonth }) => (
        <CustomHeader date={date} decreaseMonth={decreaseMonth} increaseMonth={increaseMonth} />
      )}
    >
      <button className="datepicker-close-btn" onClick={cancelDatePicker}>
        닫기
      </button>
    </DatePicker>
  );
}

const CustomHeader = ({ date, decreaseMonth, increaseMonth }: any) => {
  // 10, 11, 12월은 0을 붙이지 않게 하기 위한 month 변수
  const month =
    getMonth(date) + 1 === 10 || getMonth(date) + 1 === 11 || getMonth(date) + 1 === 12
      ? getMonth(date) + 1
      : "0" + (getMonth(date) + 1).toString();

  return (
    <>
      <header className="pickerHeader">
        <button onClick={decreaseMonth}>
          <ChevronLt />
        </button>

        <p>
          {getYear(date)}.{month}
        </p>

        <button onClick={increaseMonth}>
          <ChevronRt />
        </button>
      </header>
    </>
  );
};
