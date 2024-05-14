import styles from "./point.module.scss";
import CommonHeader from ".src/components/common/header/commonHeader";
import CommonFooter from ".src/components/common/commonFooter";
import UseMyPoint from ".src/hooks/mypage/useMyPoint";
import MypageNavAside from ".src/components/mypage/mypageNavAside";
import PageNav from ".src/components/common/pageNav";
import ScrollTopBtn from ".src/components/common/scrollTopBtn";
import { useRouter } from "next/router";
import { D_mypagePointCategoryList } from ".src/data/mypage/D_mypage";
import useGetMyProfile from ".src/hooks/common/useGetProfile";

export default function Point() {
  const router = useRouter();

  const useMyPoint = UseMyPoint();
  const { profile: myProfile } = useGetMyProfile();

  const DUMMY_POINT_LIST = [];

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
                {Intl.NumberFormat().format(myProfile?.settlementAmount)} P
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
              {D_mypagePointCategoryList.map((v, i) => (
                <li
                  key={i}
                  className={v === useMyPoint.category ? styles.on : ""}
                  onClick={() => useMyPoint.setCategory(v)}
                >
                  <p>{v}</p>
                </li>
              ))}
            </ul>

            {DUMMY_POINT_LIST.length ? (
              <>
                <ul className={styles.dataList}>
                  {/* TODO 포인트 API완료되면 연결 해야함 */}
                  <li></li>
                </ul>
                <PageNav />
              </>
            ) : (
              <div className={styles.noDataText}>검색 결과가 없습니다.</div>
            )}
            {/* <ul className={styles.dataList}>
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
            </ul> */}
          </article>
        </section>
      </main>

      <CommonFooter />

      <ScrollTopBtn />
    </>
  );
}
