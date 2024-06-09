import styles from "./registerAccountNumberSuccessPopup.module.scss";

import Shield from "@assets/images/shield.png";

import ContainedBtn from "@components/Buttons/ContainedBtn";
import Popup from "@components/Popup";

import UseMypageAsset from "@hooks/mypage/asset/useMypageAsset";

type RegisterAccountNumberSuccessPopupProps = {
  useMypageAsset: ReturnType<typeof UseMypageAsset>;
};
export default function RegisterAccountNumberSuccessPopup({
  useMypageAsset,
}: RegisterAccountNumberSuccessPopupProps) {
  return (
    <Popup visible={useMypageAsset.isRegisterAccountNumberSuccess} style={{ maxWidth: 384 }}>
      <div className={styles.popupContainer}>
        <img src={Shield.src} className={styles.successImage} />
        <h3 className={styles.description}>
          실명 정보 및 계좌 입력이
          <br />
          완료되었습니다
        </h3>
        <ContainedBtn
          text="완료"
          style={{ width: "100%" }}
          onClick={() => useMypageAsset.setIsRegisterAccountNumberSuccess(false)}
        />
      </div>
    </Popup>
  );
}
