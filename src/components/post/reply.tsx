import styles from "./reply.module.scss";
// import Gold from ".assets/icons/tier/Gold.svg";
// import Silver from ".assets/icons/tier/Silver.svg";
import Dot3 from ".assets/icons/Dot3.svg";
import moment from "moment";
import ThumbUpRed from ".assets/icons/ThumbUpRed.svg";
import ThumbUpGrey from ".assets/icons/ThumbUpGrey.svg";
import UseReply from ".src/hooks/post/useReply";
import PopupBg from "../common/popupBg";
import ReplyMorePopup from "./replyMorePopup";
import ConfirmPopup from "../common/popup/confirmPopup";
import ErrorMsgPopup from "../common/popup/errorMsgPopup";
import ReportUserPopup from "./reportUserPopup";
import ReportReplyPopup from "./reportReplyPopup";
import { isLoginState } from ".src/recoil";
import { useRecoilValue } from "recoil";
import { CommentData } from ".src/api/comments";
import { useMemo } from "react";

interface Iprops {
  // data: Ireply;
  data: CommentData;
  nested?: boolean;
}

export default function Reply({
  data: { isDeleted, nickname, createdAt, content, isLike, likeCounts },
  nested,
}: Iprops) {
  const useReply = UseReply();

  const isLogin = useRecoilValue(isLoginState);

  // NOTE 멘션 분리
  const contentEl = useMemo(() => {
    if (!nested) return { mention: null, content };

    const contentArr = content.split(" ");
    const mention = contentArr.shift();

    return { mention: mention?.concat(" "), content: contentArr.join(" ") };
  }, [content, nested]);

  return (
    <>
      <div className={`${styles.replyBox} ${nested ? styles.nested : ""}`}>
        {isDeleted ? (
          <p className={styles.deleted}>삭제된 댓글입니다.</p>
        ) : (
          <>
            <div className={styles.replyTopBar}>
              <div className={styles.leftBox}>
                {/* FIXME 정보 없음 */}
                {/* {data.tier === "gold" && <Gold />}
                {data.tier === "silver" && <Silver />} */}
                <p className={styles.nickname}>{nickname}</p>
              </div>

              <div className={styles.rightBox}>
                <p className={styles.time}>
                  {moment(createdAt).format("YYYY.MM.DD")}
                </p>

                {isLogin ? (
                  <span className={styles.btnBox}>
                    <button
                      className={styles.moreBtn}
                      onClick={() => useReply.setMorePopup(true)}
                    >
                      <Dot3 />
                    </button>

                    {useReply.morePopup && (
                      <>
                        <ReplyMorePopup useReply={useReply} />
                        <PopupBg off={() => useReply.setMorePopup(false)} />
                      </>
                    )}
                  </span>
                ) : null}
              </div>
            </div>

            <span className={styles.contBox}>
              {!!contentEl.mention != null && (
                <strong>{contentEl.mention}</strong>
              )}
              {contentEl.content}
            </span>

            <div className={styles.replyBottomBar}>
              <div className={styles.leftBox}>
                <button
                  className={`${styles.likeBtn} ${isLike ? styles.on : ""}`}
                  onClick={() => {}}
                >
                  {isLike ? <ThumbUpRed /> : <ThumbUpGrey />}
                  <p className={styles.likeCount}>{likeCounts || 0}</p>
                </button>

                <p>・</p>

                <button className={styles.setReplyBtn} onClick={() => {}}>
                  댓글달기
                </button>
              </div>
            </div>
          </>
        )}
      </div>

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
