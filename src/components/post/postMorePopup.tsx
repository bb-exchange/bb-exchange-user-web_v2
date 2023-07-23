import usePost from ".src/hooks/post/usePost";
import styles from "./postMorePopup.module.scss";

interface Iprops {
  UsePost: ReturnType<typeof usePost>;
}

export default function PostMorePopup({ UsePost }: Iprops) {
  return (
    <section className={styles.postMorePopup}>
      <button onClick={UsePost.onClickReportPostBtn}>
        <p>글 신고하기</p>
      </button>
      <button onClick={UsePost.onClickReportUserBtn}>
        <p>사용자 신고하기</p>
      </button>
      <button onClick={UsePost.onClickHideUserPostBtn}>
        <p>이 사용자의 글 보지 않기</p>
      </button>
    </section>
  );
}
