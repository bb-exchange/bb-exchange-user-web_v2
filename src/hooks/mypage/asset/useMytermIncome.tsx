import { useState } from "react";

export default function UseMyTermIncome() {
  const [dateText, setDateText] = useState<Date>(new Date());
  const [noDrawPopup, setNoDrawPopup] = useState<boolean>(false);
  const [drawPopup, setDrawPopup] = useState<boolean>(false);
  const [drawInfoPopup, setDrawInfoPopup] = useState<boolean>(false);
  // NOTE 임시 상태
  const [isAccount, setIsAccount] = useState<boolean>(false);

  const onNextDate = () => {
    const nextMonth = new Date(dateText);
    nextMonth.setMonth(nextMonth.getMonth() + 1);
    setDateText(nextMonth);
  };

  const onPrevDate = () => {
    const nextMonth = new Date(dateText);
    nextMonth.setMonth(nextMonth.getMonth() - 1);
    setDateText(nextMonth);
  };

  const options: any = { year: "numeric", month: "numeric" };
  const selectedDate = dateText.toLocaleDateString("ko-KR", options).slice(0, -1);

  // 더미데이타
  const revenueList = [
    { date: "2023.10.11", point: 1000 },
    { date: "2023.11.12", point: 2000 },
    // { date: "2023.11.13", point: 12000 },
  ];
  const totalPoint = revenueList.reduce((acc, cur) => acc + cur.point, 0);

  // NOTE 출금신청 버튼 클릭 시
  const onClickDraw = () => {
    if (isAccount) {
      if (totalPoint < 10000) setNoDrawPopup(true);
      else setDrawPopup(true);
    } else {
      if (totalPoint < 10000) setNoDrawPopup(true);
      else setDrawInfoPopup(true);
    }
  };

  return {
    revenueList,
    totalPoint,
    selectedDate,
    onNextDate,
    onPrevDate,
    noDrawPopup,
    setNoDrawPopup,
    onClickDraw,
    drawPopup,
    setDrawPopup,
    isAccount,
    drawInfoPopup,
    setDrawInfoPopup,
  };
}
