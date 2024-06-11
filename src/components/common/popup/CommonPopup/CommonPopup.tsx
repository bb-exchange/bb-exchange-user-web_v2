import styles from "./commonPopup.module.scss";

import Image from "@components/Image";
import Popup from "@components/Popup";

interface Iprops {
  title: string;
  subTitle?: string;
  iconSrc?: string;
  iconWidth?: number;
  iconHeight?: number;
  confirmText?: string;
  confirmFunc: Function;
  zIndex?: number;
}

// 팝업 가로 크기
const POPUP_MAX_WIDTH = 280;

export const CommonPopup = ({
  title,
  subTitle,
  iconSrc,
  iconWidth = 70,
  iconHeight = 70,
  confirmText = "확인",
  confirmFunc,
  zIndex,
}: Iprops) => {
  return (
    <Popup visible={true} style={{ maxWidth: POPUP_MAX_WIDTH }}>
      <div className={styles.successPopupContainer} style={{ zIndex }}>
        <section className={styles.contentSection}>
          {iconSrc && (
            <Image src={iconSrc} width={iconWidth} height={iconHeight} alt={"PopupIcon"} />
          )}

          <span className="h3 bold color-black1" dangerouslySetInnerHTML={{ __html: title }} />

          {subTitle && (
            <p className="p1 color-gray1" dangerouslySetInnerHTML={{ __html: subTitle }} />
          )}
        </section>

        <section className={styles.buttonSection}>
          <button className="p1 bold bg-primary1 color-white1" onClick={() => confirmFunc()}>
            {confirmText}
          </button>
        </section>
      </div>
    </Popup>
  );
};
