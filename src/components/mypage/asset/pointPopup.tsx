import styles from "./pointPopup.module.scss";

import { useState } from "react";

import { useMutation } from "@tanstack/react-query";
import cn from "classnames";

import ChevronDn from "@assets/icons/ChevronDn.svg";

import { postProfitToPoint } from "@api/mypage/settlement";

import ContainedBtn from "@components/Buttons/ContainedBtn";
import Popup from "@components/Popup";

type PointPopupProps = {
  visible?: boolean;
  onClose?: () => void;
};

const maxValue = 65154;

export default function PointPopup({ visible, onClose }: PointPopupProps) {
  const [changePointValue, setChangePointValue] = useState(0);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const validInputValue = Number(e.target.value.replace(/[^0-9]/g, ""));

    setChangePointValue(Number(validInputValue));
  };

  const onBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const validInputValue = Number(e.target.value.replaceAll(",", ""));

    let result;
    if (validInputValue >= maxValue) {
      result = maxValue;
    } else {
      result = validInputValue;
    }
    setChangePointValue(result);
  };

  const addPoint = (count: number) => {
    const point = Number(changePointValue);
    let result;
    if (point + count >= maxValue) {
      result = maxValue;
    } else {
      result = point + count;
    }
    setChangePointValue(result);
  };

  const onCheckMaximum = () => {};

  const { mutate: postPoint } = useMutation({
    mutationFn: () => postProfitToPoint({ amount: changePointValue }),
    onSuccess: () => {
      console.log("success");
    },
  });

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
            onChange={onChange}
            value={changePointValue.toLocaleString()}
            onBlur={onBlur}
          />
        </div>
        <div className={cn(styles.buttonWrapper, styles.mt12)}>
          <button className={styles.flexibleLine} onClick={() => addPoint(1000)}>
            +1,000원
          </button>
          <button className={styles.flexibleLine} onClick={() => addPoint(3000)}>
            +3,000원
          </button>
          <button className={styles.flexibleLine} onClick={() => addPoint(5000)}>
            +5,000원
          </button>
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
            onChange={onChange}
            value={changePointValue.toLocaleString()}
            onBlur={onBlur}
          />
        </div>
        <span className="p2 color-primary1" style={{ margin: "8px 0", textAlign: "center" }}>
          <strong>1원</strong> 단위로 전환 가능해요.
        </span>
        <ContainedBtn text="전환하기" disabled={changePointValue <= 0} onClick={postPoint} />
      </div>
    </Popup>
  );
}
