import CommonHeader from ".src/components/common/header/commonHeader";
import CommonFooter from ".src/components/common/commonFooter";
import styles from "./seller.module.scss";
import UseSeller from ".src/hooks/seller/useSeller";
import PopupBg from ".src/components/common/popupBg";
import ErrorMsgPopup from ".src/components/common/popup/errorMsgPopup";

import Profile from ".assets/images/img_profile.svg";
import Gold from ".assets/icons/tier/Gold.svg";
import BtnSqrChk from ".assets/icons/BtnSqrChk.svg";
import BtnSqrChkOn from ".assets/icons/BtnSqrChkOn.svg";
import Swap from ".assets/icons/Swap.svg";
import Dot3 from ".assets/icons/Dot3.svg";
import ReportSellerPopup from ".src/components/seller/reportSellerPopup";
import ConfirmPopup from ".src/components/common/popup/confirmPopup";
import ScrollTopBtn from ".src/components/common/scrollTopBtn";
import PageNav from ".src/components/common/pageNav";
import WritePost from ".src/components/mypage/write/writePost";

const Seller = () => {
  const hook = UseSeller();

  return (
    <>
      <CommonHeader />
      <main className={styles.pageLayout}>
        <section className={styles.infoLayout}>
          <div className={styles.flex}>
            <Profile className={styles.emptyProfile} />
            <div className={styles.sellerInfo}>
              <h1>
                치은짱짱맨
                <div className={styles.symbol}>
                  <Gold />
                </div>
              </h1>
              <p>
                재테크, 투자, 자동차 전문가입니다. 12년간 7개의 은행, 증권사,
                투자은행을 다닌 경험이 있으며, 시드 2000천으로 현재 자산 58억
                달성한 모든 비법을 공유합니다. 다들 따라오세요!!! 가보자구욧~!~!
              </p>
            </div>
          </div>
          <button
            className={styles.pointer}
            onClick={() => hook.setMoreMenu(true)}
          >
            {hook.showMore && <Dot3 />}
          </button>
          {hook.moreMenu && (
            <>
              <section className={styles.postMorePopup}>
                <button onClick={hook.onClickReportBtn}>
                  <p>사용자 신고하기</p>
                </button>
                <button onClick={hook.onClickDisabled}>
                  <p>이 사용자의 글 보지않기</p>
                </button>
                <button onClick={hook.onClickBlock}>
                  <p>사용자 차단하기</p>
                </button>
              </section>
              <PopupBg off={() => hook.setMoreMenu(false)} />
            </>
          )}
        </section>
        <section className={styles.listHeader}>
          <div>총 00개</div>
          <div className={styles.rightOpt}>
            <button className={`${styles.filterOnSaleBtn} ${styles.utilBtn}`}>
              <BtnSqrChkOn />
              <p>상장된 글만 보기</p>
            </button>

            <button
              className={`${styles.sortBtn} ${styles.utilBtn}`}
              onClick={() => {}}
            >
              <Swap />

              <p>최신순</p>
            </button>
          </div>
        </section>
        <section className={styles.postList}>
          {hook.isBlocked ? (
            <div className={styles.blockedMode}>
              <p>차단된 사용자입니다.</p>
              <button onClick={hook.onCancelBlockBtn}>차단 해제</button>
            </div>
          ) : hook.isDisabled ? (
            <div className={styles.blockedMode}>
              <p>게시물이 숨김 처리된 사용자입니다.</p>
              <button onClick={hook.onCancelDisabledBtn}>숨김 해제</button>
            </div>
          ) : (
            <>
              <ul className={styles.postList}>
                {hook.list?.map((v, i) => (
                  <WritePost data={v} key={i} />
                ))}
              </ul>

              <PageNav />
            </>
          )}
        </section>
      </main>
      <ScrollTopBtn />
      <CommonFooter />
      {hook.reportPopup && (
        <>
          <ReportSellerPopup
            off={() => hook.setReportPopup(false)}
            confirmFunc={hook.onSuccessReportPopup}
          />
          <PopupBg bg off={() => hook.setReportPopup(false)} />
        </>
      )}
      {hook.reportConfirmPopup && (
        <>
          <ErrorMsgPopup
            msg="사용자 신고를 완료하였습니다."
            confirmFunc={() => hook.setReportConfirmPopup(false)}
          />
          <PopupBg bg off={() => hook.setReportConfirmPopup(false)} />
        </>
      )}
      {hook.blockPopup && (
        <>
          <ConfirmPopup
            title="이 사용자를 차단하시겠어요?"
            content={
              <>
                더 이상 wooAng님의 모든 글을 볼 수 없습니다. wooAng님은
                치은짱짱님의 모든 글에 대한 접근, 댓글 작성, 프로필 접근
                불가능합니다. 구매한 글이 있다면 열람만 가능합니다.
              </>
            }
            cancelText="아니요"
            cancelFunc={() => hook.setBlockPopup(false)}
            confirmText="네"
            confirmFunc={hook.onSuccessBlockBtn}
          />
          <PopupBg bg off={() => hook.setBlockPopup(false)} />
        </>
      )}
      {hook.blockConfirmPopup && (
        <>
          <ErrorMsgPopup
            msg="사용자의 차단을 완료하였습니다."
            confirmFunc={() => hook.setBlockConfirmPopup(false)}
          />
          <PopupBg bg off={() => hook.setBlockConfirmPopup(false)} />
        </>
      )}
      {hook.blockCancelPopup && (
        <>
          <ConfirmPopup
            title="이 사용자를 차단 해제하시겠어요?"
            content={
              <>
                이 회원님이 회원님의 게시물을 보고, 회원님의 글에 댓글을 달 수
                있습니다. 회원님이 차단을 해제했다는 정보를 알리지 않습니다.
              </>
            }
            cancelText="아니요"
            cancelFunc={() => hook.setBlockCancelPopup(false)}
            confirmText="네"
            confirmFunc={hook.onSuccessCancelBlockBtn}
          />
          <PopupBg bg off={() => hook.setBlockCancelPopup(false)} />
        </>
      )}
      {hook.cancelBlockConfirmPopup && (
        <>
          <ErrorMsgPopup
            msg="사용자의 차단 해제를 완료하였습니다."
            confirmFunc={() => hook.setCancelBlockConfirmPopup(false)}
          />
          <PopupBg bg off={() => hook.setCancelBlockConfirmPopup(false)} />
        </>
      )}
      {hook.disabledPopup && (
        <>
          <ConfirmPopup
            title="이 사용자를 게시글을 숨기시겠어요?"
            content={
              <>
                게시글 목록에서 이 사용자의 게시글이 더는 보이지 않아요. 숨긴
                사용자 관리는
                {"[설정 > 숨긴 사용자 관리]"}에서 할 수 있어요
              </>
            }
            cancelText="아니요"
            cancelFunc={() => hook.setDisabledPopup(false)}
            confirmText="네"
            confirmFunc={hook.onSuccessDisabledBtn}
          />
          <PopupBg bg off={() => hook.setDisabledPopup(false)} />
        </>
      )}
      {hook.disabledConfirmPopup && (
        <>
          <ErrorMsgPopup
            msg="사용자의 글 숨김을 완료하였습니다."
            confirmFunc={() => hook.setDisabledConfirmPopup(false)}
          />
          <PopupBg bg off={() => hook.setDisabledConfirmPopup(false)} />
        </>
      )}
      {hook.disabledCancelPopup && (
        <>
          <ConfirmPopup
            title="이 사용자를 게시물을 다시 보시겠어요?"
            content={
              <>
                게시글 목록에서 이 사용자의 게시글을
                <br /> 다시 볼 수 있어요
              </>
            }
            cancelText="아니요"
            cancelFunc={() => hook.setDisabledCancelPopup(false)}
            confirmText="네"
            confirmFunc={hook.onSuccessCancelDisabledBtn}
          />
          <PopupBg bg off={() => hook.setDisabledCancelPopup(false)} />
        </>
      )}
      {hook.disabledCancelConfirmPopup && (
        <>
          <ErrorMsgPopup
            msg="게시글 목록에서 이 사용자의 게시물을 볼 수 있습니다."
            confirmFunc={() => hook.setDisabledCancelConfirmPopup(false)}
          />
          <PopupBg bg off={() => hook.setDisabledCancelConfirmPopup(false)} />
        </>
      )}
    </>
  );
};

export default Seller;
