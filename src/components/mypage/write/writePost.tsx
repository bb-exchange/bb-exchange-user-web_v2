import Link from "next/link";
import UseWritePost from ".src/hooks/mypage/useWritePost";
import styles from "./writePost.module.scss";
import moment from "moment";
import "moment/locale/ko";

interface Iprops {
  data: any;
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
            <Link href={`/post/${data.articleInfo.articleId}`}>
              <div className={styles.titleBar}>
                <p
                  className={`${styles.title} ${
                    data.articleInfo.read ? styles.read : ""
                  }`}
                >
                  {data.articleInfo.title}
                </p>

                <p className={styles.replyCount}>{`[${
                  (data.replyCount || 0) > 99 ? `+99` : data.replyCount || 0
                }]`}</p>
              </div>
            </Link>

            <div className={styles.infoBar}>
              <p className={styles.category}>{data.boardInfo.description}</p>・
              <p className={styles.createdAt}>
                {moment(data.articleInfo.createdAt).fromNow()}
              </p>
            </div>
          </div>

          <ul className={styles.amountList}>
            <li>
              <p className={styles.key}>좋아요</p>&nbsp;
              <p className={styles.value}>
                {(data.priceInfo.likeNum || 0) > 999999
                  ? "999,999+"
                  : data.priceInfo.likeNum}
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
          {data.articleInfo.thumbnail ? (
            <img src={data.articleInfo.thumbnail} alt="" />
          ) : null}
        </div>
      </div>

      <div className={styles.rightCont}>
        {data.priceInfo.price ? (
          <div
            className={`${styles.priceBox} ${getDiffStyle(
              data.priceInfo.changeRate || 0
            )}`}
          >
            <div className={styles.diffBox}>
              <p>
                {`${(data.priceInfo.changeRate || 0) > 0 ? "+" : ""}${
                  data.priceInfo.changeRate || 0
                }% (${data.priceInfo.changeAmount || 0})`}
              </p>
            </div>

            <h1 className={styles.price}>{`${new Intl.NumberFormat().format(
              data.priceInfo.price || 0
            )} P`}</h1>
          </div>
        ) : (
          <div className={styles.notListedBox}>
            <div className={styles.likeCountBox}>
              <p>{`좋아요 ${data.priceInfo.likeNum || 0}개`}</p>
            </div>

            <p className={styles.notListed}>비상장</p>
          </div>
        )}

        {useWritePost.getStateComp({ styles, state: data.state })}
      </div>
    </li>
  );
}
