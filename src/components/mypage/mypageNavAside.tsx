import styles from "./mypageNavAside.module.scss";
import Gold from ".assets/icons/tier/Gold.svg";
import ChevronRtBlue from ".assets/icons/ChevronRtBlue.svg";
import { useRouter } from "next/router";
import UseMypageNavAside from ".src/hooks/mypage/useMypageNavAside";

export default function MypageNavAside() {
  const router = useRouter();
  const useMypageNavAside = UseMypageNavAside();

  return (
    <aside className={styles.mypageNavAside}>
      <section className={styles.profSec}>
        <article className={styles.infoArea}>
          <div className={styles.profImgBox}></div>

          <div className={styles.nicknameBar}>
            <p>치은짱짱맨</p>
            <Gold />
          </div>

          <p className={styles.msg}>
            재테크, 투자, 자동차 전문가입니다. 12년간 7개의 은행, 증권사,
            투자은행을 다닌 경험이 있으며, 시드 2000천으로 현재 자산 58억 달성한
            모든 비법을 공유합니다. 다들 따라오세요!!! 가보자구욧~!~!
          </p>

          <ul className={styles.accountList}>
            <li>
              <p className={styles.key}>보유 포인트</p>

              <p className={styles.value}>{Intl.NumberFormat().format(0)}</p>

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
