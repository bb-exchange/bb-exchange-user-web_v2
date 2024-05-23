import styles from "./reportPostPopup.module.scss";

import CheckCircle from ".assets/icons/CheckCircle.svg";
import CheckCircleBlueO from ".assets/icons/CheckCircleBlueO.svg";
import X from ".assets/icons/X.svg";
import UseScrollBar from ".src/hooks/common/useScrollBar";
import UsePostReport from ".src/hooks/post/usePostReport";

interface Iprops {
  off: Function;
  confirmFunc: Function;
}

export default function ReportPostPopup({ off }: Iprops) {
  const useCustomHook = UsePostReport();
  const useScrollBar = UseScrollBar();

  function onSubmit() {
    useCustomHook.onSubmit();
    off();
  }

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
            타당한 근거 없이 신고된 내용은 관리자 확인 후 반영되지 않을 수 있습니다.
          </p>
        </div>

        <div className={styles.reportCont}>
          <form onSubmit={useCustomHook.handleSubmit(onSubmit)}>
            <div className={styles.scrollBox}>
              <ul className={styles.categoryList} onScroll={useScrollBar.onScroll}>
                {useCustomHook.reportCategory.map((v, i) => (
                  <li
                    key={i}
                    className={`${v === useCustomHook.watch("category") ? styles.on : ""}`}
                    onClick={() => useCustomHook.setValue("category", v)}
                  >
                    <CheckCircle className={styles.offSvg} />
                    <CheckCircleBlueO className={styles.onSvg} />
                    <p>{v}</p>
                  </li>
                ))}
              </ul>

              <div
                ref={useScrollBar.scrollBarRef}
                className={styles.scrollBar}
                style={{ top: useScrollBar.scrollTop }}
              />
            </div>

            <textarea
              placeholder="신고 내용을 입력해주세요"
              {...useCustomHook.register("detail", { required: true })}
            />

            <button className={styles.submitBtn} disabled={!useCustomHook.formState.isValid}>
              <p>신고하기</p>
            </button>
          </form>
        </div>
      </article>
    </section>
  );
}
