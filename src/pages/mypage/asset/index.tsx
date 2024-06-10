import styles from "./asset.module.scss";

import { Tooltip } from "react-tooltip";

import ChevronRt from "@assets/icons/ChevronRt.svg";
import RedCaution from "@assets/icons/RedCaution.svg";
import PurpleSet3 from "@assets/images/purple_set_3.png";

import ContainedBtn from "@components/Buttons/ContainedBtn";
import CommonFooter from "@components/common/commonFooter";
import CommonHeader from "@components/common/header/commonHeader";
import ErrorMsgPopup from "@components/common/popup/errorMsgPopup";
import PopupBg from "@components/common/popupBg";
import ScrollTopBtn from "@components/common/scrollTopBtn";
import PointPopup from "@components/mypage/asset/pointPopup";
import WithdrawInfoPopup from "@components/mypage/asset/withdrawInfoPopup";
import WithdrawPopup from "@components/mypage/asset/withdrawPopup";
import MypageNavAside from "@components/mypage/mypageNavAside";
import Popup from "@components/Popup";

import UseMypageAsset from "@hooks/mypage/asset/useMypageAsset";
import UseMyTermIncome from "@hooks/mypage/asset/useMytermIncome";
import UseWithdrawPopup from "@hooks/mypage/asset/useWithdrawPopup";

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
                  {Intl.NumberFormat().format(useMypageAsset.totalPoint)} 원
                  <div className={styles.subText} onClick={useMypageAsset.onOpenPointPopup}>
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
                      useMypageAsset.totalPoint < 10000
                        ? styles.deActiveWithdrawBtn
                        : styles.activeWithdrawBtn
                    }
                    onClick={useMypageAsset.onClickDraw}
                  >
                    출금신청
                  </button>
                </div>
              </div>

              <div className={styles.accountBox}>
                <button className={styles.accountBtn} onClick={useMypageAsset.onClickDraw}>
                  <p>
                    <strong>출금 계좌</strong>
                    {useMypageAsset.isAccount ? "국민은행 999999********" : "미입력"}
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

          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginTop: 30,
            }}
          >
            <div
              style={{
                textAlign: "center",
                padding: "18px 24px",
                color: "#9F9F9F",
                width: 300,
              }}
            >
              해당 기능은 아직 개발중입니다.
              <br />
              빠른 시일내에 업데이트 하겠습니다.
            </div>
          </div>
          {/* {useMypageAsset.category === "이벤트 수익금" && <TermIncome />}
          {useMypageAsset.category === "월별 수익금" && <TermIncome />}
          {useMypageAsset.category === "콘텐츠별 수익금" && <ContentIncome />}
          {useMypageAsset.category === "출금내역" && <MyWithdraw />} */}
        </section>
      </main>
      <ScrollTopBtn />
      <CommonFooter />
      {/* NOTE 출금하기 팝업 */}
      {useMypageAsset.drawPopup && (
        <>
          <WithdrawPopup
            useWithdrawPopup={useWithdrawPopup}
            off={() => useMypageAsset.setDrawPopup(false)}
          />
          <PopupBg bg off={() => useMypageAsset.setDrawPopup(false)} />
        </>
      )}
      {/* NOTE 출금 정보 입력 팝업 */}
      {useMypageAsset.drawInfoPopup && (
        <>
          <WithdrawInfoPopup off={() => useMypageAsset.setDrawInfoPopup(false)} />
          <PopupBg bg off={() => useMypageAsset.setDrawInfoPopup(false)} />
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
      {useMypageAsset.noDrawPopup && (
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
            confirmFunc={() => useMypageAsset.setNoDrawPopup(false)}
          />
          <PopupBg bg off={() => useMypageAsset.setNoDrawPopup(false)} />
        </>
      )}
      {useMypageAsset.isPointPopupOpen && (
        <PointPopup
          onClose={useMypageAsset.onClosePointPopup}
          visible={useMypageAsset.isPointPopupOpen}
          useMypageAsset={useMypageAsset}
        />
      )}
      <Popup visible={useMypageAsset.isSuccess} style={{ maxWidth: 312 }}>
        <div
          style={{
            padding: "32px 16px 16px 16px",
            display: "flex",
            flexDirection: "column",
            gap: 24,
            alignItems: "center",
          }}
        >
          <img src={PurpleSet3.src} width={100} height={100} />
          <h3 className="h3 bold color-black-3">
            {Intl.NumberFormat().format(useMypageAsset.changePointValue)}P 전환 완료
          </h3>
          <ContainedBtn
            text="완료"
            style={{ width: "100%" }}
            onClick={useMypageAsset.onCloseSuccessPopup}
          />
        </div>
      </Popup>
    </>
  );
}
