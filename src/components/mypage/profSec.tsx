import styles from "./profSec.module.scss";
import Gold from ".assets/icons/tier/Gold.svg";
import ChevronRtBlue from ".assets/icons/ChevronRtBlue.svg";
import { useRouter } from "next/router";
import useGetMyProfile from ".src/hooks/common/useGetProfile";

export default function ProfSec() {
  const router = useRouter();
  const myProfile = useGetMyProfile();

  return (
    <section className={styles.profSec}>
      <article className={styles.leftArea}>
        <button className={styles.profImgBtn} onClick={() => {}}></button>

        <div className={styles.infoCont}>
          <div className={styles.nicknameBar}>
            <h1 className={styles.nickname}>{myProfile?.nickname}</h1>
            <Gold />
          </div>

          <p className={styles.profMsg}>{myProfile?.description}</p>

          <ul className={styles.accountList}>
            <li>
              <p className={styles.key}>보유 포인트</p>

              <p className={styles.value}>
                {Intl.NumberFormat().format(myProfile?.balance)}
              </p>

              <button
                className={styles.detailBtn}
                onClick={() => router.push("/mypage/point")}
              >
                <ChevronRtBlue />
              </button>
            </li>

            <hr />

            <li>
              <p className={styles.key}>예상 정산금</p>

              <p className={styles.value}>
                {Intl.NumberFormat().format(myProfile?.withdrawableBalance)}
              </p>

              <button
                className={styles.detailBtn}
                onClick={() => router.push("/mypage/asset")}
              >
                <ChevronRtBlue />
              </button>
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
