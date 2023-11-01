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
import img1 from ".assets/example/post/2/img1.jpeg";
import img2 from ".assets/example/post/2/img2.jpeg";
import img3 from ".assets/example/post/2/img3.jpeg";
import img4 from ".assets/example/post/2/img4.jpeg";
import img5 from ".assets/example/post/2/img5.jpeg";
import img6 from ".assets/example/post/2/img6.jpeg";
import prof from ".assets/example/post/2/prof.png";
import { D_latestPostList } from ".src/data/posts/D_latest";

const isListed = false;
const title = "우리 아이 언제부터 말할 수 있을까?";
const creator = "육아하는엄마";
const category = "연애/결혼/육아";
const createdAt = new Date(2023, 7, 26);
const changeAmount = 0;
const changeRate = 0;
const price = 0;
const description =
  "아동학 박사의 실전 양육 코치 해드려요!\n육아하는 엄마와 아동발달, 베이비 훈육 시스템,\n공부 정서까지 아이 양육을 프로처럼 해보세요.";

export default function Post() {
  const hook = UsePost();
  const replyList: Array<any> = D_latestPostList[8].replyList;

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
                <p>
                  소통이 잘되고 말을 잘하는 아이로 키우기 위해서는 활동적인
                  옹알이를 통해서 혀와 턱 관련 구강 움직임과 억양을 제대로
                  익히는 것이 중요하다.
                </p>
                <img src={img1.src} alt="" />
                <p>
                  또한 다양한 소리를 들려주면서 청각과 지각발달이 제대로
                  이루어지게 만들어 준다. 이뿐 아니라 사회적인 자극도 중요하다.
                  일방적인 자극이 아닌 상대의 말과 감정상태를 이해하면서 대화를
                  할 수 있는 양방향으로 적극 이루어져야 한다.
                </p>
                <p>이에 개월수별로 언어 발달에 대해 알아보도록 하자.</p>
                <img src={img2.src} alt="" />
                <h2>0~3개월</h2>
                <p>
                  아이는 태어나기 전 이미 엄마 뱃속에서 소리를 들을 수 있다.
                  이후 청각능력이 계속 발달하면서 소리를 구분할 수 있다. 3개월
                  무렵에는 소리에 반응하면서 청각 및 언어 능력이 빠른 아이의
                  경우 엄마, 아빠의 목소리를 구별할 수 있다.
                </p>
                <p>
                  2개월쯤에는 ‘아, 에, 오’ 같은 모음 발성하기도 한다. 3개월이
                  지나면 ‘아, 우, 으’ 등 서로 다른 모음의 소리를 15초 이상 계속
                  소리 내기도 한다. 이때 부모가 소리를 반복해서 들려주면 아이도
                  비슷한 소리와 억양을 따라하게 된다.
                </p>
                <p>
                  옹알이는 신경근육이 발달하면서 일어나는 현상으로
                  의사소통보다는 말이나 단어를 말하기 전 아이의 혼잔말이라고 볼
                  수 있다.
                </p>
                <p>
                  특히 옹알이를 할때 적극적으로 호응해주면 아이의 의사소통
                  욕구를 자극해 언어발달에도 도움이 될 수 있다.
                </p>
                <img src={img3.src} alt="" />
                <h2>4~6개월</h2>
                <p>
                  생후 4개월의 아가의 옹알이에 호응해 주면서 상호작용을 시도해볼
                  수 있다. 5개월쯤 옹알이가 줄고 목구멍에서 나오는 ‘어’ 나 ‘아’
                  등의 단어를 뱉기도 한다. 6개월부터는 입술을 오물오물 움직인
                  결과물로 말이 나오기 시작한다. 이 시기에 전혀 옹알이를 하지
                  않는 아이도 있다. 이는 아가의 기질적 차이 때문이다.
                </p>
                <img src={img4.src} alt="" />
                <h2>7~9개월</h2>
                <p>
                  ‘아호’, ‘아다’ 같이 모음과 자음을 결합시켜 2음절의 소리와
                  옹알이를 하기 시작한다. 아이가 억양을 따라하거나 말에 억양이
                  나타나기도 한다.
                </p>
                <p>
                  이 시기는 언어능력의 기본을 다잡는 시기이므로 아이에게
                  의사소통의 즐거움을 알려주는 것이 좋다.
                </p>
                <img src={img5.src} alt="" />
                <h2>9~12개월</h2>
                <p>
                  옹알이와 웅얼거림 대신 의미를 알고 말을 할 수 있는 초어가
                  등장하는 시기다. 초어는 일반적으로 ‘엄마’, ‘아빠’라고 한다.
                </p>
                <p>
                  초어가 등장하긴 하지만 이 시기 아가들이 말할 수 있는 단어들은
                  매우 적다. 하지만 머릿속에서 이해하고 있는 단어들은 생각보다
                  많다. 이에 아이에게 지속적인 언어 자극을 주는 것이 중요하다.
                </p>
                <img src={img6.src} alt="" />
                <h2>13~24개월</h2>
                <p>
                  두 단어를 붙여 말하는 시기다. 이전까지 전혀 사용하지 않았던
                  단어를 갑자기 사용하거나 호칭을 부르며 활발한 언어활동을 하게
                  된다.
                </p>
                <p>
                  13개월 즈음에는 별 뜻 없는 소리를 말하지만 시간이 흐를수록
                  말할 수 있는 단어가 늘어난다. 18개월은 말문이 트이는 시기라고
                  할 수 있다.
                </p>
                <p>
                  20개월부터 표현할 수 있는 단어가 늘어나고 21개월에는 30개의
                  어휘를 구사할 수 있으며, 눈, 코,입 등 신체를 가리킬 수도 있게
                  된다. 24개월에는 3~4단어로 문장을 말할 수 있게 된다.
                </p>
                <p></p>
                <h2>25~36개월</h2>
                <p>
                  말할 수 있는 단어가 늘어나면서 3~4 단어까지 붙여서 말할 수
                  있다. 32개월에는 간단한 동요나 다양한 의사표현을 말할 수 있게
                  된다. 점점 어휘를 익히는 능력이 빨라진다.
                </p>
                <p>
                  35개월에는 의문사를 활용할줄 알게 되며, 36개월이 되면
                  역할놀이에서 대화를 구사할 수 있게 된다. 이 시기에 아이에게
                  정확하게 표현하는 법을 알려주는 것이 필요하다.
                </p>
                <p></p>
                <p>사진_게티이미지뱅크</p>
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
                  {(hook.postData?.tagList || []).map(
                    (v: { tagName: string }, i: number) => (
                      <li key={i}>{v.tagName}</li>
                    )
                  )}
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
                    {replyList.map((v, i) => (
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
