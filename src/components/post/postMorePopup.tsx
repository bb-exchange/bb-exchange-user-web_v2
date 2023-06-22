import styles from "./postMorePopup.module.scss";

interface Iprops {
  useCustomHook: { [key: string]: any };
}

export default function PostMorePopup({ useCustomHook }: Iprops) {
  return (
    <section className={styles.postMorePopup}>
      <button onClick={useCustomHook.onClickReportPostBtn}>
        <p>글 신고하기</p>
      </button>
      <button onClick={useCustomHook.onClickReportUserBtn}>
        <p>사용자 신고하기</p>
      </button>
      <button onClick={() => {}}>
        <p>이 사용자의 글 보지 않기</p>
      </button>
    </section>
  );
}
