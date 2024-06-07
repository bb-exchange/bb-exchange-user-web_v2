import styles from "./SuccessPopup.module.scss";

import React from "react";

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

export const SuccessPopup = ({
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

          <span className="h3 bold color-black1">
            {title &&
              title.split("\\n").map((item, index) => (
                <React.Fragment key={index}>
                  {item}
                  <br />
                </React.Fragment>
              ))}
          </span>

          <p className="p1 color-gray1">{subTitle}</p>
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
