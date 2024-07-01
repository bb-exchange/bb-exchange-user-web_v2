import styles from "./seller.module.scss";

import { useState } from "react";

import { useRouter } from "next/router";

import { useQuery } from "@tanstack/react-query";

import BtnSqrChk from "@assets/icons/BtnSqrChk.svg";
import BtnSqrChkOn from "@assets/icons/BtnSqrChkOn.svg";
import Dot3 from "@assets/icons/Dot3.svg";
import SortAscending from "@assets/icons/SortAscending.svg";
import Gold from "@assets/icons/tier/Gold.svg";
import Profile from "@assets/images/img_profile.svg";

import { ArticleData } from "@api/interface";
import { getProfile } from "@api/users/users";

import CommonFooter from "@components/common/commonFooter";
import CommonHeader from "@components/common/header/commonHeader";
import PageNav from "@components/common/pageNav";
import ConfirmPopup from "@components/common/popup/confirmPopup";
import ErrorMsgPopup from "@components/common/popup/errorMsgPopup";
import PopupBg from "@components/common/popupBg";
import ScrollTopBtn from "@components/common/scrollTopBtn";
import Image from "@components/Image";
import ReportSellerPopup from "@components/seller/reportSellerPopup";
import SellerPost from "@components/seller/sellerPost";

import UseSeller, { CommentSortByType } from "@hooks/seller/useSeller";

import { queryKeys } from "@recoil/query-keys";

const Seller = () => {
  const router = useRouter();
  const hook = UseSeller();

  const id = router.query.id;

  const { data: userInfo } = useQuery({
    queryKey: [queryKeys.userById, id],
    queryFn: () => getProfile(Number(id)),
    select: (res) => res?.data.data,
    enabled: !!id,
  });

  const [showCommentSortByPopup, setShowCommentSortByPopup] = useState(false);
  const onClickSetCommentSortBy = (sortBy: CommentSortByType) => {
    hook.setSort(sortBy);
    setShowCommentSortByPopup(false);
  };

  return (
    <>
      <CommonHeader />
      <main className={styles.pageLayout}>
        <section className={styles.infoLayout}>
          <div className={styles.flex}>
            {userInfo?.profileImage ? (
              <Image
                src={userInfo?.profileImage}
                width={80}
                height={80}
                loader
                alt={`${userInfo?.nickname}님의 프로필 사진`}
                className={styles.defaultProfImgBox}
              />
            ) : (
              <Profile className={styles.defaultProfImgBox} />
            )}
            <div className={styles.sellerInfo}>
              <h1>
                {userInfo?.nickname}
                <div className={styles.symbol}>
                  <Gold />
                </div>
              </h1>
              <p>{userInfo?.description}</p>
            </div>
          </div>
          <button className={styles.pointer} onClick={() => hook.setMoreMenu(true)}>
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
          <div>총 {hook.list?.totalElements ?? 0}개</div>
          <div className={styles.rightOpt}>
            <button onClick={hook.onClickstockListedBtn}>
              {hook.stockListed ? <BtnSqrChkOn /> : <BtnSqrChk />}

              <p>상장된 글만 보기</p>
            </button>

            <button onClick={() => setShowCommentSortByPopup(true)}>
              <p>{hook.commentSortByInfo[hook.sort]}</p>
              <SortAscending />
            </button>
            {showCommentSortByPopup && (
              <>
                <section className={styles.commentPopup}>
                  {Object.entries(hook.commentSortByInfo).map(([key, label]) => (
                    <button
                      key={key}
                      onClick={(e) => {
                        e.stopPropagation();
                        onClickSetCommentSortBy(key as CommentSortByType);
                      }}
                    >
                      <p>{label}</p>
                    </button>
                  ))}
                </section>

                <PopupBg
                  off={(e) => {
                    e.stopPropagation();
                    setShowCommentSortByPopup(false);
                  }}
                />
              </>
            )}
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
                {hook.list?.contents?.map((v: ArticleData, i: number) => (
                  <SellerPost data={v} key={i} />
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
              <p className={styles.blockPopupContent}>
                더이상 wooAng님의 모든 글을
                <br />볼 수 없으며, wooAng님은 치은짱짱님의 모든 글에 대한 접근, 댓글 작성,
                <br />
                프로필 접근 불가능합니다.
                <br />
                <br />
                wooAng님의 글을 다시 보시려면
                <br />
                [설정 &gt; 차단 사용자 관리]에서 차단을 해제해주세요.
              </p>
            }
            cancelText="아니오"
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
              <p className={styles.blockPopupContent}>
                이 회원님이 회원님의 게시물을 보고, 회원님의 글에 댓글을 달 수 있습니다. 회원님이
                차단을 해제했다는 정보를 알리지 않습니다.
              </p>
            }
            cancelText="아니오"
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
              <p className={styles.blockPopupContent}>
                게시글 목록에서 이 사용자의 게시글이 더는 보이지 않아요. 숨긴 사용자 관리는 [설정
                &gt; 숨긴 사용자 관리]에서 할 수 있어요
              </p>
            }
            cancelText="아니오"
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
              <p className={styles.blockPopupContent}>
                게시글 목록에서 이 사용자의 게시글을
                <br /> 다시 볼 수 있어요
              </p>
            }
            cancelText="아니오"
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
