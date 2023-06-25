import styles from "./asset.module.scss";
import CommonFooter from ".src/components/common/commonFooter";
import CommonHeader from ".src/components/common/header/commonHeader";
import MypageNavAside from ".src/components/mypage/mypageNavAside";
import UseMypageAsset from ".src/hooks/mypage/useMypageAsset";
import ChevronRt from ".assets/icons/ChevronRt.svg";
import ScrollTopBtn from ".src/components/common/scrollTopBtn";
import CustomDatePicker from ".src/components/common/CustomDatePicker";
import moment from "moment";
import PageNav from ".src/components/common/pageNav";

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

          <article className={styles.contArea}>
            <div className={styles.topBar}>
              <div className={styles.filterCont}>
                <p className={styles.key}>조회 기간</p>

                <div className={styles.pickerBox}>
                  <CustomDatePicker
                    date={useMypageAsset.startDate || new Date()}
                    setDate={useMypageAsset.setStartDate}
                  />
                </div>

                <p className={styles.slash}>~</p>

                <div className={styles.pickerBox}>
                  <CustomDatePicker
                    date={useMypageAsset.endDate || new Date()}
                    setDate={useMypageAsset.setEndDate}
                  />
                </div>

                <button className={styles.submitBtn} onClick={() => {}}>
                  조회
                </button>
              </div>

              <button className={styles.excelBtn} onClick={() => {}}>
                엑셀 다운로드
              </button>
            </div>

            <ul className={styles.dataList}>
              {useMypageAsset.revenuList.map((v, i) => (
                <li key={i}>
                  <div className={styles.termBox}>
                    {moment(v.startDate).format("YYYY.MM.DD")}~
                    {moment(v.endDate).format("YYYY.MM.DD")}
                  </div>
                  <p className={styles.amount}>
                    {Intl.NumberFormat().format(v.amount)} 원
                  </p>
                </li>
              ))}
            </ul>

            <PageNav />
          </article>
        </section>
      </main>

      <ScrollTopBtn />

      <CommonFooter />
    </>
  );
}
