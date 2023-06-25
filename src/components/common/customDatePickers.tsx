import { getMonth, getYear } from "date-fns";
import DatePicker from "react-datepicker";
import ko from "date-fns/locale/ko";
import "react-datepicker/dist/react-datepicker.css";
import ChevronLt from ".assets/icons/ChevronLt.svg";
import ChevronRt from ".assets/icons/ChevronRt.svg";

interface IProps {
  date: Date;
  setDate: Function;
}

export default function CustomDatePicker({ date, setDate }: IProps) {
  return (
    <DatePicker
      className="customPickerInput"
      popperClassName="customPickerPopper"
      locale={ko}
      selected={date}
      onChange={(d: Date) => setDate(d)}
      dateFormat="yyyy.MM.dd"
      renderCustomHeader={({ date, increaseMonth, decreaseMonth }) => (
        <CustomHeader
          date={date}
          decreaseMonth={decreaseMonth}
          increaseMonth={increaseMonth}
        />
      )}
    />
  );
}

const CustomHeader = ({ date, decreaseMonth, increaseMonth }: any) => {
  // 10, 11, 12월은 0을 붙이지 않게 하기 위한 month 변수
  const month =
    getMonth(date) + 1 === 10 ||
    getMonth(date) + 1 === 11 ||
    getMonth(date) + 1 === 12
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
