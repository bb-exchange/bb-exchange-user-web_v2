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
import img1 from ".assets/example/post/8/img1.png";
import img2 from ".assets/example/post/8/img2.png";
import prof from ".assets/example/post/8/prof.png";
import { hourToSec } from ".src/util/dateTime";
import { D_latestPostList } from ".src/data/posts/D_latest";

const isListed = false;
const title = "[변호사가 알려주는 생활법률] 바람 핀 남편이 쓴 각서 효력은?";
const creator = "법률법인무한";
const category = "기타꿀팁";
const createdAt = new Date(new Date().getTime() - 2 * 24 * hourToSec);
const changeAmount = 0;
const changeRate = 0;
const price = 0;
const description =
  "안녕하세요. 법무법인 무한입니다.\n실시간 이슈 및 부동산·임대차·학교폭력·이혼·상속·민사·형사 관련하여 유익한 내용 쉽게 전달드리도록 하겠습니다!";

export default function Post() {
  const hook = UsePost();
  const replyList: Array<any> = D_latestPostList[2].replyList;

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
                <h2 className={styles.category}>{category}</h2>
                {isListed && (
                  <>
                    <hr />

                    <div className={styles.verCont}>
                      <div className={styles.verBox}>
                        {/* 안되어있음 */}
                        <NewSky />
                        {/* 안되어있음 */}
                        <p>Ver.1</p>
                      </div>
                      {/* 안되어있음 */}
                      <p className={styles.time}>
                        {moment(createdAt).format("YYYY.MM.DD")}
                      </p>
                    </div>
                  </>
                )}
              </div>

              <div className={styles.rightCont}>
                {isListed && (
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
              <h1 className={styles.title}>{title}</h1>

              <div className={styles.utilBar}>
                <div className={styles.leftCont}>
                  <div className={`${styles.creatorBox} ${styles.contBox}`}>
                    <Gold />

                    <p>{creator}</p>
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

          {!isListed ? (
            <>
              <article className={`${styles.d} ${styles.contArea}`}>
                <img src={img1.src} alt="" />
                <p>
                  Q = A씨는 대학교 재학 시절 소개팅으로 만난 B씨와 짧은 연애
                  끝에 결혼해 아이를 셋이나 낳아 기르며 평범한 결혼생활을 하고
                  있었습니다. 그런데 회사에서 업무적으로 어울렸던 여직원과 눈이
                  맞아 수시로 모텔을 갈 정도로 심하게 바람이 들고 말았습니다.
                </p>
                <p>
                  아내 B씨는 평소와 달리 스타일에 신경 쓰는 A씨를 수상하게 여겨
                  몰래 미행했고 결국 여직원과 함께 모텔에 들어가는 A씨를
                  발견했습니다. A씨 “딱 한 번의 실수”라며 무릎을 꿇었고 ‘모든
                  재산은 B 씨의 소유로 한다’는 내용의 각서와 함께 부동산
                  등기권리증, 인감증명서를 제외하고 처분을 위임하는 관련 서류를
                  받는 조건으로 B씨는 A씨를 용서하게 되었습니다. 이후 A씨도
                  마음을 고쳐먹고 충실한 결혼생활을 했습니다.
                </p>
                <p>
                  그런데 이 내용의 각서가 장래에 이혼을 전제로 한 재산 분할
                  협의를 한 것으로 인정받을 수 있는 것일까요?
                </p>
                <p></p>
                <img src={img2.src} alt="" />
                <p>
                  A =‘바람 한 번도 안 핀 사람은 있어도 한 번만 바람 핀 사람은
                  없다’는 말도 있는데, 다행히 남편이 마음을 다잡고 결혼생활을
                  충실히 하고 계신다니 다행입니다.
                </p>
                <p>
                  우선 재산분할은 협의이혼이나 소송을 통해 이혼소송을 하는 경우
                  부부 중의 일방이 상대방에 대해 혼인 중에 취득한 실질적인 부부
                  공동재산을 청산하고 분배하는 절차를 의미합니다.
                </p>
                <p>
                  이러한 재산분할은 부부 쌍방의 협의로 정하는 것이 원칙이고
                  협의가 이뤄지지 않거나 협의할 수 없을 때에 신청할 수 있습니다.
                  따라서 부부 사이에 이미 재산분할에 관한 합의를 했고 그 합의에
                  따른 이행을 상대방에게 구하는 것이라면 이는 엄격한 의미의
                  ‘재산분할청구’에는 해당하지 않고 일반 민사사건이 됩니다.
                </p>
                <p>
                  그렇다면 위 사례에서 본 것과 같이 A씨가 B씨에게 ‘모든 재산은
                  B씨의 소유로 한다’는 각서를 써준 경우 ‘이미 부부 사이에
                  재산분할에 관한 합의를 한 것이다’라고 해석할 수 있을까요? 그
                  결론에 따라 단순히 합의 이행을 구하는 민사사건이 될지,
                  재산분할청구를 하는 가사사건이 될지가 달라지게 될 것입니다.
                </p>
                <p>
                  판례는 「혼인 중에 금전문제로 불화가 있어 오다가 ‘모든 재산을
                  배우자 일방의 소유로 한다’는 각서를 교부하고, 그 후에도
                  처분권을 위임하는 관련 서류를 교부했으나 그 각서 또는 관련
                  서류 교부 당시 이혼에 관한 언급은 없었고, 그 후로도 혼인관계가
                  계속된 점 등에 비추어 그 각서 또는 관련 서류 교부로써 이혼을
                  전제로 한 재산분할에 관한 협의가 있었다고 볼 수 없다」고
                  했습니다(대법원 1997. 7. 22. 선고 96므318,325 판결 참조).
                </p>
                <p>
                  즉 이 사건과 같이 ‘모든 재산을 배우자 일방인 B씨의 소유로
                  한다’는 내용의 각서를 쓴 경우라도 그 당시 B씨가 A씨에게
                  ‘이혼하겠다’는 취지의 의사를 표시하지 않았고, 그 이후 실제로
                  이혼하지 않고 상당한 기간 동안 혼인생활을 충실히 했으며 처분을
                  위임하는 서류를 교부하면서 인감증명서를 준 것도 아니었습니다.
                </p>
                <p>
                  따라서 위와 같은 내용의 각서만으로는 이혼을 전제로 한 재산분할
                  협의를 했다고 볼 수 없습니다. 이에 혹시 나중에라도 A씨와 B씨가
                  이혼하게 될 경우 각서 내용과 다른 내용의 재산분할 청구를 할 수
                  있는 것입니다.
                </p>
                <p>
                  다만 ‘모든 재산을 배우자 일방의 소유로 한다’는 취지의 각서를
                  작성하면서 인감증명서까지 교부하고 그 직후에 이혼소송을
                  제기당하는 등의 다른 사정이 있을 때는 이혼을 전제로 협의분할을
                  했다고 해석될 가능성도 있으니 주의해야 합니다.
                </p>
                <p>
                  본인 이름으로 나가는 모든 서류에는 지나치다 싶을 정도로
                  신중하게 도장을 찍는 습관을 가져야 한다는 것을 명심해야
                  합니다.
                </p>
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
                    {hook.like === 1 ? <ThumbUpRed /> : <ThumbUpGrey />}
                    <p>+1P</p>
                  </button>

                  <div className={styles.currentBox}>
                    <p>현재가</p>
                    <h2
                      className={styles.price}
                    >{`${new Intl.NumberFormat().format(price)}P`}</h2>
                    <p className={styles.percent}>{changeRate}%</p>
                  </div>

                  <button
                    className={styles.likeBtn}
                    onClick={() => hook.onClickLikeBtn(-1)}
                  >
                    {hook.like === -1 ? <ThumbDnBlue /> : <ThumbDnGrey />}
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
                      {new Intl.NumberFormat().format(replyList.length)}
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
                    {replyList.map((v, i) => (
                      <li key={i}>
                        <Reply data={v} />
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
                    {replyList.map((v: any, i: number) => (
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
          {isListed ? (
            <article className={styles.buyArea}>
              <div className={styles.viewCont}>
                <strong className={styles.icon}>👀</strong>
                <br />
                {0}명이 이 글을 봤어요!
              </div>

              <div className={styles.contCont}>
                <div className={styles.priceCont}>
                  <div className={`${styles.diffBox} ${getDiffStyle(1 || 0)}`}>
                    <p>
                      +{changeRate || 0}% ({changeAmount})
                    </p>
                  </div>

                  <div className={`${styles.priceBox} ${getDiffStyle(1 || 0)}`}>
                    <p className={styles.key}>현재가</p>
                    <p className={styles.value}>
                      {Intl.NumberFormat().format(price)} P
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
          ) : (
            <article className={styles.creatorArea}>
              <div className={styles.profImgBox}>
                <img
                  src={prof.src || DefaultProfImg.src}
                  alt=""
                />
              </div>

              <div className={styles.nicknameBar}>
                <h1 className={styles.nickname}>{creator}</h1>
              </div>

              <p className={styles.profMsg}>{description}</p>
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
          <BuyPostPopup usePost={hook} title={title} price={price} />
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
