import UsePostReport from ".src/hooks/post/usePostReport";
import styles from "./reportPostPopup.module.scss";
import X from ".assets/icons/X.svg";
import CheckCircle from ".assets/icons/CheckCircle.svg";
import CheckCircleBlueO from ".assets/icons/CheckCircleBlueO.svg";

interface Iprops {
  off: Function;
}

export default function ReportPostPopup({ off }: Iprops) {
  const useCustomHook = UsePostReport();

  return (
    <section className={styles.reportPostPopup}>
      <article className={styles.titleBar}>
        <h1 className={styles.title}>글 신고하기</h1>

        <button className={styles.exitBtn} onClick={() => off()}>
          <X />
        </button>
      </article>

      <article className={styles.contArea}>
        <div className={styles.topBar}>
          <h1 className={styles.key}>신고사유를 알려주세요!</h1>

          <p className={styles.explain}>
            타당한 근거 없이 신고된 내용은 관리자 확인 후 반영되지 않을 수
            있습니다.
          </p>
        </div>

        <div className={styles.reportCont}>
          <form>
            <ul className={styles.categoryList}>
              {useCustomHook.reportCategory.map((v, i) => (
                <li
                  key={i}
                  className={`${
                    v === useCustomHook.watch("category") ? styles.on : ""
                  }`}
                  onClick={() => useCustomHook.setValue("category", v)}
                >
                  <CheckCircle className={styles.offSvg} />
                  <CheckCircleBlueO className={styles.onSvg} />
                  <p>{v}</p>
                </li>
              ))}
            </ul>

            <textarea placeholder="신고 내용을 입력해주세요" />

            <button className={styles.submitBtn}>
              <p>신고하기</p>
            </button>
          </form>
        </div>
      </article>
    </section>
  );
}
