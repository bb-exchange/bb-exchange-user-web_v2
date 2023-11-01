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
import img1 from ".assets/example/post/10/img1.png";
import img2 from ".assets/example/post/10/img2.png";
import img3 from ".assets/example/post/10/img3.png";
import img4 from ".assets/example/post/10/img4.png";
import prof from ".assets/example/post/9/prof.png";
import { hourToSec } from ".src/util/dateTime";
import { D_latestPostList } from ".src/data/posts/D_latest";

const isListed = false;
const title = "남미여행을 가고 싶은 분들께 | Tip 및 주의사항";
const creator = "김란의유럽투어";
const category = "취미";
const createdAt = new Date(new Date().getTime() - 0.25 * hourToSec);
const changeAmount = 0;
const changeRate = 0;
const price = 0;
const description =
  "이탈리아 남부여행에서 경험한 숙소, 맛집, 그리고 물놀이까지!\n상세한 후기로 알려주는 유럽투어 꿀팁\n여러분의 소중한 댓글 하나가 저에게는 큰 힘이 됩니다 🙇‍♂️";

export default function Post() {
  const hook = UsePost();
  const replyList: Array<any> = D_latestPostList[0].replyList;

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
                <h2>나는 어째서 남미여행을 결심했을까?</h2>
                <li>가야할 이유가 생기다</li>
                <p>
                  저에게 남미여행을 꼭 가보라고 하신 건저희
                  아버지셨습니다.친구분과 중남미 여행을 다녀오신 뒤아르헨티나
                  이과수 폭포에 꼭 다녀오라 며마치 보내줄 것처럼
                  말씀하셨는데...10년 뒤, 제 돈으로 다녀왔습니다 :D
                </p>
                <p></p>
                <li>구체적인 계획을 세워보다</li>
                <p>
                  일본에 살고 있을 때 아래층에 살던아르헨티나 친구 하나를 알게
                  되었습니다.나는 언젠가 남미여행을 갈거야!라고 하니까
                  반가워하며언제, 어떤 나라를 갈거냐고 묻습니다.응?막연히
                  가고싶다고만 생각했던 건데..얼떨결에 친구와 함께남미여행
                  루트를 짜게 되었습니다.이 친구는 현재 부에노스 아이레스의제
                  룸메이트입니다.
                </p>
                <p></p>
                <li>갈 수 있을 때 가자</li>
                <p>
                  일본 직장을 그만두고 잠시 한국에 있을 때누군가 인터넷에
                  우유니사막의 사진을 올린 뒤3년 안에 갈 것 이라고 적은 것을
                  보았습니다.저는 그 다음해 프랑스에서 일하기로 되어있었기
                  때문에남미는 과연 언제 갈 수 있을 지 몰랐습니다.그래서
                  결심했습니다.올해 안에 갈 것
                </p>
                <p></p>
                <li>남미여행을 하려면 뭐가 필요해?</li>
                <img src={img2.src} alt="" />
                <p>{"<시간>"}</p>
                <p>
                  한국에서 페루 리마까지 비행기로 22시간,브라질 상파울로까지는
                  25시간이 걸립니다.이것은 최소 걸리는 기준이고요.경유하기에
                  따라 남미에 오는 데만30시간이 넘기도 합니다.한국에서 오고 가는
                  데만최소 이틀이 꼬박 걸리는 셈이지요.
                </p>
                <p>
                  남미면적은 우리나라의 약 178배입니다.나라만 13개국이
                  되고요,그러니 이 나라들을 돌아보는 데어마어마한 시간이
                  들겠지요?
                </p>
                <p>
                  아르헨티나만 해도 한국보다 28배 크기 때문에국내이동(부에노스
                  아이레스-이과수 폭포 등)을 하는 데만 1~3시간 비행이동을
                  해야합니다.
                </p>
                <p>
                  버스이동은 더 만만치 않습니다.제 경우 10시간 이상 걸리는
                  야간버스만예닐곱 번은 탄 것 같아요 :D지역이동 하는데 반나절이
                  걸리는 셈이지요.
                </p>
                <p>
                  그렇기 때문에 주변 사람들에겐남미여행에 최소 2달이 필요하다고
                  이야기합니다.하지만 시간이 없는ㅜㅜ 직장인의 경우경비를 더
                  들여 비행기로 이동시간을 줄일 수 있습니다.이렇게 2주일동안
                  남미의 Must see 를 보고 가시는한국 직장인 분들을 종종
                  보았습니다.
                </p>
                <p>
                  참고로 비행경비는 거리에 따라편도 약 $30 (페루 수도-마추픽추
                  근처/약 1시간)$150 (부에노스아이레스-이과수/약 2시간)
                  입니다.2018 년 1월 기준으로 검색한 결과입니다.
                </p>
                <p></p>
                <img src={img3.src} alt="" />
                <p>{"<체력>"}</p>
                <p>
                  이렇게 이동이 잦다보니 체력이 필수입니다.도보로 경치구경 할
                  일이 많기 때문에트레킹화도 필수입니다.더군다나 우리나라와
                  밤낮이 바뀐 곳이라초반엔 시차적응이 매우 어렵습니다.그리고
                  남미가 여름일 때(한국은 겨울) 오시면지역에 따라 무척 덥습니다.
                </p>
                <p>
                  여행을 많이 해보신 분들은잘 적응하시리라
                  짐작하지만남미여행에는 한가지 복병이 있습니다.
                </p>
                <li>고산병</li>
                <p>
                  남미 서쪽 안데스 산맥에 인접한 지역은지대가 백두산 보다
                  높습니다.그래서 산소부족 현상이 올 수 있지요.고난이도의
                  트레킹을 하지 않는 한염려할만한 증상을 겪으실 일은
                  없습니다만조금만 걸어도 숨이 찬다든가머리가 어지럽고 식욕이
                  떨어지게 돕니다.
                </p>
                <p>
                  사실 이런 산소부족 현상=고산병과체력에는 상관관계가
                  없습니다.일행 중 제일 체구가 작았던 여성은 끄덕없었던 반면갓
                  제대한 20대 남성이 앓아 누운 경우도 있었지요.그러나 평소에
                  운동으로 몸을 만들어 두면이런 체력저하에 훨씬 수월히 대처할 수
                  있습니다.
                </p>
                <p>
                  물론 고산지역을 피하셔도 됩니다.하지만 마추픽추를 가기 위해
                  머물게 되는쿠스코(해발 약 3400미터)와우유니 사막(해발 약
                  3653미터)도백두산 (해발 약 2774미터) 보다 높습니다 :D
                </p>
                <p></p>
                <img src={img4.src} alt="" />
                <p>{"<경비>"}</p>
                <p>
                  아시다시피 여행 스타일에 따라 다릅니다.저는 두달
                  4개국(페루,볼리비아,아르헨티나, 브라질)여행했고 밥은
                  길거리음식이나 시장음식,잠은 깔끔한 도미토리/호스텔을
                  이용했습니다.한국-남미 왕복은 마일리지를 썼기 때문에항공료
                  빼고 200만원 이하 들었습니다.
                </p>
                <p>
                  하지만 지인은 같은 두달을 여행했으나2개국(에콰도르, 칠레)을 더
                  방문했고그만큼 투어비용과 이동경비가 더 들었습니다.한국-남미
                  국제선(약 130만원) 포함비행이동에 약 250만원가량 소요해총
                  650만원을 지출했습니다.
                </p>
                <p>
                  같은 남미라고 해도 물가가 다릅니다.페루 및 볼리비아 지역은
                  물가가 저렴하지만아르헨티나, 브라질의 경우 우리나라와
                  비슷합니다.
                </p>
                <p></p>
                <li>안전한가요?</li>
                <p>지역마다 다릅니다.</p>
                <p>
                  페루의 고산지역이나 아르헨티나 파타고니아 지방 등도심 외곽의
                  관광지는 안전합니다.그래도 아무렴 현지물정을 모르고이동중 큰
                  돈을 들고 다니는 여행자들은세계 어디를 여행하시든경범죄에
                  노출되어 있습니다.오히려 남미의 경우 테러의 위험은 아직
                  없습니다.
                </p>
                <p>
                  하지만 경제사정이 좋지 않다보니빈부의 격차가 심한 대도시에서는
                  조심하셔야 합니다.단순한 경범죄가 아니라정말 운이 좋지 않은
                  경우 생명에 위협을 받기도 합니다.특히 브라질 리우데자이네로
                  같은 데서는오늘 이 가방이 없어져도 괜찮다라는 마음으로소탈히
                  다니시길 추천합니다.
                </p>
                <p>
                  저는 페루 은행 ATM 기계에서 돈 뽑고 들뜬 나머지카드를 거기에
                  두고오는 멍청한 실수한 것 외에는여행 내내 아무런 탈이
                  없었지만일행 중에는 브라질에서 권총강도에가방을 몽땅 빼앗긴
                  경우도 있었습니다.명품가방이었다고 합니다.
                </p>
                <p>
                  최대한 행색을 누추히 하시면그나마 범죄의 대상이 될 확률이
                  적습니다.제 경우엔 모든 소지품은숙소의 안전한 곳에
                  보관하고현지인같은 차림으로카메라 하나 비닐봉지에 넣고
                  다녔는데..요즘도 먹힐 지는 모르겠습니다.
                </p>
                <p>
                  여행자들이 할 수 있는 최선은하지말라는 것 안하고 가지말라는 곳
                  안가는 겁니다.
                </p>
                <p>여성 혼자 여행할 수 있을까요?</p>
                <p>물론입니다.</p>
                <p>
                  저도 여성이고 일행 없이 혼자 떠났습니다.밤 12시가 넘어 남미에
                  첫 받을 내디뎠을 때공항에서 택시잡는 것마저 겁이났던 기억이
                  납니다.그런데 다음날부터는 긴장이 많이 풀렸습니다.
                </p>
                <p>
                  남미여행객들 대부분이 그럽니다.첫날은 뭘 해도 무섭습니다.여행
                  떠나기 전부터 겁을 많이 먹었거든요.남미가 아직은 미지의 세계라
                  그런듯 합니다.그런데 일단 발을 들이면 여기도 사람 사는
                  곳이구만?! 하게 됩니다.
                </p>
                <p></p>
                <p>
                  네이버에 남미사랑이라는 카페가 있습니다.남미사랑 카카오톡
                  채팅방이 있는데여행자들이 현지에서 실시간으로 정보를
                  공유합니다.필요할 때는 일행도 쉽게 구하실 수 있습니다.한국인의
                  오지랖이 빛을 발하는 순간입니다 :D
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
