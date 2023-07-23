import UseReply from ".src/hooks/post/useReply";
import styles from "./replyMorePopup.module.scss";

interface Iprops {
  useReply: ReturnType<typeof UseReply>;
}

export default function ReplyMorePopup({ useReply }: Iprops) {
  return (
    <section className={styles.replyMorePopup}>
      <button onClick={useReply.onClickReportReplyBtn}>
        <p>댓글 신고하기</p>
      </button>
      <button onClick={useReply.onClickReportUserBtn}>
        <p>사용자 신고하기</p>
      </button>
      <button onClick={useReply.setHideUserPostBtn}>
        <p>이 사용자의 글 보지 않기</p>
      </button>
    </section>
  );
}
