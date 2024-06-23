import styles from "./pointPopup.module.scss";

import cn from "classnames";

import ChevronDn from "@assets/icons/ChevronDn.svg";

import ContainedBtn from "@components/Buttons/ContainedBtn";
import Popup from "@components/Popup";

import useGetMyProfile from "@hooks/common/useGetProfile";
import UseMypageAsset from "@hooks/mypage/asset/useMypageAsset";

type PointPopupProps = {
  visible?: boolean;
  onClose?: () => void;
  useMypageAsset: ReturnType<typeof UseMypageAsset>;
};

export default function PointPopup({ visible, onClose, useMypageAsset }: PointPopupProps) {
  const { profile: myProfile } = useGetMyProfile();

  return (
    <Popup title="포인트로 전환" visible={visible} onClose={onClose} style={{ maxWidth: 580 }}>
      <div className={styles.settlementPopupContainer}>
        <div className={cn(styles.textWrapper, styles.mb24)}>
          <h3 className={styles.description}>수익금을 포인트로 전환하세요!</h3>
          <span className={styles.subDescription}>
            출금 가능 수익금 만큼 전환이 가능해요. (1원 = 1p)
          </span>
        </div>

        <div className={styles.textWrapper}>
          <div className="p2 bold">
            출금 가능 수익금{" "}
            <span className="p2">{Intl.NumberFormat().format(useMypageAsset.totalPoint)}원</span>
          </div>
          <input
            type="text"
            placeholder="얼마나 전환할까요?"
            onChange={useMypageAsset.onChange}
            value={useMypageAsset.changePointValue.toLocaleString()}
            onBlur={useMypageAsset.onBlur}
          />
        </div>
        <div className={cn(styles.buttonWrapper, styles.mt12)}>
          <button className={styles.flexibleLine} onClick={() => useMypageAsset.addPoint(1000)}>
            +1,000원
          </button>
          <button className={styles.flexibleLine} onClick={() => useMypageAsset.addPoint(3000)}>
            +3,000원
          </button>
          <button className={styles.flexibleLine} onClick={() => useMypageAsset.addPoint(5000)}>
            +5,000원
          </button>
        </div>
        <div style={{ textAlign: "center", margin: "20px 0" }}>
          <ChevronDn />
        </div>
        <div className={styles.textWrapper}>
          <div className="p2 bold">
            잔여 포인트 <span className="p2">{Intl.NumberFormat().format(myProfile.balance)}P</span>
          </div>
          <input
            type="text"
            placeholder="얼마나 전환할까요?"
            onChange={useMypageAsset.onChange}
            value={useMypageAsset.changePointValue.toLocaleString()}
            onBlur={useMypageAsset.onBlur}
          />
        </div>
        <span className="p2 color-primary1" style={{ margin: "8px 0", textAlign: "center" }}>
          <strong>1원</strong> 단위로 전환 가능해요.
        </span>
        <ContainedBtn
          text="전환하기"
          disabled={useMypageAsset.changePointValue <= 0}
          onClick={useMypageAsset.postPoint}
        />
      </div>
    </Popup>
  );
}
