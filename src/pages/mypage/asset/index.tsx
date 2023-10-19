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
import UseWithdrawPopup from ".src/hooks/mypage/asset/useWithdrawPopup";
import PopupBg from ".src/components/common/popupBg";
import WithdrawPopup from ".src/components/mypage/asset/withdrawPopup";
import ErrorMsgPopup from ".src/components/common/popup/errorMsgPopup";
import UseMyTermIncome from ".src/hooks/mypage/asset/useMytermIncome";

export default function Asset() {
  const useMypageAsset = UseMypageAsset();
  const useWithdrawPopup = UseWithdrawPopup();
  const useMyTermIncome = UseMyTermIncome();

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
                  <button
                    className={
                      useMyTermIncome.totalPoint < 10000
                        ? styles.deActiveWithdrawBtn
                        : styles.activeWithdrawBtn
                    }
                    onClick={useMyTermIncome.onClickDraw}
                  >
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

          {useMypageAsset.category === "월별 수익금" && <TermIncome />}
          {useMypageAsset.category === "콘텐츠별 수익금" && <ContentIncome />}
          {useMypageAsset.category === "출금내역" && <MyWithdraw />}
        </section>
      </main>
      <ScrollTopBtn />
      <CommonFooter />
      {useMyTermIncome.drawPopup && (
        <>
          <WithdrawPopup useWithdrawPopup={useWithdrawPopup} />
          <PopupBg bg off={() => useMyTermIncome.setDrawPopup(false)} />
        </>
      )}
      {useWithdrawPopup.compPopup && (
        <>
          <ErrorMsgPopup
            msg={`${Intl.NumberFormat().format(
              useWithdrawPopup.watch("amount")
            )}원 출금 예정`}
            subMsg={
              <>
                출금 신청이 완료되었습니다.
                <br />
                출금 신청된 금액은 다음주 수요일에
                <br />
                계좌로 입급됩니다.
              </>
            }
            confirmFunc={() => useWithdrawPopup.setCompPopup(false)}
          />

          <PopupBg bg off={() => useWithdrawPopup.setCompPopup(false)} />
        </>
      )}
      {useMyTermIncome.noDrawPopup && (
        <>
          <ErrorMsgPopup
            msg={<>출금 신청 요건 미충족</>}
            subMsg={
              <>
                출금 신청은 최소 10,000만원 이상부터
                <br />
                출금이 가능합니다.
              </>
            }
            confirmFunc={() => useMyTermIncome.setNoDrawPopup(false)}
          />
          <PopupBg bg off={() => useMyTermIncome.setNoDrawPopup(false)} />
        </>
      )}
    </>
  );
}
