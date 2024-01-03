import UseReply from ".src/hooks/post/useReply";
import styles from "./replyMorePopup.module.scss";

interface Iprops {
  useReply: ReturnType<typeof UseReply>;
  isMyComment: boolean;
  onClickDelete: () => void;
}

export default function ReplyMorePopup({
  useReply,
  isMyComment,
  onClickDelete,
}: Iprops) {
  return (
    <section className={styles.replyMorePopup}>
      {isMyComment ? (
        <>
          <button onClick={() => {}}>
            <p>수정하기</p>
          </button>
          <button onClick={onClickDelete}>
            <p>삭제하기</p>
          </button>
        </>
      ) : (
        <>
          <button onClick={useReply.onClickReportReplyBtn}>
            <p>댓글 신고하기</p>
          </button>
          <button onClick={useReply.onClickReportUserBtn}>
            <p>사용자 신고하기</p>
          </button>
          <button onClick={useReply.setHideUserPostBtn}>
            <p>이 사용자의 글 보지 않기</p>
          </button>
        </>
      )}
    </section>
  );
}
