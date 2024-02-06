import styles from "./likePost.module.scss";
import moment from "moment";
import "moment/locale/ko";
import HeartRedO from ".assets/icons/HeartRedO.svg";
import BtnSqrChk from ".assets/icons/BtnSqrChk.svg";
import BtnSqrChkOn from ".assets/icons/BtnSqrChkOn.svg";
import UseMyPageLike from ".src/hooks/mypage/useMypageLike";

interface Iprops {
  data: any;
  index: number;
  useMypageLike: ReturnType<typeof UseMyPageLike>;
}

export default function LikePost({ data, index, useMypageLike }: Iprops) {
  function getDiffStyle(diff: number) {
    if (diff > 0) return styles.up;
    else if (diff < 0) return styles.dn;
  }

  return (
    <li className={styles.likePost}>
      <div className={styles.leftCont}>
        <div className={styles.infoCont}>
          <div className={styles.thumbBox}>
            <div className={styles.titleBar}>
              <p className={styles.title}>{data.articleInfo.title}</p>

              <p className={styles.replyCount}>{`[${
                (data.articleInfo.commentNum || 0) > 99
                  ? `+99`
                  : data.articleInfo.commentNum || 0
              }]`}</p>
            </div>

            <div className={styles.infoBar}>
              <p className={styles.category}>{data.boardInfo.description}</p>・
              <p className={styles.creator}>{data.userInfo.nickname}</p>・
              <p className={styles.createdAt}>
                {moment(data.articleInfo.createdAt).fromNow()}
              </p>
            </div>
          </div>
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

        {/* NOTE 편집기능 보류 */}
        {/* {useMypageLike.editMode ? (
          <button
            className={styles.selBtn}
            onClick={() => useMypageLike.onClickSelBtn(index)}
          >
            {data.sel ? <BtnSqrChkOn /> : <BtnSqrChk />}
          </button>
        ) : (
        )} */}
        <button className={styles.likeBtn} onClick={() => {}}>
          <HeartRedO />
        </button>
      </div>
    </li>
  );
}
