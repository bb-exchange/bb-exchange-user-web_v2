import styles from "./point.module.scss";
import CommonHeader from ".src/components/common/header/commonHeader";
import CommonFooter from ".src/components/common/commonFooter";
import UseMyPoint from ".src/hooks/mypage/useMyPoint";
import MypageNavAside from ".src/components/mypage/mypageNavAside";
import PageNav from ".src/components/common/pageNav";
import ScrollTopBtn from ".src/components/common/scrollTopBtn";
import moment from "moment";
import { useRouter } from "next/router";

export default function Point() {
  const router = useRouter();

  const useMyPoint = UseMyPoint();

  function getDiffStyle(diff: number) {
    if (diff > 0) return styles.up;
    else if (diff < 0) return styles.dn;
  }

  return (
    <>
      <CommonHeader />

      <main className={styles.pointMain}>
        <MypageNavAside />

        <section className={styles.contSec}>
          <article className={styles.thumbArea}>
            <div className={styles.leftBox}>
              <h2 className={styles.key}>보유 포인트 조회</h2>

              <h1 className={styles.value}>
                {Intl.NumberFormat().format(0)} P
              </h1>
            </div>

            <div className={styles.rightBox}>
              <button
                className={styles.chargeBtn}
                onClick={() => router.push("/charge")}
              >
                충전하기
              </button>
            </div>
          </article>

          <article className={styles.contArea}>
            <ul className={styles.categoryList}>
              {useMyPoint.categoryList.map((v, i) => (
                <li
                  key={i}
                  className={v === useMyPoint.category ? styles.on : ""}
                  onClick={() => useMyPoint.setCategory(v)}
                >
                  <p>{v}</p>
                </li>
              ))}
            </ul>

            <ul className={styles.dataList}>
              {useMyPoint.dataList.map((v, i) => (
                <li key={i}>
                  <div className={styles.leftBox}>
                    <div className={styles.termBox}>
                      {moment(v.startDate).format("YYYY.MM.DD")}~
                      {moment(v.endDate).format("YYYY.MM.DD")}
                    </div>

                    <p className={styles.category}>{v.category}</p>
                  </div>

                  <div className={styles.rightBox}>
                    <p
                      className={`${styles.amount} ${getDiffStyle(
                        v.amount || 0
                      )}`}
                    >
                      {`${
                        (v.amount || 0) > 0 ? "+" : ""
                      }${Intl.NumberFormat().format(v.amount)} P`}
                    </p>
                  </div>
                </li>
              ))}
            </ul>

            <PageNav inlinePage />
          </article>
        </section>
      </main>

      <CommonFooter />

      <ScrollTopBtn />
    </>
  );
}
