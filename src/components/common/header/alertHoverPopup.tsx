import styles from "./alertHoverPopup.module.scss";

import cn from "classnames";

import ArrowRight from "@assets/icons/BlackArrowRight.svg";

import { D_alertList } from "@data/common/alert";

import usePushNotification from "@hooks/common/useNotification";

const AlertHoverPopup = () => {
  const hasReadAlram = D_alertList.every((data) => data.isRead);
  // const { fireNotification } = usePushNotification();

  return (
    <section className={styles.alertContainer}>
      <div className={styles.title}>알림</div>
      <ul>
        {D_alertList.map((ele, idx) => (
          <li key={idx}>
            <div className={styles.mainContainer}>
              <div className={styles.topSection}>
                <span className={cn(styles.chip, { [styles.active]: !ele.isRead })}>
                  {ele.category}
                </span>
                <span className={styles.time}>{ele.time}</span>
              </div>
              <div className={styles.bottomSection}>
                <p className={styles.content}>{ele.content}</p>
                <p className={styles.description}>{ele.description}</p>
              </div>
            </div>
            {!!ele.description && <ArrowRight />}
          </li>
        ))}
      </ul>
      <button className={styles.textButton} disabled={hasReadAlram}>
        모두 읽음 처리하기
      </button>
    </section>
  );
};

export default AlertHoverPopup;
