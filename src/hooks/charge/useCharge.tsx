import { useState } from "react";

import { D_chargeList } from ".src/data/charge/D_charge";

export default function UseCharge() {
  const chargeList: number[] = D_chargeList;

  const [resultPopupInfo, setResultPopupInfo] = useState({
    isShow: false,
    title: "",
    subTitle: "",
    confirmText: "",
  });

  return {
    chargeList,
    resultPopupInfo,
    setResultPopupInfo,
  };
}
