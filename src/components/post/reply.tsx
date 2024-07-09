import ConfirmPopup from "../common/popup/confirmPopup";
import ErrorMsgPopup from "../common/popup/errorMsgPopup";
import PopupBg from "../common/popupBg";
import ReplyMorePopup from "./replyMorePopup";
import ReportReplyPopup from "./reportReplyPopup";
import ReportUserPopup from "./reportUserPopup";

import styles from "./reply.module.scss";

import { useMemo, useState } from "react";

import Dot3 from ".assets/icons/Dot3.svg";
import ThumbUpGrey from ".assets/icons/ThumbUpGrey.svg";
import ThumbUpRed from ".assets/icons/ThumbUpRed.svg";
import Gold from ".assets/icons/tier/Gold.svg";
import Silver from ".assets/icons/tier/Silver.svg";
import { CommentData } from ".src/api/comments";
import UseReply from ".src/hooks/post/useReply";
import { isLoginState } from ".src/recoil";
import moment from "moment";
import { useRecoilValue } from "recoil";

interface Iprops {
  data: CommentData;
  isMyComment: boolean;
  nested?: boolean;
  hasOwnership?: boolean;
  onClickLikeComment: (props: { isLike: boolean; commentId: number }) => void;
  onClickUpdateComment: (props: { commentId: number; content: string }) => void;
  onClickDeleteComment: (commentId: number) => void;
  onClickCreateComment: (props: { parentCommentId: number; content: string }) => void;
}

export default function Reply({
  isMyComment,
  data: {
    userId,
    isDeleted,
    nickname,
    createdAt,
    content,
    isLike,
    likeCounts,
    gradeType,
    commentId,
    parentCommentId,
  },
  nested,
  hasOwnership = false,
  onClickLikeComment,
  onClickUpdateComment,
  onClickDeleteComment,
  onClickCreateComment,
}: Iprops) {
  const useReply = UseReply();

  const isLogin = useRecoilValue(isLoginState);

  // NOTE 댓글 수정 여부
  const [isEdit, setIsEdit] = useState<boolean>(false);

  // NOTE 대댓글 추가 여부
  const [newNested, setNewNested] = useState<boolean>(false);

  // NOTE 수정 댓글
  const [newComment, setNewComment] = useState<string>("");

  // NOTE 댓글 원본 멘션 분리
  const contentEl = useMemo(() => {
    const defaultObj = { mention: null, content };

    if (nested) {
      const contentArr = content.split(" ");
      const mention = contentArr.shift();

      if (mention?.startsWith("@"))
        return { mention: mention?.concat(" "), content: contentArr.join(" ") };
    }

    return defaultObj;
  }, [content, nested]);

  const mention = useMemo(
    () => (newNested ? `@${nickname}`.concat(" ") : contentEl.mention),
    [contentEl.mention, newNested, nickname],
  );

  // NOTE 댓글 유효성 체크
  const isValidComment = useMemo(
    () =>
      newComment.trim()
        ? newComment === `${mention ?? ""}${newNested ? "" : contentEl.content}`
          ? false
          : !!newComment.slice(mention ? mention.length : 0).trim()
        : false,
    [contentEl.content, mention, newComment, newNested],
  );

  // NOTE 댓글 수정 버튼 클릭 시
  const onClickEdit = () => {
    setNewComment(`${contentEl.mention ?? ""}${contentEl.content}`);
    setIsEdit(true);
  };

  // NOTE 대댓글 버튼 클릭 시
  const onClickAddNestedComment = () => {
    setNewComment(`@${nickname}`.concat(" ") ?? "");
    setNewNested(true);
  };

  // NOTE 입력받은 댓글
  const onChangeComment = (value: string) => {
    // NOTE 멘션있을 때 멘션 제거 방지
    if (mention != null && value.length < mention.length) {
      setNewComment(mention);
      return;
    }

    setNewComment(value);
  };

  // NOTE 댓글 작성 취소
  const onCancel = () => {
    setNewComment("");
    newNested ? setNewNested(false) : setIsEdit(false);
  };

  // NOTE 댓글 저장
  const onSubmit = () => {
    if (!isValidComment) return;

    if (isEdit) {
      onClickUpdateComment({ commentId, content: newComment });
      setIsEdit(false);
    } else {
      onClickCreateComment({
        parentCommentId: parentCommentId ?? commentId,
        content: newComment,
      });
      setNewNested(false);
    }

    setNewComment("");
  };

  return (
    <>
      <div className={`${styles.replyBox} ${nested ? styles.nested : ""}`}>
        {isDeleted ? (
          // NOTE 삭제된 댓글일 때
          <p className={styles.deleted}>삭제된 댓글입니다.</p>
        ) : (
          <>
            {/* NOTE 댓글 상단(사용자 정보) 영역 */}
            <div className={styles.replyTopBar}>
              <div className={styles.leftBox}>
                {/* NOTE 회원 등급 */}
                {gradeType === "MASTER" && <Gold />}
                {gradeType === "SEMI" && <Silver />}
                <p className={styles.nickname}>{nickname}</p>
              </div>

              <div className={styles.rightBox}>
                <p className={styles.time}>{moment(createdAt).format("YYYY.MM.DD")}</p>

                {/* NOTE 더보기 팝업 */}
                {isLogin && !newNested && !isEdit && (
                  <span className={styles.btnBox}>
                    <button className={styles.moreBtn} onClick={() => useReply.setMorePopup(true)}>
                      <Dot3 />
                    </button>

                    {useReply.morePopup && (
                      <>
                        <ReplyMorePopup
                          useReply={useReply}
                          isMyComment={isMyComment}
                          onClickEdit={() => {
                            onClickEdit();
                            useReply.setMorePopup(false);
                          }}
                          onClickDelete={() => {
                            onClickDeleteComment(commentId);
                            useReply.setMorePopup(false);
                          }}
                        />
                        <PopupBg off={() => useReply.setMorePopup(false)} />
                      </>
                    )}
                  </span>
                )}
              </div>
            </div>

            {/* NOTE 댓글 내용 영역 */}
            {isEdit ? (
              // NOTE 편집 모드
              <textarea
                ref={(ref) => {
                  if (ref?.style) {
                    ref.style.minHeight = "54px";
                    ref.style.height = "auto";
                    ref.style.height = `${ref?.scrollHeight}px`;
                    ref.style.maxHeight = "200px";
                  }
                }}
                value={newComment}
                onChange={({ target: { value } }) => onChangeComment(value)}
                rows={1}
                placeholder="댓글을 입력해주세요"
              />
            ) : (
              // NOTE 읽기 모드
              <div className={styles.contBox}>
                {!!contentEl.mention != null && <strong>{contentEl.mention}</strong>}
                {contentEl.content}
              </div>
            )}

            {/* NOTE 댓글 하단 영역 */}
            {isEdit ? (
              // NOTE 편집 모드
              <div className={styles.replyEdit}>
                <button className={styles.cancel} onClick={onCancel}>
                  취소
                </button>
                <button aria-disabled={!isValidComment} onClick={onSubmit}>
                  저장
                </button>
              </div>
            ) : (
              // NOTE 읽기 모드
              <div className={styles.replyBottomBar}>
                <div className={styles.leftBox}>
                  <button
                    className={`${styles.likeBtn} ${isLike ? styles.on : ""}`}
                    onClick={() => isLogin && onClickLikeComment({ isLike: !isLike, commentId })}
                    style={{ cursor: isLogin ? "pointer" : "default" }}
                  >
                    {isLike ? <ThumbUpRed /> : <ThumbUpGrey />}
                    <p className={styles.likeCount}>{likeCounts || 0}</p>
                  </button>
                  {isLogin && hasOwnership && (
                    <>
                      <p>・</p>

                      <button className={styles.setReplyBtn} onClick={onClickAddNestedComment}>
                        댓글달기
                      </button>
                    </>
                  )}
                </div>
              </div>
            )}
          </>
        )}
      </div>

      {newNested && (
        <div className={`${styles.replyBox} ${styles.nested}`}>
          <>
            {/* NOTE 댓글 입력창 */}
            <textarea
              ref={(ref) => {
                if (ref?.style) {
                  ref.style.minHeight = "54px";
                  ref.style.height = "auto";
                  ref.style.height = `${ref?.scrollHeight}px`;
                  ref.style.maxHeight = "200px";
                }
              }}
              value={newComment}
              onChange={({ target: { value } }) => onChangeComment(value)}
              rows={1}
              placeholder="댓글을 입력해주세요"
            />

            {/* NOTE 댓글 하단 영역 */}
            <div className={styles.replyEdit}>
              <button className={styles.cancel} onClick={onCancel}>
                취소
              </button>
              <button aria-disabled={!isValidComment} onClick={onSubmit}>
                입력
              </button>
            </div>
          </>
        </div>
      )}

      {useReply.reportReplyPopup && (
        <>
          <ReportReplyPopup
            off={() => useReply.setReportReplyPopup(false)}
            confirmFunc={useReply.onSuccessReportReply}
          />
          <PopupBg bg off={() => useReply.setReportReplyPopup(false)} />
        </>
      )}

      {useReply.reportUserPopup && (
        <>
          <ReportUserPopup
            userId={userId}
            off={() => useReply.setReportUserPopup(false)}
            confirmFunc={useReply.onSuccessReportUser}
          />
          <PopupBg bg off={() => useReply.setReportUserPopup(false)} />
        </>
      )}

      {useReply.hideUserPostPopup && (
        <>
          <ConfirmPopup
            title="이 사용자의 글을 숨기시겠어요?"
            content="이미 구매한 글을 제외하고 wooAng님의 게시글을 더는 보이지 않아요."
            confirmFunc={useReply.onSuccessHideUserPost}
            cancelFunc={() => useReply.setHideUserPostPopup(false)}
          />
          <PopupBg bg off={() => useReply.setHideUserPostPopup(false)} />
        </>
      )}

      {useReply.compReportPopup && (
        <>
          <ErrorMsgPopup
            msg="신고가 접수되었습니다."
            confirmFunc={() => useReply.setCompReportPopup(false)}
          />
          <PopupBg bg off={() => useReply.setCompReportPopup(false)} />
        </>
      )}

      {useReply.compHideUserPostPopup && (
        <>
          <ErrorMsgPopup
            msg={
              <>
                사용자 글의 숨김처리를
                <br /> 완료하였습니다.
              </>
            }
            confirmFunc={() => useReply.setCompHideUserPostPopup(false)}
          />
          <PopupBg bg off={() => useReply.setCompHideUserPostPopup(false)} />
        </>
      )}
    </>
  );
}
