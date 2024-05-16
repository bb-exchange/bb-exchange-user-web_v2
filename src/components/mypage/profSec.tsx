import Image from ".src/components/Image";
import styles from "./profSec.module.scss";
import Profile from ".assets/images/img_profile.svg";
import { useRouter } from "next/router";
import useGetMyProfile from ".src/hooks/common/useGetProfile";
import IconCopy from ".assets/icons/Copy.svg";

export default function ProfSec() {
  const router = useRouter();
  const { profile: myProfile } = useGetMyProfile();

  return (
    <section className={styles.profSec}>
      <article className={styles.leftArea}>
        {myProfile?.profileImage ? (
          <Image
            src={myProfile?.profileImage}
            width={80}
            height={80}
            loader
            alt="profile image"
            className={styles.defaultProfImgBox}
          />
        ) : (
          <Profile className={styles.defaultProfImgBox} />
        )}

        <div className={styles.infoCont}>
          <div className={styles.nicknameBar}>
            <h1 className={styles.nickname}>{myProfile?.nickname}</h1>
            {/* NOTE - 기능 연결전 */}
            {/* <Gold /> */}
            <div className={styles.codeArea}>
              <span className={styles.textLine} />
              <div>추천인 코드</div>
              <div>{myProfile?.recommendCode}</div>
              <div
                onClick={() =>
                  navigator.clipboard.writeText(myProfile?.recommendCode)
                }
                className={styles.copyIcon}
              >
                <IconCopy />
              </div>
            </div>
          </div>

          <p className={styles.profMsg}>{myProfile?.description}</p>

          <ul className={styles.accountList}>
            <li>
              <p className={styles.key}>포인트</p>

              <p className={styles.value}>
                {Intl.NumberFormat().format(myProfile?.balance)}
              </p>

              {/* <button
                className={styles.detailBtn}
                onClick={() => router.push("/mypage/point")}
              >
                <ChevronRtBlue />
              </button> */}
            </li>

            <hr />

            <li>
              <p className={styles.key}>수익금</p>

              <p className={styles.value}>
                {Intl.NumberFormat().format(
                  myProfile?.expectedSettlementAmount
                )}
              </p>

              {/* <button
                className={styles.detailBtn}
                onClick={() => router.push("/mypage/asset")}
              >
                <ChevronRtBlue />
              </button> */}
            </li>
          </ul>
        </div>
      </article>

      <article className={styles.rightArea}>
        <button
          className={styles.profBtn}
          onClick={() => router.push("/mypage/edit_prof")}
        >
          <p>프로필 수정</p>
        </button>
      </article>
    </section>
  );
}
