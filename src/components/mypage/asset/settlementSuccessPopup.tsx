import styles from "./settlementSuccessPopup.module.scss";

import ContainedBtn from "@components/Buttons/ContainedBtn";
import Popup from "@components/Popup";

import UseMypageAsset from "@hooks/mypage/asset/useMypageAsset";

type SettlementSuccessPopupProps = {
  useMypageAsset: ReturnType<typeof UseMypageAsset>;
};
export default function SettlementSuccessPopup({ useMypageAsset }: SettlementSuccessPopupProps) {
  return (
    <Popup visible={useMypageAsset.settlementSuccess} style={{ maxWidth: 384 }}>
      <div className={styles.popupContainer}>
        <h3 className={styles.description}>출금 신청이 완료되었습니다.</h3>
        <div className={styles.listContainer}>
          <ul className={styles.list}>
            <li className={styles.item}>
              <div className={styles.label}>출금신청 금액</div>
              <div className={styles.content}>
                {Intl.NumberFormat().format(useMypageAsset.changePointValue)} 원
              </div>
            </li>
            <li className={styles.item}>
              <div className={styles.label}>예상 정산일</div>
              <div className={styles.content}>영업일 기준 3일 이내</div>
            </li>
          </ul>
        </div>
        <ContainedBtn
          text="확인"
          style={{ width: "100%" }}
          onClick={() => useMypageAsset.setSettlementSuccess(false)}
        />
      </div>
    </Popup>
  );
}
