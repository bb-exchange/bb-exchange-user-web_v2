import styles from "./asset.module.scss";

import { Tooltip } from "react-tooltip";

import ChevronRt from "@assets/icons/ChevronRt.svg";
import RedCaution from "@assets/icons/RedCaution.svg";

import ContainedBtn from "@components/Buttons/ContainedBtn";
import CommonFooter from "@components/common/commonFooter";
import CommonHeader from "@components/common/header/commonHeader";
import ErrorMsgPopup from "@components/common/popup/errorMsgPopup";
import PopupBg from "@components/common/popupBg";
import ScrollTopBtn from "@components/common/scrollTopBtn";
import ContentIncome from "@components/mypage/asset/contentIncome";
import MyWithdraw from "@components/mypage/asset/myWithdraw";
import PointPopup from "@components/mypage/asset/pointPopup";
import RegisterAccountNumberNecessityPopup from "@components/mypage/asset/registerAccountNumberNecessityPopup";
import RegisterAccountNumberSuccessPopup from "@components/mypage/asset/registerAccountNumberSuccessPopup";
import SettlementSuccessPopup from "@components/mypage/asset/settlementSuccessPopup";
import SwitchPointSuccessPopup from "@components/mypage/asset/switchPointSuccessPopup";
import TermIncome from "@components/mypage/asset/termIncome";
import WithdrawInfoPopup from "@components/mypage/asset/withdrawInfoPopup";
import WithdrawPopup from "@components/mypage/asset/withdrawPopup";
import MypageNavAside from "@components/mypage/mypageNavAside";

import { BY_CONTENT, EVENT, MONTHLY, WITHDRAWAL } from "@const/common";

import UseMypageAsset from "@hooks/mypage/asset/useMypageAsset";
import UseMyTermIncome from "@hooks/mypage/asset/useMytermIncome";
import UseWithdrawPopup from "@hooks/mypage/asset/useWithdrawPopup";

export default function Asset() {
  const useMypageAsset = UseMypageAsset();
  const useWithdrawPopup = UseWithdrawPopup();
  const useMyTermIncome = UseMyTermIncome();

  const bankInfo = useMypageAsset.getValues();
  const bankCode = useMypageAsset.banks?.data.filter(
    ({ code }: { code: string }) => code === bankInfo.bankCode,
  );

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

                <ContainedBtn
                  text="출금신청"
                  className={useMypageAsset.totalPoint < 10000 ? "bg-black2" : ""}
                  onClick={useMypageAsset.onClickDraw}
                />
              </div>

              <div className={styles.accountBox}>
                <button
                  className={styles.accountBtn}
                  onClick={useMypageAsset.onRegisterAccountNumberPopupOpen}
                >
                  <p>
                    <strong>출금 계좌</strong>
                    {bankInfo?.bankAccountNumber && bankInfo?.bankCode
                      ? `${bankCode[0].name} ${bankInfo?.bankAccountNumber}`
                      : "미입력"}
                  </p>
                  <ChevronRt />
                </button>
              </div>
            </div>
          </article>

          <ul className={styles.categoryList}>
            {useMypageAsset.categoryList.map(({ label, value }) => (
              <li
                key={value}
                className={value === useMypageAsset.selectedCategory ? styles.on : ""}
                onClick={() => useMypageAsset.setSelectedCategory(value)}
              >
                <p>{label}</p>
              </li>
            ))}
          </ul>

          {useMypageAsset.selectedCategory === EVENT && <TermIncome />}
          {useMypageAsset.selectedCategory === MONTHLY && <TermIncome />}
          {useMypageAsset.selectedCategory === BY_CONTENT && <ContentIncome />}
          {useMypageAsset.selectedCategory === WITHDRAWAL && <MyWithdraw />}
        </section>
      </main>
      <ScrollTopBtn />
      <CommonFooter />
      {/* NOTE 출금하기 팝업 */}
      {useMypageAsset.drawPopup && (
        <>
          <WithdrawPopup
            useMypageAsset={useMypageAsset}
            off={() => useMypageAsset.setDrawPopup(false)}
          />
          <PopupBg bg off={() => useMypageAsset.setDrawPopup(false)} />
        </>
      )}
      {/* [출금 신청이 완료되었습니다] 팝업 */}
      {useMypageAsset.settlementSuccess && (
        <>
          <SettlementSuccessPopup useMypageAsset={useMypageAsset} />
          <PopupBg bg off={() => useMypageAsset.setSettlementSuccess(false)} />
        </>
      )}

      {/* NOTE 출금 정보 입력 팝업 */}
      {useMypageAsset.withdrawInfoPopup && (
        <>
          <WithdrawInfoPopup
            useMypageAsset={useMypageAsset}
            off={() => useMypageAsset.onRegisterAccountNumberPopupClose()}
          />
          <PopupBg bg />
        </>
      )}
      {/* [실명 정보 및 계좌 입력이 완료되었습니다] 팝업 */}
      {useMypageAsset.isRegisterAccountNumberSuccess && (
        <RegisterAccountNumberSuccessPopup useMypageAsset={useMypageAsset} />
      )}
      {/* [실명 정보 및 계좌 입력 필요] 팝업 */}
      {useMypageAsset.registerAccountNumberNecessity && (
        <RegisterAccountNumberNecessityPopup useMypageAsset={useMypageAsset} />
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
      {useMypageAsset.isSuccess && <SwitchPointSuccessPopup useMypageAsset={useMypageAsset} />}
    </>
  );
}
