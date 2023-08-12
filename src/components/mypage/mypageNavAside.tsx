import styles from "./mypageNavAside.module.scss";
import Gold from ".assets/icons/tier/Gold.svg";
import ChevronRtBlue from ".assets/icons/ChevronRtBlue.svg";
import { useRouter } from "next/router";
import UseMypageNavAside from ".src/hooks/mypage/useMypageNavAside";
import useGetMyProfile from ".src/hooks/common/useGetProfile";

export default function MypageNavAside() {
  const router = useRouter();
  const useMypageNavAside = UseMypageNavAside();
  const profile = useGetMyProfile();

  return (
    <aside className={styles.mypageNavAside}>
      <section className={styles.profSec}>
        <article className={styles.infoArea}>
          <div className={styles.profImgBox}></div>

          <div className={styles.nicknameBar}>
            <p>{profile?.nickname}</p>
            <Gold />
          </div>

          <p className={styles.msg}>{profile?.description}</p>

          <ul className={styles.accountList}>
            <li>
              <p className={styles.key}>보유 포인트</p>

              <p className={styles.value}>
                {Intl.NumberFormat().format(profile?.balance)}
              </p>

              <button
                className={styles.detailBtn}
                onClick={() => router.push("/mypage/point")}
              >
                <ChevronRtBlue />
              </button>
            </li>
          </ul>
        </article>

        <article className={styles.actionBar}>
          <button
            className={styles.editBtn}
            onClick={() => router.push("/mypage/edit_prof")}
          >
            <p>프로필 수정</p>
          </button>
        </article>
      </section>

      <section className={styles.navSec}>
        <h4 className={styles.secTitle}>마이페이지</h4>

        <hr />

        <nav>
          <ul className={styles.navList}>
            {useMypageNavAside.navList.map((v, i) => (
              <li key={i}>
                <div
                  className={`${styles.category} ${v.url ? styles.router : ""}`}
                  onClick={() => v.url && router.push(v.url)}
                >
                  {v.label}
                </div>

                {v.details && (
                  <ul className={styles.details}>
                    {v.details.map((detV, detI) => (
                      <li
                        key={detI}
                        className={detV.url ? styles.router : ""}
                        onClick={() => detV.url && router.push(detV.url)}
                      >
                        <p>{detV.label}</p>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </nav>
      </section>
    </aside>
  );
}
