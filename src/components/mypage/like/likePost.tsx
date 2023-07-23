import styles from "./likePost.module.scss";
import moment from "moment";
import "moment/locale/ko";
import HeartRedO from ".assets/icons/HeartRedO.svg";
import BtnSqrChk from ".assets/icons/BtnSqrChk.svg";
import BtnSqrChkOn from ".assets/icons/BtnSqrChkOn.svg";
import UseMyPageLike from ".src/hooks/mypage/useMypageLike";

interface Iprops {
  data: mypageLikePosts;
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
              <p className={styles.title}>{data.title}</p>

              <p className={styles.replyCount}>{`[${
                (data.replyCount || 0) > 99 ? `+99` : data.replyCount || 0
              }]`}</p>
            </div>

            <div className={styles.infoBar}>
              <p className={styles.category}>{data.category}</p>・
              <p className={styles.creator}>{data.creatorNickname}</p>・
              <p className={styles.createdAt}>
                {moment(data.createdAt).fromNow()}
              </p>
            </div>
          </div>
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

        {useMypageLike.editMode ? (
          <button
            className={styles.selBtn}
            onClick={() => useMypageLike.onClickSelBtn(index)}
          >
            {data.sel ? <BtnSqrChkOn /> : <BtnSqrChk />}
          </button>
        ) : (
          <button className={styles.likeBtn} onClick={() => {}}>
            <HeartRedO />
          </button>
        )}
      </div>
    </li>
  );
}
