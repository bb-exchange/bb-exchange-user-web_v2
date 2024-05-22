import styles from "./pointPopup.module.scss";

import { useState } from "react";

import cn from "classnames";

import ChevronDn from "@assets/icons/ChevronDn.svg";

import ContainedBtn from "@components/Buttons/ContainedBtn";
import Popup from "@components/Popup";

type PointPopupProps = {
  visible?: boolean;
  onClose?: () => void;
};
const MONEY_SUFFIX = "원";
const POINT_SUFFIX = "P";

export default function PointPopup({ visible, onClose }: PointPopupProps) {
  const [changePointValue, setChangePointValue] = useState("");

  return (
    <Popup title="포인트로 전환" visible={visible} onClose={onClose}>
      <div className={styles.settlementPopupContainer}>
        <div className={cn(styles.textWrapper, styles.mb24)}>
          <h3 className={styles.description}>수익금을 포인트로 전환하세요!</h3>
          <span className={styles.subDescription}>1원은 1p와 동일해요.</span>
        </div>

        <div className={styles.textWrapper}>
          <div className="p2 bold">
            출금 가능 수익금 <span className="p2">65,154원</span>
          </div>
          <input
            type="text"
            placeholder="얼마나 전환할까요?"
            // onChange={(e) => setChangePointValue(e.target.value)}
            value={changePointValue + MONEY_SUFFIX}
          />
        </div>
        <div className={cn(styles.buttonWrapper, styles.mt12)}>
          <button className={styles.flexibleLine}>+1,000원</button>
          <button className={styles.flexibleLine}>+3,000원</button>
          <button className={styles.flexibleLine}>+5,000원</button>
        </div>
        <div style={{ textAlign: "center", margin: "20px 0" }}>
          <ChevronDn />
        </div>
        <div className={styles.textWrapper}>
          <div className="p2 bold">
            잔여 포인트 <span className="p2">115p</span>
          </div>
          <input
            type="text"
            placeholder="얼마나 전환할까요?"
            // onChange={(e) => setChangePointValue(e.target.value)}
            value={changePointValue + POINT_SUFFIX}
          />
        </div>
        <span className="p2 color-primary1" style={{ margin: "8px 0", textAlign: "center" }}>
          <strong>1원</strong> 단위로 전환 가능해요.
        </span>
        <ContainedBtn text="전환하기" disabled />
      </div>
    </Popup>
  );
}
