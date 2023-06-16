import styles from "./reply.module.scss";
import Gold from ".assets/icons/tier/Gold.svg";
import Silver from ".assets/icons/tier/Silver.svg";
import Dot3 from ".assets/icons/Dot3.svg";
import moment from "moment";
import ThumbUpRed from ".assets/icons/ThumbUpRed.svg";
import ThumbUpGrey from ".assets/icons/ThumbUpGrey.svg";

interface Iprops {
  data: Ireply;
  nested?: boolean;
}

export default function Reply({ data, nested }: Iprops) {
  return (
    <div className={`${styles.replyBox} ${nested ? styles.nested : ""}`}>
      {data.isDeleted ? (
        <p className={styles.deleted}>삭제된 댓글입니다.</p>
      ) : (
        <>
          <div className={styles.replyTopBar}>
            <div className={styles.leftBox}>
              {data.tier === "gold" && <Gold />}
              {data.tier === "silver" && <Silver />}
              <p className={styles.nickname}>{data.nickname}</p>
            </div>

            <div className={styles.rightBox}>
              <p className={styles.time}>
                {moment(data.createdAt).format("YYYY.MM.DD")}
              </p>

              <button className={styles.moreBtn} onClick={() => {}}>
                <Dot3 />
              </button>
            </div>
          </div>

          <p className={styles.contBox}>{data.text}</p>

          <div className={styles.replyBottomBar}>
            <div className={styles.leftBox}>
              <div className={styles.likeBox}>
                {data.isLiked ? <ThumbUpRed /> : <ThumbUpGrey />}
                <p className={styles.likeCount}>{data.likeCount || 0}</p>
              </div>
              ・
              <button className={styles.setReplyBtn} onClick={() => {}}>
                댓글달기
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
