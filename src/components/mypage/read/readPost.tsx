import styles from "./readPost.module.scss";

import { useRouter } from "next/router";

import HeartGrey from ".assets/icons/HeartGrey.svg";
import HeartRedO from ".assets/icons/HeartRedO.svg";
import UseMyPageRead from ".src/hooks/mypage/useMypageRead";
import moment from "moment";
import "moment/locale/ko";

interface Iprops {
  data: any;
  index: number;
  useMypageRead: ReturnType<typeof UseMyPageRead>;
}

export default function ReadPost({ data, index, useMypageRead }: Iprops) {
  function getDiffStyle(diff: number) {
    if (diff > 0) return styles.up;
    else if (diff < 0) return styles.dn;
  }

  const router = useRouter();
  // NOTE 유저프로필 클릭 시 유저상세페이지로 연결
  const onMoveUserPage = () => {
    router.push({
      pathname: `/seller/${data.userInfo.userId}`,
      query: { userId: data.userInfo.userId },
    });
  };

  return (
    <li className={styles.readPost}>
      <div className={styles.leftCont}>
        <div className={styles.infoCont}>
          <div className={styles.thumbBox}>
            <div className={styles.titleBar}>
              <p className={styles.title}>{data.articleInfo.title}</p>

              <p className={styles.replyCount}>{`[${
                (data.articleInfo.commentNum || 0) > 99 ? `+99` : data.articleInfo.commentNum || 0
              }]`}</p>
            </div>

            <div className={styles.infoBar}>
              {data.priceInfo.purchasePrice ? (
                <span className={`${styles.feeBox} ${styles.on}`}>
                  <p>유료</p>
                </span>
              ) : (
                <span className={styles.feeBox}>
                  <p>무료</p>
                </span>
              )}
              <p className={styles.category}>{data.boardInfo.description}</p>・
              <p className={styles.creator} onClick={onMoveUserPage}>
                {data.userInfo.nickname}
              </p>
              ・<p className={styles.createdAt}>{moment(data.articleInfo.createdAt).fromNow()}</p>
            </div>
          </div>

          <ul className={styles.amountList}>
            <li>
              <p className={styles.key}>내가 구매한 가격</p>&nbsp;
              <p className={`${styles.value} ${styles.bold}`}>
                {data.priceInfo.purchasePrice || 0}P
              </p>
            </li>

            <li>
              <p className={styles.value}>
                {`(${Intl.NumberFormat().format(data.priceInfo.priceDifference || 0)}P 절약)`}
              </p>
            </li>
          </ul>
        </div>

        <div className={styles.thumbnailImgBox}>
          {data.articleInfo.thumbnail ? <img src={data.articleInfo.thumbnail} alt="" /> : null}
        </div>
      </div>

      <div className={styles.rightCont}>
        {data.priceInfo.price ? (
          <div className={`${styles.priceBox} ${getDiffStyle(data.priceInfo.changeRate || 0)}`}>
            <div className={styles.diffBox}>
              <p>
                {`${(data.priceInfo.changeRate || 0) > 0 ? "+" : ""}${
                  data.priceInfo.changeRate || 0
                }% (${data.priceInfo.changeAmount || 0})`}
              </p>
            </div>

            <h1 className={styles.price}>{`${new Intl.NumberFormat().format(
              data.priceInfo.price || 0,
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

        <button className={styles.likeBtn} onClick={() => useMypageRead.onClickLikeBtn(index)}>
          {data.articleInfo.interest ? <HeartRedO /> : <HeartGrey />}
        </button>
      </div>
    </li>
  );
}
