import { D_draftsList } from ".src/data/enroll/D_enroll";
import styles from "./draftsPopup.module.scss";
import X from ".assets/icons/X.svg";
import CircleBangBlue from ".assets/bg/enroll/CircleBangBlue.svg";
import moment from "moment";
import { useRouter } from "next/router";

interface Iprops {
  useEnrollHook: any;
  off: Function;
}

export default function DraftsPopup({ useEnrollHook, off }: Iprops) {
  const router = useRouter();

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
      {router.query.draftsList === "true" ? (
        <ul className={styles.draftsList}>
          {D_draftsList.map((v, i) => (
            <li key={i} onClick={() => useEnrollHook.setLoadDraftPopup(true)}>
              <p className={styles.createdAt}>
                {moment(v.createdAt).format("YYYY.MM.DD")}
              </p>

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
