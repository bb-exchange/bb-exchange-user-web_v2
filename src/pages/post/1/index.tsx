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
import img1 from ".assets/example/post/1/img1.png";
import img2 from ".assets/example/post/1/img2.png";
import img3 from ".assets/example/post/1/img3.png";
import prof from ".assets/example/post/1/prof.png";
import { D_latestPostList } from ".src/data/posts/D_latest";

const isListed = false;
const title = "2023년 주식시장 전망, 경기 침체 우려, 주식 시장 여파는?";
const creator = "머니로그";
const category = "주식/투자";
const createdAt = new Date(2023, 7, 26);
const changeAmount = 0;
const changeRate = 0;
const price = 0;
const description =
  "경제원탑은 우리 삶에 꼭 필요한 경제를 알려드리기 위해 탄생했습니다. 주식, 부동산, 경제전망 등 늘 어렵게만 느껴지던 경제상식들을 쉽게 전달드리겠습니다.";

export default function Post() {
  const hook = UsePost();
  const replyList: Array<any> = D_latestPostList[9].replyList;

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
                <h2>올해 주식시장은 어땠나요?</h2>
                <p>
                  2022년 11월 코스피는 17.0%, 코스닥은 29.4%가 각각
                  하락했습니다. 경기방어주와 가치주가 시장 대비 강세를
                  보였는데요. 업종별로는 금리 상승 수혜주로 꼽히는 금융업과
                  인플레이션 헤지 업종으로 꼽히는 철강, 기계, 조선 등이
                  선방했습니다. 반면, IT와 소프트웨어, 미디어 등 성장주는 금리
                  상승 피해주로 부각됐고, 반도체 경기 하락으로 IT 업종은 시장
                  대비 부진했습니다.
                </p>
                <p>
                  2022년 주식시장은 상반기에는 밸류에이션 하락, 하반기에는 이익
                  전망치 하락으로 구분할 수 있는데요. 밸류에이션 하락에
                  인플레이션과 금리 상승 우려가 반영됐다면, 이익 전망치 하락엔
                  2023년 경기침체 가능성이 반영되어 있습니다.
                </p>
                <img src={img2.src} alt="" />
                <h2>2023년 주식시장의 주요 이슈는 무엇인가요?</h2>
                <p>
                  올해 인플레이션 상승을 야기했던 공급 측면 이슈는 1) 코로나
                  이후 공급망 마비, 2) 러-우 전쟁 및 상품 가격 상승이었습니다.
                  하지만 최근 리오프닝(Reopening) 이후 글로벌 공급망은
                  정상화되고 있고, 상품 가격 역시 점차 상승률이 둔화되고
                  있는데요. 이로 인해 내년에는 공급 측면의 인플레이션 압력은
                  점차 가라앉을 것으로 보입니다.
                </p>
                <p>
                  하반기에는 미국 금리 상승세 둔화에 따라 미국 달러화의 상승세가
                  완화될 것으로 전망되는데요. 이는 글로벌 주식시장의 매입
                  동력으로 작용하고 있습니다. 2023년 미국 정책금리 상승 종료는
                  미국의 재정수지 및 경상수지 적자 폭이 확대되는 것과 더불어
                  달러화 안정 요인으로 작용할 것으로 보이는데요. 이는 미국 외
                  자산시장에 기회요인이 될 전망입니다.
                </p>
                <p></p>
                <h2>경기침체 우려 및 주식시장</h2>
                <p>
                  미 연준에서 장-단기 금리 스프레드로 추정한 미국의 경기침체
                  확률은 임계점 수준까지 상승했는데요. 주요 선진국 역시 향후
                  경기침체 확률이 매우 높은 수준까지 올라갔습니다.
                </p>
                <p>
                  과거 경기침체 국면에서 보면 주식시장은 침체 이전에 이미 하락을
                  시작해 침체 국면에서는 추가 하락하는 양상을 보여왔습니다.
                  경기침체기의 주식시장 평균 하락률은 34.4%이며, 진입
                  전(-10.5%)과 후(-23.9%)로 나눠서 볼 수 있습니다. 만약
                  경기침체가 심화될 경우 주식시장의 추가 하락 가능성 또한 배제할
                  수 없습니다.
                </p>
                <img src={img3.src} alt="" />
                <h2>기업이익에 대한 기대는?</h2>
                <p>
                  2023년 코스피 이익 전망치는 154조 원으로 올해 대비 -0.5%
                  감소할 것으로 추정됩니다. 이익 전망치의 하향 조정은 여전히
                  진행 중인데요. 장기적으로 주식시장의 연평균 지수가 이익에
                  연동되었음을 감안하면 내년 평균지수는 올해와 유사할 가능성이
                  높습니다.
                </p>
                <p>
                  애널리스트의 업종별 이익 전망치를 살펴봐도 2023년 뚜렷한 이익
                  모멘텀을 보유한 업종이 부재한 상황입니다. 경기에 연동되는
                  에너지, 산업재, IT 등은 올해 대비 이익이 감소할 것으로
                  전망됩니다.
                </p>
                <p></p>
                <h2>앞으로의 시장 전망이 궁금해요.</h2>
                <p>
                  코스피 이익 전망치에 가장 큰 영향을 주는 변수는
                  수출경기입니다. 코스피 산업 구성 및 매출지역을 감안하면 당연한
                  부분인데요. 무역수지 적자는 한국기업의 영업이익 축소와
                  연결되어 있습니다. 무역수지 감소는 원자재 가격은 상승하고
                  수출제품 가격은 그만큼 상승하지 못한 데서 기인하는데요. 향후
                  상품 가격 안정 및 중국 리오프닝이 수출경기 개선의 열쇠라고 볼
                  수 있습니다.
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
                    {replyList.slice(0, 3).map((v, i) => (
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
                <img src={prof.src || DefaultProfImg.src} alt="" />
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
