import styles from "./readPost.module.scss";
import moment from "moment";
import "moment/locale/ko";
import HeartGrey from ".assets/icons/HeartGrey.svg";
import HeartRedO from ".assets/icons/HeartRedO.svg";
import UseMyPageRead from ".src/hooks/mypage/useMypageRead";

interface Iprops {
  data: mypageReadPosts;
  index: number;
  useMypageRead: ReturnType<typeof UseMyPageRead>;
}

export default function ReadPost({ data, index, useMypageRead }: Iprops) {
  function getDiffStyle(diff: number) {
    if (diff > 0) return styles.up;
    else if (diff < 0) return styles.dn;
  }

  return (
    <li className={styles.readPost}>
      <div className={styles.leftCont}>
        <div className={styles.infoCont}>
          <div className={styles.thumbBox}>
            <div className={styles.titleBar}>
              <p className={styles.title}>{data.title}</p>

              <p className={styles.replyCount}>{`[${
                (data.replyCount || 0) > 99 ? `+99` : data.replyCount || 0
              }]`}</p>
            </div>

            <div className={styles.infoBar}>
              {data.fee ? (
                <span className={`${styles.feeBox} ${styles.on}`}>
                  <p>유료</p>
                </span>
              ) : (
                <span className={styles.feeBox}>
                  <p>무료</p>
                </span>
              )}
              <p className={styles.category}>{data.category}</p>・
              <p className={styles.creator}>{data.creatorNickname}</p>・
              <p className={styles.createdAt}>
                {moment(data.createdAt).fromNow()}
              </p>
            </div>
          </div>

          <ul className={styles.amountList}>
            <li>
              <p className={styles.key}>내가 구매한 가격</p>&nbsp;
              <p className={`${styles.value} ${styles.bold}`}>
                {data.paid || 0}P
              </p>
            </li>

            <li>
              <p className={styles.value}>
                {`(${Intl.NumberFormat().format(data.saved || 0)}P 절약)`}
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

        <button
          className={styles.likeBtn}
          onClick={() => useMypageRead.onClickLikeBtn(index)}
        >
          {data.like ? <HeartRedO /> : <HeartGrey />}
        </button>
      </div>
    </li>
  );
}
