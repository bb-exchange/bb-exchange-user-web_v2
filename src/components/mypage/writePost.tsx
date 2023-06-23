import UseWritePost from ".src/hooks/mypage/useWritePost";
import styles from "./writePost.module.scss";
import moment from "moment";
import "moment/locale/ko";

interface Iprops {
  data: mypageWritePosts;
}

export default function WritePost({ data }: Iprops) {
  const useWritePost = UseWritePost();

  function getDiffStyle(diff: number) {
    if (diff > 0) return styles.up;
    else if (diff < 0) return styles.dn;
  }

  return (
    <li className={styles.writePost}>
      <div className={styles.leftCont}>
        <div className={styles.infoCont}>
          <div className={styles.thumbBox}>
            <div className={styles.titleBar}>
              <p className={`${styles.title} ${data.read ? styles.read : ""}`}>
                {data.title}
              </p>

              <p className={styles.replyCount}>{`[${
                (data.replyCount || 0) > 99 ? `+99` : data.replyCount || 0
              }]`}</p>
            </div>

            <div className={styles.infoBar}>
              <p className={styles.category}>{data.category}</p>・
              <p className={styles.createdAt}>
                {moment(data.createdAt).fromNow()}
              </p>
            </div>
          </div>

          <ul className={styles.amountList}>
            <li>
              <p className={styles.key}>좋아요</p>&nbsp;
              <p className={styles.value}>
                {(data.likeCount || 0) > 999999 ? "999,999+" : data.likeCount}
              </p>
            </li>

            <li>
              <p className={styles.key}>총수익</p>&nbsp;
              <p className={styles.value}>
                {`${Intl.NumberFormat().format(data.revenue || 0)}원`}
              </p>
            </li>
          </ul>
        </div>

        <div className={styles.thumbnailImgBox}>
          {data.thumbnailUrl ? <img src={data.thumbnailUrl} alt="" /> : null}
        </div>
      </div>

      <div className={styles.rightCont}>
        {data.price ? (
          <div
            className={`${styles.priceBox} ${getDiffStyle(
              data.percentOfChange || 0
            )}`}
          >
            <div className={styles.diffBox}>
              <p>
                {`${(data.percentOfChange || 0) > 0 ? "+" : ""}${
                  data.percentOfChange || 0
                }% (${data.amountOfChange || 0})`}
              </p>
            </div>

            <h1 className={styles.price}>{`${new Intl.NumberFormat().format(
              data.price || 0
            )} P`}</h1>
          </div>
        ) : (
          <div className={styles.notListedBox}>
            <div className={styles.likeCountBox}>
              <p>{`좋아요 ${data.likeCount || 0}개`}</p>
            </div>

            <p className={styles.notListed}>비상장</p>
          </div>
        )}

        {useWritePost.getStateComp({ styles, state: data.state })}
      </div>
    </li>
  );
}
