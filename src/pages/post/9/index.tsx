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
import img1 from ".assets/example/post/9/img1.png";
import img2 from ".assets/example/post/9/img2.png";
import img3 from ".assets/example/post/9/img3.png";
import img4 from ".assets/example/post/9/img4.png";
import { hourToSec } from ".src/util/dateTime";

const isListed = false;
const title = "이집트(Egypt) 여행 전 꼭 읽어야할 주의사항 및 정보 팁 준비물";
const creator = "법률법인무한";
const category = "기타꿀팁";
const createdAt = new Date(new Date().getTime() - 2 * 24 * hourToSec);
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
                <li>이집트(Egypt) 여행 시 치안상황 및 사건ㆍ사고의 유형</li>
                <p>
                  - 외국인 대상 범죄 유형 및 여행지 주의사항 - 무장 강도에 의한
                  차량 강탈, 강도, 오토바이 날치기 빈발(보행 중 날치기 주의)
                </p>
                <p>
                  - 특히, 한국인의 경우 고가 스마트폰을 범죄 표적물로 삼고
                  있음에 특별히 유의, * 여행지에서 휴대폰 기타 소지품 안전 관리
                  요망(보행 중 휴대폰 사용 지양)ㅇ 2015년 상반기 동안 이집트
                  도처에서 각종 테러 사건 발생, 테러 위협 상존
                </p>
                <p>- 6. 3. 기자 피라미드 인접지역 총격 테러 발생</p>
                <p>- 6. 10. 룩소르 카르낙 신전 입구 테러 사건 발생 </p>
                <p>
                  - 6. 29. 카이로 헬리오폴리스 지역, 이집트 검찰총장 암살 테러
                  발생
                </p>
                <p>
                  - 7. 11. 카이로 도심 소재 이태리 영사관 건물 폭파 테러 발생ㅇ
                  시나이반도 북부 국경지역에서 3년째 대테러 군사작전 지속
                </p>
                <li>이집트(Egypt) 여행 시 자연재해</li>
                <p>
                  - 나일강 상류에 아스완댐 건설 후 나일강 범람은 없어졌으며
                  캄신(3월에서 5월에 부는 심한 모래바람)을 제외한 자연재해는
                  거의 없는 편이나, 1992년 카이로에 진도 5.9의 지진이 발생해
                  500명 이상이 사망하였고, 카이로대 지질학 교수(타하 아부 아자임
                  박사)의 최근 연구에 의하면 카이로에서 수 년내 대규모의 강진
                  발생 가능성이 높다고 합니다. 이집트의 일반 주택은 철골 구조가
                  아닌 건물이 많으므로 상위급 호텔 등 지진의 충격을 견딜 수 있는
                  숙박시설에 투숙하는 것이 바람직합니다.
                </p>
                <li>이집트(Egypt) 여행 시 유의해야 할 지역</li>
                <p>
                  카이로의 명물 전통시장인 칸 칼릴리는 2005년에 이어 2009년
                  2월에도 서양인을 대상으로 폭탄 테러가 발생한 장소이므로 서양인
                  단체와의 동행에 주의하여야 하고, 이 시장은 넓고 복잡하므로
                  쇼핑시 인적이 드문 깊숙한 골목으로 진입은 자제해야 합니다.ㅇ
                  카이로의 Muqattam 언덕은 카이로 시내의 야경을 볼수 있는 곳으로
                  야간에 외국인들이 많이 찾는 곳이나 이들을 상대로 강도행위가
                  자주 발생하고, Shoubra 지역 등 극빈자 거주지역도 강도 및 절도
                  발생이 빈번하며, 나일강변에 위치한 다수의 나이트클럽 및 카지노
                  출입에는 각별한 주의를 요합니다.
                </p>
                <p>이집트(Egypt) 여행 시 주요 교통 법규 및 문화</p>
                <p>
                  - 교통법규는 우리나라와 유사하나, 원형교차로가 많이 설치되어
                  있는 반면 신호등은 주요 교차로 외에는 설치되어 있지 않음
                </p>
                <li>
                  원형교차로의 경우 선진입 차량에 우선권이 있으나, 주재국은 동
                  규칙이 적용되지 않는 경우가 다반사
                </li>
                <p>이집트(Egypt) 여행 시 관련 사건사고 사례</p>
                <p>
                  [정차 차량 추돌 사망]ㅇ 2016.7월 11시경 퇴근 중이던 한국인
                  지상사 직원 탑승 차량(현지인 운전)이 도로상에 정차해 있던
                  트럭을 추돌하여 한국인 1명 사망 및 1명 중상[끼어들기 등에 의한
                  사고]ㅇ 주재국은 차선이 거의 없으며 교통법규 준수 의식이 극히
                  낮아 주행 공간만 있으면 끼어들기가 일반화 되어 있어, 이로 인한
                  교통사고 발생 다발
                </p>
                <p>이집트(Egypt) 여행 시 관련 사건사고 발생시 대처방법</p>
                <li>
                  교통사고 발생시 경찰(126)에 신고 및 재외공관 긴급연락처로 연락
                </li>
                <li>
                  보험에 가입된 차량이 거의 없어 교통사고 발생시에도 보상을 받을
                  가능성은 높지 않고, 보상을 받는 경우에도 변호인을 선임하여
                  재판 절차를 진행해야 하므로, 대부분 현장에서 말다툼 후 사건을
                  종결하는 것이 일반화
                </li>
                <img src={img2.src} alt="" />
                <p>이집트(Egypt) 여행 시 기타 유의사항</p>
                <li>
                  주재국은 운전자의 안전의식이 매우 낮고, 노면 불규칙, 난폭운전,
                  끼어들기 등 사고발생 요인이 많아 관광목적으로 방문하는 경우
                  차량을 렌트하여 운전하는 것은 권장하지 않음
                </li>
                <li>
                  횡단보도가 없으며 무단횡단이 일반화 되어 있어 운전자의 주의가
                  매우 요구
                </li>
                <li>
                  최근 한국인 관광객이 공항에서 차량을 렌트하여 나오자마자
                  사고가 발생한 사례가 있었음(운전시 한국에서의 예측가능성을
                  가지고 주재국에서 운전할 경우 사고발생 가능성 매우 높음)
                </li>
                <li>
                  역주행 하는 차량도 많으며, 차량 고장으로 도로상에 주정차 하는
                  경우도 있으므로 운전시 전방 예의주시가 필요함
                </li>
                <li>
                  도로상에 말, 당나귀를 끌고 가는 마차들이 있으므로 동 상황에
                  대한 주의도 요구
                </li>
                <li>
                  일반 문화 이집트인들은 인사할 때 주로 악수나 양 볼에 입 맞추는
                  정도이나 아주 친밀한 사이일 경우에는 껴안기도 합니다.
                </li>
                <img src={img3.src} alt="" />
                <li>이집트(Egypt) 여행 시 종교 관련</li>
                <p>
                  - 이집트는 이슬람 국가이나 콥틱교회(기독교의 한 분파)를
                  인정하는 등 법령에 의해 개인의 종교 자유가 보장되고 외국인들의
                  종교활동(예배)에 특별한 제한은 없으며, 외국인이 많이 거주하는
                  지역(자말렉, 헬리오폴리스, 마아디 등)에는 성당, 개신교회 등이
                  있어 종교활동(예배)에 큰 불편은 없습니다.ㅇ 그러나 선교 활동은
                  인정하지 않으며, 특히 샤리아(이슬람 종교법)에 의해 무슬림에
                  대한 선교활동은 엄격히 제한되고, 선교활동 적발시에는 강제 추방
                  조치될 수 있음을 유의해야 합니다.
                </p>
                <li>이집트(Egypt) 여행 시 팁 문화</li>
                <p>
                  - 이집트에는 팁(박시시) 문화가 널리 통용되므로 호텔에서의
                  서비스는 물론 식당, 주차장, 주유소 등에서 서비스를 받았을 때도
                  1-5파운드의 팁이 필요합니다. 호텔이나 식당 등에서는 계산서에
                  봉사료가 포함되어 있지만 이와 별도로 봉사한 직원에게 소액을
                  지급합니다.
                </p>
                <li>긴급 연락처</li>
                <p>
                  - 긴급상황 - 범죄 신고 : 122, 화재신고 : 180, - 전화번호안내 :
                  140, 고속도로 견인 : 136
                </p>
                <p>이집트(Egypt) 여행 시 관광통역 서비스</p>
                <p>
                  - 공용어는 아랍어이며, 상류층 또는 외국인을 빈번히 접촉하는
                  업종에 종사하는 경우 영어가 널리 통용되고 있고 프랑스에 대해
                  상당한 호감을 가지고 있으므로 불어도 많이 사용되고 있습니다.
                  관광지를 제외한 지역에서는 아랍어 이외에 의사소통에 어려움이
                  있을 수 있습니다. 간단한 아랍어를 구사하게 되면 이집트인에게
                  좋은 인상을 가질 수 있습니다.
                </p>
                <p>이집트(Egypt) 여행 시 의료기관 연락처</p>
                <p>
                  - 주요 의료시설 - 응급환자(앰뷸런스) : 123 - 응급의료센터 :
                  앗쌀람 병원 2524-0250/0077 - 카이로 메디칼 센터 2258-1206
                </p>
                <p>이집트(Egypt) 여행 시 대사관 연락처</p>
                <p>
                  - 주소 : 3 Boulos Hanna St., Dokki, Cairo, A.R.Eㅇ 대표번호 :
                  (20) 2-3761-1234ㅇ 긴급연락처 : (20) 12-8333-3236ㅇ E-mail :
                  egypt@mofa.go.kr
                </p>
                <p>이집트(Egypt) 기본 정보</p>
                <p>
                  - 공식 국명 : 이집트 아랍공화국(Arab Republic of Egypt)ㅇ 위치
                  : 동북 아프리카 지중해 및 홍해 연안에 위치하며 북위 20-30도,
                  동경 30도에 위치함ㅇ 수도 : 카이로(인구 2.200만 명)ㅇ 면적 :
                  100.1만 평방 킬로(한반도의 약 5배, 전국토의 95% 사막)ㅇ 언어 :
                  아랍어(공용어), 영어 및 불어 통용(지식층)ㅇ 종교 :
                  이슬람교(90%-순니파),콥틱교(7~10%)ㅇ 기후 : 고온 건조, 온화한
                  겨울ㅇ 공휴일 : 금, 토(토요일 비 휴무 직종 다수 있음)ㅇ 시차 :
                  GMT + 2시간(한국보다 7시간 늦음)
                </p>
                <img src={img4.src} alt="" />
                <li>날씨</li>
                <p>
                  - 이집트의 기후는 아열대성 기후와 사막기후를 보이고 있으며
                  대체로 3가지 유형으로 분류됩니다. - 나일강 델타 지역 :
                  알렉산드리아 등 지중해 연안지역은 온화한 지중해성 기후이나 그
                  외 지역은 아열대성 기후 - 사막지대 : 국토의 95%를 차지하는
                  나일강 서편의 광대한 리비아 사막 지역, 동편의 길고 좁은
                  아라비아 사막 지역과 홍해를 건너 위치한 시나이 사막 지역
                  등으로 여름철 한낮의 기온이 섭씨 40도에서 50도에 달합니다.ㅇ
                  이집트도 4계절이 있으나 봄, 가을은 매우 짧고, 12월∼2월은
                  겨울로 기온이 영하로 내려가지는 않으나 야간 체감온도가
                  낮으므로(특히 사막여행, 산행, 야외행사시) 적절한 겨울옷(내복,
                  점퍼, 파카, 겨울 양말)을 준비하는 것이 좋습니다.
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
