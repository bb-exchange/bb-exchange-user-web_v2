import { D_alertList } from ".src/data/common/alert";
import styles from "./alertHoverPopup.module.scss";
import ArrowRight from "../../../../public/assets/icons/BlackArrowRight.svg";

const AlertHoverPopup = () => {
  return (
    <section className={styles.hoverArea}>
      <div className={styles.alertHoverPopup}>
        <div className={styles.title}>알림</div>
        <ul>
          {D_alertList.map(({ date, dataList }, idx) => (
            <div className={styles.sectionLine} key={idx}>
              <span>{date}</span>
              {dataList.map((ele, idx) => (
                <li key={idx}>
                  <section className={styles.topSection}>
                    {ele.isRead ? (
                      <span className={styles.isRead}>{ele.category}</span>
                    ) : (
                      <span className={styles.unRead}>{ele.category}</span>
                    )}
                    <span className={styles.alertTime}>{ele.time}</span>
                  </section>
                  <section className={styles.bottomSection}>
                    <p className={styles.content}>{ele.content}</p>
                    <p className={styles.gray}>{ele.description}</p>
                    {!!ele.description && <ArrowRight />}
                  </section>
                </li>
              ))}
            </div>
          ))}
        </ul>
        <div className={styles.allRead}>모두 읽음 처리하기</div>
      </div>
    </section>
  );
};

export default AlertHoverPopup;
