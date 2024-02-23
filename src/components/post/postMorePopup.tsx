import UsePost from ".src/hooks/post/usePost";
import styles from "./postMorePopup.module.scss";

interface Iprops {
  UsePost: ReturnType<typeof UsePost>;
  isMyPost: boolean;
  isListed?: boolean;
  onClickSetPrivate: () => void;
  onClickEdit: () => void;
  onClickDelete: () => void;
}

export default function PostMorePopup({
  UsePost,
  isMyPost,
  isListed = false,
  onClickSetPrivate,
  onClickEdit,
  onClickDelete,
}: Iprops) {
  return (
    <section className={styles.postMorePopup}>
      {isMyPost ? (
        <>
          {isListed && (
            <button onClick={onClickSetPrivate}>
              <p>비공개로 전환</p>
            </button>
          )}
          <button onClick={onClickEdit}>
            <p>수정하기</p>
          </button>
          {!isListed && (
            <button onClick={onClickDelete}>
              <p>삭제하기</p>
            </button>
          )}
        </>
      ) : (
        <>
          <button onClick={UsePost.onClickReportPostBtn}>
            <p>글 신고하기</p>
          </button>
          <button onClick={UsePost.onClickReportUserBtn}>
            <p>사용자 신고하기</p>
          </button>
          <button onClick={UsePost.onClickHideUserPostBtn}>
            <p>이 사용자의 글 보지 않기</p>
          </button>
        </>
      )}
    </section>
  );
}
