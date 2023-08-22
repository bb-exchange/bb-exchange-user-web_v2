import CommonHeader from ".src/components/common/header/commonHeader";
import styles from "./postScreen.module.scss";
import CommonFooter from ".src/components/common/commonFooter";
import DefaultProfImg from ".assets/example/DefaultProfImg.png";
import Gold from ".assets/icons/tier/Gold.svg";
import NewSky from ".assets/icons/NewSky.svg";
import ChevronRt from ".assets/icons/ChevronRt.svg";
import Dot3 from ".assets/icons/Dot3.svg";
import Eye from ".assets/icons/Eye.svg";
import ThumbUpRed from ".assets/icons/ThumbUpRed.svg";
import ThumbUpGrey from ".assets/icons/ThumbUpGrey.svg";
import ThumbDnGrey from ".assets/icons/ThumbDnGrey.svg";
import ThumbDnBlue from ".assets/icons/ThumbDnBlue.svg";
import NoticeCircleGrey from ".assets/icons/NoticeCircleGrey.svg";
import Message from ".assets/icons/Message.svg";
import UsePost from ".src/hooks/post/usePost";
import moment from "moment";
import "moment/locale/ko";
import Reply from ".src/components/post/reply";
import PopupBg from ".src/components/common/popupBg";
import PostVerPopup from ".src/components/post/postVerPopup";
import PostImgPopup from ".src/components/post/postImgPopup";
import PostMorePopup from ".src/components/post/postMorePopup";
import ReportPostPopup from ".src/components/post/reportPostPopup";
import ReportUserPopup from ".src/components/post/reportUserPopup";
import ConfirmPopup from ".src/components/common/popup/confirmPopup";
import ErrorMsgPopup from ".src/components/common/popup/errorMsgPopup";
import HeartRedO from ".assets/icons/HeartRedO.svg";
import HeartGrey from ".assets/icons/HeartGrey.svg";
import BuyPostPopup from ".src/components/post/buyPostPopup";
import CompPayPopup from ".src/components/post/compPayPopup";
import dynamic from "next/dynamic";

export default function Post() {
  const hook = UsePost();

  function getDiffStyle(diff: number) {
    if (diff > 0) return styles.up;
    else if (diff < 0) return styles.dn;
  }

  return (
    <>
      <CommonHeader />

      <main className={styles.postScreen}>
        <section className={styles.contSec}>
          <article className={styles.topBar}>
            <div className={styles.verArea}>
              <div className={styles.leftCont}>
                <h2 className={styles.category}>
                  {hook.postData?.boardInfo.description}
                </h2>
                {true && (
                  <>
                    <hr />

                    <div className={styles.verCont}>
                      <div className={styles.verBox}>
                        {/* 안되어있음 */}
                        <NewSky />
                        {/* 안되어있음 */}
                        <p>Ver.9</p>
                      </div>
                      {/* 안되어있음 */}
                      <p className={styles.time}>23.04.05</p>
                    </div>
                  </>
                )}
              </div>

              <div className={styles.rightCont}>
                {true && (
                  <button
                    className={styles.otherVerBtn}
                    onClick={() => hook.setPostVerPopup(true)}
                  >
                    <p>다른버전 보러가기</p>

                    <ChevronRt />
                  </button>
                )}
              </div>
            </div>

            <div className={styles.titleArea}>
              <h1 className={styles.title}>
                {hook.postData?.articleInfo.title}
              </h1>

              <div className={styles.utilBar}>
                <div className={styles.leftCont}>
                  <div className={`${styles.creatorBox} ${styles.contBox}`}>
                    <Gold />

                    <p>{hook.postData?.userInfo.nickname}</p>
                  </div>

                  {true ? (
                    <div className={`${styles.creatorBox} ${styles.contBox}`}>
                      <Eye />

                      <p>
                        {new Intl.NumberFormat().format(
                          hook.postData?.articleInfo.totalViewNum || 0
                        )}
                      </p>
                    </div>
                  ) : (
                    <div className={`${styles.creatorBox} ${styles.contBox}`}>
                      <p>
                        작성일{" "}
                        {moment(
                          new Date(hook.postData?.articleInfo.updatedAt || "")
                        ).format("YYYY.MM.DD")}
                      </p>
                    </div>
                  )}
                </div>

                <div className={styles.rightCont}>
                  {true && (
                    <>
                      <button className={styles.urlCopyBtn} onClick={() => {}}>
                        URL 복사
                      </button>

                      <div className={styles.btnBox}>
                        <button
                          className={styles.moreBtn}
                          onClick={() => hook.setMorePopup(true)}
                        >
                          <Dot3 />
                        </button>

                        {hook.morePopup && (
                          <>
                            <PostMorePopup UsePost={hook} />
                            <PopupBg off={() => hook.setMorePopup(false)} />
                          </>
                        )}
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </article>

          {true ? (
            <>
              <article className={styles.contArea}>
                <ReactQuill
                  readOnly
                  value={hook.postData?.articleInfo.content}
                  modules={{ toolbar: false }}
                />
              </article>

              <article className={styles.likeArea}>
                <div
                  className={`${
                    hook.postData?.priceInfo.isLike ? styles.up : ""
                  } ${hook.postData?.priceInfo.isDislike ? styles.dn : ""} ${
                    styles.innerCont
                  }`}
                >
                  <button
                    className={styles.likeBtn}
                    onClick={() => hook.onClickLikeBtn(1)}
                  >
                    {hook.postData?.priceInfo.isLike ? (
                      <ThumbUpRed />
                    ) : (
                      <ThumbUpGrey />
                    )}
                    <p>+1P</p>
                  </button>

                  <div className={styles.currentBox}>
                    <p>현재가</p>
                    <h2
                      className={styles.price}
                    >{`${new Intl.NumberFormat().format(9999999)}P`}</h2>
                    <p className={styles.percent}>
                      {hook.postData?.priceInfo.changeRate || 0}%
                    </p>
                  </div>

                  <button
                    className={styles.likeBtn}
                    onClick={() => hook.onClickLikeBtn(-1)}
                  >
                    {hook.postData?.priceInfo.isDislike ? (
                      <ThumbDnBlue />
                    ) : (
                      <ThumbDnGrey />
                    )}
                    <p>-1P</p>
                  </button>
                </div>
              </article>

              <article className={styles.replyArea}>
                <ul className={styles.tagList}>
                  {(hook.postData?.tagList || []).map((v, i) => (
                    <li key={i}>{v.tagName}</li>
                  ))}
                </ul>

                <div className={styles.inputCont}>
                  <div className={styles.countBar}>
                    <Message />

                    <p className={styles.key}>댓글</p>
                    <p className={styles.value}>
                      {new Intl.NumberFormat().format(9999)}
                    </p>
                  </div>

                  <div className={styles.inputBox}>
                    <textarea
                      value={hook.reply}
                      onChange={(e) => hook.setReply(e.target.value)}
                      placeholder="댓글을 입력해주세요"
                    />

                    <button
                      className={styles.enrollBtn}
                      onClick={() => hook.setReply("")}
                    >
                      입력
                    </button>
                  </div>

                  <ul className={styles.replyList}>
                    {hook.replyList.map((v, i) => (
                      <li key={i}>
                        <Reply data={v} />

                        {v.nestedReply?.map((detV, detI) => (
                          <Reply key={detI} data={detV} nested />
                        ))}
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            </>
          ) : (
            <>
              <article
                className={`${styles.contArea} ${true ? "" : styles.limited}`}
              >
                <div className={styles.overlayBox}>
                  <button
                    className={`${styles.favBtn} ${
                      hook.isLike === true ? styles.on : ""
                    }`}
                    onClick={hook.onClickFavBtn}
                    data-testid={
                      hook.isLike === true ? "thumbRed" : "thumbGrey"
                    }
                  >
                    {hook.isLike === true ? <HeartRedO /> : <HeartGrey />}

                    <p>찜하기</p>
                  </button>

                  <p className={styles.plzBuy}>전체글을 보려면 구매해주세요.</p>
                </div>

                <p>
                  {`최대열줄까지만보이게하는거어떨까요최대열줄까지만보이게하는거어떨까요최대열줄까지만보이게하는거어떨까요최대열줄까지만보이게하는거어떨까요최대열줄까지만보이게하는거어떨까요최대열줄까지만보이게하는거어떨까요최대열줄까지만보이게하는거어떨까요최대열줄까지만보이게하는거어떨까요최대열줄까지만보이게하는거어떨까요최대열줄까지만보이게하는거어떨까요최대열줄까지만보이게하는거어떨까요최대열줄까지만보이게하는거어떨까요최대열줄까지만보이게하는거어떨까요최대열줄까지만보이게하는거어떨까요최대열줄까지만보이게하는거어떨까요최대열줄까지만보이게하는거어떨까요최대열줄까지만보이게하는거어떨까요최대열줄까지만보이게하는거어떨까요최대열줄까지만보이게하는거어떨까요최대열줄까지만보이게하는거어떨까요최대열줄까지만보이게하는거어떨까요최대열줄까지만보이게하는거어떨까요최대열줄까지만보이게하는거어떨까요`}
                </p>
              </article>

              <article className={styles.replyArea}>
                <div className={styles.inputCont}>
                  <div className={styles.countBar}>
                    <Message />

                    <p className={styles.key}>대표댓글</p>
                  </div>

                  <ul className={styles.replyList}>
                    {hook.replyList.slice(0, 3).map((v, i) => (
                      <li key={i}>
                        <Reply data={v} />
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            </>
          )}
        </section>

        <aside>
          {true ? (
            <>
              <article className={styles.creatorArea}>
                <div className={styles.profImgBox}>
                  <img
                    src={hook.postData?.userInfo.image || DefaultProfImg.src}
                    alt=""
                  />
                </div>

                <div className={styles.nicknameBar}>
                  <h1 className={styles.nickname}>
                    {hook.postData?.userInfo.nickname}
                  </h1>
                  <Gold />
                </div>

                <p className={styles.profMsg}>
                  {hook.postData?.userInfo.description}
                </p>
              </article>

              <article
                className={`${styles.otherPostArea} ${styles.postListArea}`}
              >
                <p className={styles.areaTitle}>
                  {hook.postData?.userInfo.nickname}님의 다른 글
                </p>

                {/* <ul className={styles.postList}>
                  {hook.otherPostList.map((v, i) => (
                    <li key={i}>
                      <div className={styles.topBar}>
                        <p>
                          <strong className={styles.category}>
                            {v.category}
                          </strong>
                          ・{v.creatorNickname}・{moment(v.createdAt).fromNow()}
                        </p>
                      </div>

                      <div className={styles.contBar}>
                        <div className={styles.leftCont}>
                          <p className={styles.title}>{v.title}</p>

                          <div className={styles.thumbnailBox}>
                            <img src={v.thumbnailUrl} alt="" />
                          </div>
                        </div>

                        <div
                          className={`${styles.rightCont} ${getDiffStyle(
                            v.percentOfChange || 0
                          )}`}
                        >
                          <p className={styles.diff}>
                            {`${(v.percentOfChange || 0) > 0 ? "+" : ""}${
                              v.percentOfChange || 0
                            }% (${v.amountOfChange || 0})`}
                          </p>

                          <p
                            className={styles.price}
                          >{`${new Intl.NumberFormat().format(
                            v.point || 0
                          )} 원`}</p>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul> */}
              </article>

              <article
                className={`${styles.categoryPopularPostList} ${styles.postListArea}`}
              >
                <p className={styles.areaTitle}>{hook.postData?.boardInfo.description}의 인기글</p>

                <ul className={styles.postList}>
                  {hook.otherPostList.map((v, i) => (
                    <li key={i}>
                      {/* <div className={styles.topBar}>
                        <p>
                          <strong className={styles.category}>
                            {v.category}
                          </strong>
                          ・{v.creatorNickname}・{moment(v.createdAt).fromNow()}
                        </p>
                      </div>

                      <div className={styles.contBar}>
                        <div className={styles.leftCont}>
                          <p className={styles.title}>{v.title}</p>

                          <div className={styles.thumbnailBox}>
                            <img src={v.thumbnailUrl} alt="" />
                          </div>
                        </div>

                        <div
                          className={`${styles.rightCont} ${getDiffStyle(
                            v.percentOfChange || 0
                          )}`}
                        >
                          <p className={styles.diff}>
                            {`${(v.percentOfChange || 0) > 0 ? "+" : ""}${
                              v.percentOfChange || 0
                            }% (${v.amountOfChange || 0})`}
                          </p>

                          <p
                            className={styles.price}
                          >{`${new Intl.NumberFormat().format(
                            v.point || 0
                          )} 원`}</p>
                        </div>
                      </div> */}
                    </li>
                  ))}
                </ul>
              </article>
            </>
          ) : (
            <article className={styles.buyArea}>
              <div className={styles.viewCont}>
                <strong className={styles.icon}>👀</strong>
                <br />
                {hook.postData?.articleInfo.totalViewNum}명이 이 글을 봤어요!
              </div>

              <div className={styles.contCont}>
                <div className={styles.priceCont}>
                  <div className={`${styles.diffBox} ${getDiffStyle(1 || 0)}`}>
                    <p>+{hook.postData?.priceInfo.changeRate||0}% (63)</p>
                  </div>

                  <div className={`${styles.priceBox} ${getDiffStyle(1 || 0)}`}>
                    <p className={styles.key}>현재가</p>
                    <p className={styles.value}>
                      {Intl.NumberFormat().format(12000)} P
                    </p>
                  </div>

                  <div className={styles.noticeBox}>
                    <NoticeCircleGrey />

                    <p>실시간으로 가격이 변동될 수 있습니다</p>
                  </div>
                </div>

                <button
                  className={styles.buyBtn}
                  onClick={() => hook.setBuyPopup(true)}
                >
                  구매하기
                </button>
              </div>
            </article>
          )}
        </aside>
      </main>

      <CommonFooter />

      {hook.postVerPopup && (
        <>
          <PostVerPopup off={() => hook.setPostVerPopup(false)} />
          <PopupBg bg off={() => hook.setPostVerPopup(false)} />
        </>
      )}

      {hook.imgPopup && (
        <>
          <PostImgPopup usePostHook={hook} />
          <PopupBg bg off={() => {}} />
        </>
      )}

      {hook.reportPostPopup && (
        <>
          <ReportPostPopup
            off={() => hook.setReportPostPopup(false)}
            confirmFunc={hook.onSuccessReportPost}
          />
          <PopupBg bg off={() => hook.setReportPostPopup(false)} />
        </>
      )}

      {hook.reportUserPopup && (
        <>
          <ReportUserPopup
            off={() => hook.setReportUserPopup(false)}
            confirmFunc={hook.onSuccessReportUser}
          />
          <PopupBg bg off={() => hook.setReportUserPopup(false)} />
        </>
      )}

      {hook.hideUserPostPopup && (
        <>
          <ConfirmPopup
            title="이 사용자의 글을 숨기시겠어요?"
            content="이미 구매한 글을 제외하고 wooAng님의 게시글을 더는 보이지 않아요."
            confirmFunc={hook.onSuccessHideUserPost}
            cancelFunc={() => hook.setHideUserPostPopup(false)}
          />
          <PopupBg bg off={() => hook.setHideUserPostPopup(false)} />
        </>
      )}

      {hook.compReportPopup && (
        <>
          <ErrorMsgPopup
            msg="신고가 접수되었습니다."
            confirmFunc={() => hook.setCompReportPopup(false)}
          />
          <PopupBg bg off={() => hook.setCompReportPopup(false)} />
        </>
      )}

      {hook.compHideUserPostPopup && (
        <>
          <ErrorMsgPopup
            msg={
              <>
                사용자 글의 숨김처리를
                <br /> 완료하였습니다.
              </>
            }
            confirmFunc={() => hook.setCompHideUserPostPopup(false)}
          />
          <PopupBg bg off={() => hook.setCompHideUserPostPopup(false)} />
        </>
      )}

      {hook.buyPopup && (
        <>
          <BuyPostPopup usePost={hook} />
          <PopupBg bg off={() => hook.setBuyPopup(false)} />
        </>
      )}

      {hook.compPayPopup && (
        <>
          <CompPayPopup
            usePost={hook}
            off={() => hook.setCompPayPopup(false)}
          />
          <PopupBg bg off={() => hook.setCompPayPopup(false)} />
        </>
      )}
    </>
  );
}

const ReactQuill = dynamic(
  async () => {
    const { default: RQ } = await import("react-quill");

    const reactQuill = ({ forwardedRef, ...props }: any) => (
      <RQ ref={forwardedRef} {...props} />
    );

    return reactQuill;
  },
  {
    ssr: false,
  }
);
