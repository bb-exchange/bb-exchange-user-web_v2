import styles from "./registerAccountNumberNecessityPopup.module.scss";

import Danger from "@assets/icons/Danger.svg";

import ContainedBtn from "@components/Buttons/ContainedBtn";
import Popup from "@components/Popup";

import UseMypageAsset from "@hooks/mypage/asset/useMypageAsset";

type RegisterAccountNumberNecessityPopupProps = {
  useMypageAsset: ReturnType<typeof UseMypageAsset>;
};
export default function RegisterAccountNumberNecessityPopup({
  useMypageAsset,
}: RegisterAccountNumberNecessityPopupProps) {
  return (
    <Popup visible={useMypageAsset.registerAccountNumberNecessity} style={{ maxWidth: 384 }}>
      <div className={styles.popupContainer}>
        <Danger />
        <h3 className={styles.title}>실명 정보 및 계좌 입력 필요</h3>
        <div className={styles.description}>
          출금신청을 위해서 최초 1회
          <br />
          실명 정보 및 계좌 입력을 완료해주세요.
        </div>
        <ContainedBtn
          text="입력하기"
          style={{ width: "100%" }}
          onClick={() => {
            useMypageAsset.onRegisterAccountNumberNecessityPopupClose();
            useMypageAsset.onRegisterAccountNumberPopupOpen();
          }}
        />
      </div>
    </Popup>
  );
}
