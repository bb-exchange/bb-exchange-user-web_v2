import styles from "./commonPopup.module.scss";

import Image from "@components/Image";
import Popup from "@components/Popup";

interface Iprops {
  title?: string;
  subTitle?: string;
  iconSrc?: string;
  iconWidth?: number;
  iconHeight?: number;
  positiveButtonText?: string;
  onPositiveButtonClick?: Function;
  nagativeButtonText?: string;
  onNagativeButtonClick?: Function;
  zIndex?: number;
}

// 팝업 가로 크기
const POPUP_MAX_WIDTH = 312;

const CommonPopup = ({
  title,
  subTitle,
  iconSrc,
  iconWidth = 70,
  iconHeight = 70,
  positiveButtonText = "확인",
  onPositiveButtonClick,
  nagativeButtonText = "취소",
  onNagativeButtonClick,
  zIndex,
}: Iprops) => (
  <Popup visible={true} style={{ maxWidth: POPUP_MAX_WIDTH }}>
    <div className={styles.successPopupContainer} style={{ zIndex }}>
      <section className={styles.contentSection}>
        {iconSrc && <Image src={iconSrc} width={iconWidth} height={iconHeight} alt={"PopupIcon"} />}

        {title && (
          <span className="h3 bold color-black1" dangerouslySetInnerHTML={{ __html: title }} />
        )}

        {subTitle && (
          <p className="p1 color-gray1" dangerouslySetInnerHTML={{ __html: subTitle }} />
        )}
      </section>

      <section className={styles.buttonSection}>
        {onNagativeButtonClick && (
          <button className="p1 bold bg-gray2 color-gray1" onClick={() => onNagativeButtonClick()}>
            {nagativeButtonText}
          </button>
        )}
        {onPositiveButtonClick && (
          <button
            className="p1 bold bg-primary1 color-white1"
            onClick={() => onPositiveButtonClick()}
          >
            {positiveButtonText}
          </button>
        )}
      </section>
    </div>
  </Popup>
);

export default CommonPopup;
