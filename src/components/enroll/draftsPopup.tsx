import { D_draftsList } from ".src/data/enroll/D_enroll";
import styles from "./draftsPopup.module.scss";
import X from ".assets/icons/X.svg";
import CircleBangBlue from ".assets/bg/enroll/CircleBangBlue.svg";
import { formatDate } from ".src/util/dateTIme";

interface Iprops {
  useEnrollHook: any;
  off: Function;
}

export default function DraftsPopup({ useEnrollHook, off }: Iprops) {
  return (
    <section className={styles.draftsPopup}>
      <article className={styles.topBar}>
        <h1 className={styles.popupTitle}>
          임시저장 글 <span className={styles.count}>8</span>
        </h1>

        <button className={styles.closeBtn} onClick={() => off()}>
          <X />
        </button>
      </article>

      {/* {D_draftsList.length > 0 ? ( */}
      {0 ? (
        <ul className={styles.draftsList}>
          {D_draftsList.map((v, i) => (
            <li key={i} onClick={() => useEnrollHook.setLoadDraftPopup(true)}>
              <p className={styles.createdAt}>{formatDate(v.createdAt)}</p>

              <div className={styles.contBox}>
                <p className={styles.title}>{v.title}</p>

                <button
                  className={styles.delBtn}
                  onClick={(e) => {
                    e.stopPropagation();
                    useEnrollHook.setDelDraftPopup(true);
                  }}
                >
                  삭제하기
                </button>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <span className={styles.nullBox}>
          <CircleBangBlue />

          <p className={styles.label}>등록된 임시저장글이 없습니다.</p>
        </span>
      )}
    </section>
  );
}
