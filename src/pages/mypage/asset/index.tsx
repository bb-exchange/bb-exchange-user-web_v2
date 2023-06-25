import styles from "./asset.module.scss";
import CommonFooter from ".src/components/common/commonFooter";
import CommonHeader from ".src/components/common/header/commonHeader";
import MypageNavAside from ".src/components/mypage/mypageNavAside";
import UseMypageAsset from ".src/hooks/mypage/asset/useMypageAsset";
import ChevronRt from ".assets/icons/ChevronRt.svg";
import ScrollTopBtn from ".src/components/common/scrollTopBtn";
import TermIncome from ".src/components/mypage/asset/termIncome";
import ContentIncome from ".src/components/mypage/asset/contentIncome";
import MyWithdraw from ".src/components/mypage/asset/myWithdraw";

export default function Asset() {
  const useMypageAsset = UseMypageAsset();

  return (
    <>
      <CommonHeader />

      <main className={styles.asset}>
        <MypageNavAside />

        <section className={styles.contSec}>
          <article className={styles.thumbArea}>
            <ul className={styles.assetList}>
              <li>
                <p className={styles.key}>출금 가능 수익금</p>
                <p className={styles.value}>
                  {Intl.NumberFormat().format(22548564)}원
                </p>
              </li>

              <li>
                <p className={styles.key}>총 출금 완료 금액</p>
                <p className={styles.value}>
                  {Intl.NumberFormat().format(22548564)}원
                </p>
              </li>
            </ul>

            <div className={styles.actionCont}>
              <div className={styles.actionBox}>
                <p className={styles.limit}>10,000원 이상부터 출금 가능</p>

                <div className={styles.btnBar}>
                  <button className={styles.pointBtn} onClick={() => {}}>
                    포인트로 전환
                  </button>

                  <button className={styles.withdrawBtn} onClick={() => {}}>
                    출금신청
                  </button>
                </div>
              </div>

              <div className={styles.accountBox}>
                <button className={styles.accountBtn} onClick={() => {}}>
                  <p>출금 계좌 국민은행 999999********</p>
                  <ChevronRt />
                </button>
              </div>
            </div>
          </article>

          <ul className={styles.categoryList}>
            {useMypageAsset.categoryList.map((v, i) => (
              <li
                key={i}
                className={v === useMypageAsset.category ? styles.on : ""}
                onClick={() => useMypageAsset.setCategory(v)}
              >
                <p>{v}</p>
              </li>
            ))}
          </ul>

          {useMypageAsset.category === "기간별 수익금" && <TermIncome />}
          {useMypageAsset.category === "콘텐츠별 수익금" && <ContentIncome />}
          {useMypageAsset.category === "출금내역" && <MyWithdraw />}
        </section>
      </main>

      <ScrollTopBtn />

      <CommonFooter />
    </>
  );
}
