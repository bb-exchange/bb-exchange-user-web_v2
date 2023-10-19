import { useState } from "react";
import moment, { Moment } from "moment";

export default function UseMyTermIncome() {
  const FORMAT = "YYYY.MM";

  const [selectedDate, setSelectedDate] = useState<Moment>(moment());
  const [noDrawPopup, setNoDrawPopup] = useState<boolean>(false);
  const [drawPopup, setDrawPopup] = useState<boolean>(false);

  const onNextDate = () => {
    setSelectedDate((prev) => prev.add(1, "M"));
  };

  const revenueList = [
    { date: "2023.10.11", point: 1000 },
    { date: "2023.11.12", point: 2000 },
  ];
  const totalPoint = revenueList.reduce((acc, cur) => acc + cur.point, 0);

  const onClickDraw = () => {
    if (totalPoint < 10000) setNoDrawPopup(true);
    else setDrawPopup(true);
  };

  return {
    FORMAT,
    revenueList,
    totalPoint,
    selectedDate,
    onNextDate,
    noDrawPopup,
    setNoDrawPopup,
    onClickDraw,
    drawPopup,
    setDrawPopup,
  };
}
