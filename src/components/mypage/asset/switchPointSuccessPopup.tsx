import styles from "./switchPointSuccessPopup.module.scss";

import PurpleSet3 from "@assets/images/purple_set_3.png";

import ContainedBtn from "@components/Buttons/ContainedBtn";
import Popup from "@components/Popup";

import UseMypageAsset from "@hooks/mypage/asset/useMypageAsset";

type SwitchPointSuccessPopupProps = {
  useMypageAsset: ReturnType<typeof UseMypageAsset>;
};
export default function SwitchPointSuccessPopup({ useMypageAsset }: SwitchPointSuccessPopupProps) {
  return (
    <Popup visible={useMypageAsset.isSuccess} style={{ maxWidth: 312 }}>
      <div className={styles.popupContainer}>
        <img src={PurpleSet3.src} className={styles.successImage} />
        <h3 className="h3 bold color-black-3">
          {Intl.NumberFormat().format(useMypageAsset.changePointValue)}P 전환 완료
        </h3>
        <ContainedBtn
          text="완료"
          style={{ width: "100%" }}
          onClick={useMypageAsset.onCloseSuccessPopup}
        />
      </div>
    </Popup>
  );
}
