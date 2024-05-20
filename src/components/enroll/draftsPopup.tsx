import styles from "./draftsPopup.module.scss";

import CircleBangBlue from ".assets/bg/enroll/CircleBangBlue.svg";
import X from ".assets/icons/X.svg";
import useEnroll from ".src/hooks/enroll/useEnroll";
import moment from "moment";

interface Iprops {
  useEnrollHook: ReturnType<typeof useEnroll>;
  off: Function;
}

export default function DraftsPopup({ useEnrollHook, off }: Iprops) {
  return (
    <section className={styles.draftsPopup}>
      <article className={styles.topBar}>
        <h1 className={styles.popupTitle}>
          임시저장 글{" "}
          <span className={styles.count}>{useEnrollHook.articleTempList?.data.length}</span>
        </h1>

        <button className={styles.closeBtn} onClick={() => off()}>
          <X />
        </button>
      </article>

      {useEnrollHook.articleTempList?.data.length ? (
        <ul className={styles.draftsList}>
          {useEnrollHook.articleTempList?.data.map((v: any, i: number) => (
            <li
              key={i}
              onClick={() => {
                useEnrollHook.setTempArticleId(v.articleId);
                useEnrollHook.setLoadDraftPopup(true);
              }}
            >
              <p className={styles.createdAt}>{moment(v.createdAt).format("YYYY.MM.DD")}</p>

              <div className={styles.contBox}>
                <p className={styles.title}>{v.title}</p>

                <button
                  className={styles.delBtn}
                  onClick={(e) => {
                    e.stopPropagation();
                    useEnrollHook.setTempArticleId(v.articleId);
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
