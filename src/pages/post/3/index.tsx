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
import img1 from ".assets/example/post/3/img1.jpeg";
import img2 from ".assets/example/post/3/img2.jpeg";
import img3 from ".assets/example/post/3/img3.jpeg";
import img4 from ".assets/example/post/3/img4.jpeg";
import img5 from ".assets/example/post/3/img5.jpeg";
import img6 from ".assets/example/post/3/img6.jpeg";

const isListed = false;
const title =
  "결혼 준비 체크리스트, 웨딩홀부터 스드메까지(스드메 추천, 준비 비용)";
const creator = "예신모여라";
const category = "연애/결혼/육아";
const createdAt = new Date(2023, 7, 27);
const price = 0;
const changeRate = 0;

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
                <p>사진=픽사베이</p>
                <p>
                  결혼은 준비의 연속이라는 말이 있다. 끊임없이 준비하고,
                  체크해야할 것들이 생겨난다. 특히 결혼 날짜가 확정되는 순간
                  웨딩홀부터 시작해 일명, '스드메'라고 불리는 스튜디오, 드레스,
                  메이크업 업체를 선정하는 일은 상당히 복잡하다. 워낙 많은
                  업체가 있을 뿐만 아니라, 가격도 천지차이기 때문이다. 결혼
                  준비를 하는 예비신부, 예비신랑을 위해 웨딩홀 선정 및 결혼 비용
                  절약하는 스드메 선정 팁을 소개한다.
                </p>
                <img src={img2.src} alt="" />
                <p>사진=픽사베이</p>
                <p></p>
                <h2>웨딩홀 선정하기, '일반 vs 스몰'</h2>
                <p>
                  결혼에 대한 확신이 있다면 1년을 잡고 차근차근 준비하는 것이
                  좋다. 6개월이나 3개월만에도 준비할 수는 있지만 원하는 날짜와
                  원하는 장소, 시간대에 예식장을 구하기 위해서는 1년 전에는
                  웨딩홀을 선정하고, 예약을 해야만 빌릴 수 있다. 웨딩홀을 빌릴
                  때는 업체 3-4곳을 방문상담을 잡은 후, '웨딩홀 투어'라는 것을
                  진행한다. 웨딩플래너가 있다면 웨딩플래너를 통해 스케줄을
                  잡으면 되고, 혼자 진행한다면 웨딩홀에 연락하여 일정을 잡으면
                  된다.
                </p>
                <p>
                  요즘 스몰 웨딩을 하는 사람들도 증가하는 추세다. 스몰 웨딩이란
                  기본적으로 결혼식 비용과 장소를 최소하해서 규모를 줄이고,
                  친인척 및 가까운 지인만 초대하여 소규모로 간소하게 치루는
                  웨딩을 의미한다. 스몰웨딩은 대체로 하우스웨딩홀, 레스토랑,
                  야외 공간 등 이색적인 공간에서 진행하는 경우가 많다.
                </p>
                <img src={img3.src} alt="" />
                <p>사진=픽사베이</p>
                <p></p>
                <h2>웨딩플래너 선정, '동행 vs 비동행'</h2>
                <p>
                  혼자 결혼준비를 하기가 어렵다면 웨딩플래너를 이용하는 것도
                  좋은 방법이다. 준비 리스트마다 웨딩플래너에게 원하는 금액대와
                  스타일 등을 이야기 하면 업체를 비교하여 선별해주기 때문에 좀
                  더 수월하게 결혼을 준비할 수 있다. 보통 웨딩플래너는 동행
                  웨딩플래너와 비동행 웨딩플래너로 나뉘는데, 말 그대로 업체
                  선정을 위해 방문시 동행여부의 차이다. 당연히 동행 웨딩플래너가
                  훨씬 비싸다.
                </p>
                <img src={img4.src} alt="" />
                <p>사진=픽사베이</p>
                <p></p>
                <h2>스드메 '스튜디오 웨딩촬영'</h2>
                <p>
                  웨딩드레스는 스드메 비용에 있어서 가장 큰 영향을 미치는 요소
                  중 하나다. 웨딩드레스는 크게 촬영용, 본식용으로 나뉜다.
                  촬영드레스는 선택된 촬영 스튜디오의 전반적인 분위기를
                  생각하면서 활용도가 가장 좋은 드레스를 선택하는 것이 좋다.
                  본식드레스는 예식 당일 신부대기실과 식장 내 조명과 전체적인
                  분위기를 고려해야 한다. 보통 드레스샵의 포트폴리오를 보고
                  3~4개의 웨딩드레스 샵을 선정한다. 선정한 업체들과 일정 조율
                  후, 드레스샵 투어를 통해 자신에게 가장 잘 어울리는 드레스를
                  보유한 샵을 선택한다. 이후 촬영용 드레스 선정과 가봉, 본식용
                  드레스 선정과 가봉을 진행하게 된다. 드레스샵 투어 시에는 사진
                  촬영이 불가한 경우가 많으니 메모장을 준비하면 좋고, 방문
                  업체에 줄 투어비도 준비해야 한다.
                </p>
                <img src={img6.src} alt="" />
                <p>사진=픽사베이</p>
                <p></p>
                <h2>스드메 '웨딩 메이크업'</h2>
                <p>
                  메이크업샵은 자신이 원하는 이미지를 웨딩플래너에게 이야기
                  하거나, 해당 업체를 알아보고 상담을 잡으면 된다. 메이크업
                  결정은 드레스와 예식장과의 조화 혹은 스튜디오와의 조화만
                  생각하면 된다. 다만, 메이크업 담당자와 헤어 담당자가 실장,
                  부원장, 원장이냐에 따라 비용이 달라지며, 본식날 예식장으로
                  출장을 부르게 되는 경우에도 비용이 올라간다.
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

              {/* <article className={styles.replyArea}>
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
              </article> */}
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
          <article className={styles.creatorArea}>
            <div className={styles.profImgBox}>
              <img
                src={hook.postData?.userInfo.image || DefaultProfImg.src}
                alt=""
              />
            </div>

            <div className={styles.nicknameBar}>
              <h1 className={styles.nickname}>{creator}</h1>
              <Gold />
            </div>

            <p className={styles.profMsg}>
              {hook.postData?.userInfo.description}
            </p>
          </article>
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
