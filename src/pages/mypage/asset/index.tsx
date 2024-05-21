import styles from "./asset.module.scss";
import { Tooltip } from "react-tooltip";

import ChevronRt from ".assets/icons/ChevronRt.svg";
import CommonFooter from ".src/components/common/commonFooter";
import CommonHeader from ".src/components/common/header/commonHeader";
import ErrorMsgPopup from ".src/components/common/popup/errorMsgPopup";
import PopupBg from ".src/components/common/popupBg";
import ScrollTopBtn from ".src/components/common/scrollTopBtn";
import ContentIncome from ".src/components/mypage/asset/contentIncome";
import MyWithdraw from ".src/components/mypage/asset/myWithdraw";
import TermIncome from ".src/components/mypage/asset/termIncome";
import WithdrawInfoPopup from ".src/components/mypage/asset/withdrawInfoPopup";
import WithdrawPopup from ".src/components/mypage/asset/withdrawPopup";
import MypageNavAside from ".src/components/mypage/mypageNavAside";
import UseMypageAsset from ".src/hooks/mypage/asset/useMypageAsset";
import UseMyTermIncome from ".src/hooks/mypage/asset/useMytermIncome";
import UseWithdrawPopup from ".src/hooks/mypage/asset/useWithdrawPopup";
import RedCaution from ".assets/icons/RedCaution.svg";
import { useState } from "react";
import Popup from ".src/components/Popup";

export default function Asset() {
  const useMypageAsset = UseMypageAsset();
  const useWithdrawPopup = UseWithdrawPopup();
  const useMyTermIncome = UseMyTermIncome();

  const [isOpen, setIsOpen] = useState(false);
  const onOpenPointPopup = () => {
    console.log("tufgld");
    setIsOpen((prev) => !prev);
  };

  return (
    <>
      <CommonHeader />

      <main className={styles.asset}>
        <MypageNavAside />

        <section className={styles.contSec}>
          <article className={styles.thumbArea}>
            <ul className={styles.assetList}>
              <li>
                <p className={styles.key}>
                  출금 가능 수익금
                  <a id="tooltip-anchor">
                    <RedCaution />
                  </a>
                  <Tooltip
                    className={styles.tooltip}
                    anchorSelect="#tooltip-anchor"
                    render={() => (
                      <div className={styles.tooltipContent}>
                        판매 대금 확정 여부에 따라 ‘수익금’과
                        <br />
                        ‘출금 가능 수익금’에 차이가 있을 수 있어요.
                      </div>
                    )}
                    place="top-start"
                  />
                </p>
                <div className={styles.value}>
                  {Intl.NumberFormat().format(useMyTermIncome.totalPoint)} 원
                  <div className={styles.subText} onClick={onOpenPointPopup}>
                    포인트로 전환 <ChevronRt />
                  </div>
                </div>
              </li>

              <li>
                <p className={styles.key}>총 출금 완료 금액</p>
                <p className={styles.value}>{Intl.NumberFormat().format(0)} 원</p>
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
                <button className={styles.accountBtn} onClick={useMyTermIncome.onClickDraw}>
                  <p>
                    <strong>출금 계좌</strong>
                    {useMyTermIncome.isAccount ? "국민은행 999999********" : "미입력"}
                  </p>
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

          {useMypageAsset.category === "이벤트 수익금" && <TermIncome />}
          {useMypageAsset.category === "월별 수익금" && <TermIncome />}
          {useMypageAsset.category === "콘텐츠별 수익금" && <ContentIncome />}
          {useMypageAsset.category === "출금내역" && <MyWithdraw />}
        </section>
      </main>
      <ScrollTopBtn />
      <CommonFooter />
      {/* NOTE 출금하기 팝업 */}
      {useMyTermIncome.drawPopup && (
        <>
          <WithdrawPopup
            useWithdrawPopup={useWithdrawPopup}
            off={() => useMyTermIncome.setDrawPopup(false)}
          />
          <PopupBg bg off={() => useMyTermIncome.setDrawPopup(false)} />
        </>
      )}
      {/* NOTE 출금 정보 입력 팝업 */}
      {useMyTermIncome.drawInfoPopup && (
        <>
          <WithdrawInfoPopup off={() => useMyTermIncome.setDrawInfoPopup(false)} />
          <PopupBg bg off={() => useMyTermIncome.setDrawInfoPopup(false)} />
        </>
      )}
      {useWithdrawPopup.compPopup && (
        <>
          <ErrorMsgPopup
            msg={`${Intl.NumberFormat().format(useWithdrawPopup.watch("amount"))}원 출금 예정`}
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
                출금 신청은 최소 10,000원 이상부터
                <br />
                출금이 가능합니다.
              </>
            }
            confirmFunc={() => useMyTermIncome.setNoDrawPopup(false)}
          />
          <PopupBg bg off={() => useMyTermIncome.setNoDrawPopup(false)} />
        </>
      )}
      {isOpen && <Popup visible={isOpen}>gogogo</Popup>}
    </>
  );
}
