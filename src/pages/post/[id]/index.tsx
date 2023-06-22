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
import Message from ".assets/icons/Message.svg";
import usePost from ".src/hooks/post/usePost";
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

export default function Post() {
  const useCustomHook = usePost();

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
                <h2 className={styles.category}>커리어</h2>
                <hr />

                <div className={styles.verCont}>
                  <div className={styles.verBox}>
                    <NewSky />

                    <p>Ver.9</p>
                  </div>

                  <p className={styles.time}>23.04.05</p>
                </div>
              </div>

              <div className={styles.rightCont}>
                <button
                  className={styles.otherVerBtn}
                  onClick={() => useCustomHook.setPostVerPopup(true)}
                >
                  <p>다른버전 보러가기</p>

                  <ChevronRt />
                </button>
              </div>
            </div>

            <div className={styles.titleArea}>
              <h1 className={styles.title}>
                취준생 모여라! 답변 못하면 탈락하는 면접 질문 30선{" "}
              </h1>

              <div className={styles.utilBar}>
                <div className={styles.leftCont}>
                  <div className={`${styles.creatorBox} ${styles.contBox}`}>
                    <Gold />

                    <p>치은짱짱맨</p>
                  </div>
                  <div className={`${styles.creatorBox} ${styles.contBox}`}>
                    <Eye />

                    <p>{new Intl.NumberFormat().format(1000000)}</p>
                  </div>
                </div>

                <div className={styles.rightCont}>
                  <button className={styles.urlCopyBtn} onClick={() => {}}>
                    URL 복사
                  </button>

                  <div className={styles.btnBox}>
                    <button
                      className={styles.moreBtn}
                      onClick={() => useCustomHook.setMorePopup(true)}
                    >
                      <Dot3 />
                    </button>

                    {useCustomHook.morePopup && (
                      <>
                        <PostMorePopup useCustomHook={useCustomHook} />
                        <PopupBg
                          off={() => useCustomHook.setMorePopup(false)}
                        />
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </article>

          <article className={styles.contArea}>
            <img
              src={"https://picsum.photos/792"}
              alt=""
              onClick={(e: any) => useCustomHook.setImgPopup(e.target.src)}
            />

            <p>
              {`자전거로 출퇴근을 시작하면 가장 큰 문제는 피로도라 할 수 있습니다. 초반에 몸에 무리가 가지 않도록 하는 것이 중요합니다. 그래서 저는 처음에는 격일 출퇴근을 하였습니다. 일주일에 한번, 하루는 자전거를 타고 출근한 후 퇴근할 때 자전거를 놔두고 대중교통을 이용하였습니다.
 `}
            </p>

            <img src={"https://picsum.photos/792"} alt="" />

            <p>{`자전거로 출퇴근을 시작하면 가장 큰 문제는 피로도라 할 수 있습니다. 초반에 몸에 무리가 가지 않도록 하는 것이 중요합니다. 그래서 저는 처음에는 격일 출퇴근을 하였습니다.
일주일에 한번, 하루는 자전거를 타고 출근한 후 퇴근할 때 자전거를 놔두고 대중교통을 이용하였습니다.`}</p>
          </article>

          <article className={styles.likeArea}>
            <div
              className={`${useCustomHook.like === 1 ? styles.up : ""} ${
                useCustomHook.like === -1 ? styles.dn : ""
              } ${styles.innerCont}`}
            >
              <button
                className={styles.likeBtn}
                onClick={() => useCustomHook.onClickLikeBtn(1)}
              >
                {useCustomHook.like === 1 ? <ThumbUpRed /> : <ThumbUpGrey />}
                <p>+1P</p>
              </button>

              <div className={styles.currentBox}>
                <p>현재가</p>
                <h2 className={styles.price}>{`${new Intl.NumberFormat().format(
                  9999999
                )}P`}</h2>
                <p className={styles.percent}>+2.1%</p>
              </div>

              <button
                className={styles.likeBtn}
                onClick={() => useCustomHook.onClickLikeBtn(-1)}
              >
                {useCustomHook.like === -1 ? <ThumbDnBlue /> : <ThumbDnGrey />}
                <p>-1P</p>
              </button>
            </div>
          </article>

          <article className={styles.replyArea}>
            <ul className={styles.tagList}>
              {new Array(6).fill("").map((v, i) => (
                <li key={i}>{`#태그 ${i}`}</li>
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
                  ref={useCustomHook.inputRef}
                  value={useCustomHook.reply}
                  onChange={(e) => useCustomHook.setReply(e.target.value)}
                  placeholder="댓글을 입력해주세요"
                />

                <button
                  className={styles.inputBtn}
                  onClick={() => {
                    useCustomHook.inputRef.current?.focus();
                    console.log(useCustomHook.reply);
                  }}
                >
                  {useCustomHook.reply}
                </button>

                <button
                  className={styles.enrollBtn}
                  onClick={() => useCustomHook.setReply("")}
                >
                  입력
                </button>
              </div>

              <ul className={styles.replyList}>
                {useCustomHook.replyList.map((v, i) => (
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
        </section>

        <aside>
          <article className={styles.creatorArea}>
            <div className={styles.profImgBox}>
              <img src={DefaultProfImg.src} alt="" />
            </div>

            <div className={styles.nicknameBar}>
              <h1 className={styles.nickname}>치은짱짱맨</h1>
              <Gold />
            </div>

            <p className={styles.profMsg}>
              {`재테크, 투자, 자동차 전문가입니다.
12년간 7개의 은행, 증권사, 투자은행을 다닌 경험이 있으며, 시드 2000천으로 현재 자산 58억 달성한 모든 비법을 공유합니다. 다들 따라오세요!!! 가보자구욧~!~!`}
            </p>
          </article>

          <article className={`${styles.otherPostArea} ${styles.postListArea}`}>
            <p className={styles.areaTitle}>치은짱짱맨님의 다른 글</p>

            <ul className={styles.postList}>
              {useCustomHook.otherPostList.map((v, i) => (
                <li key={i}>
                  <div className={styles.topBar}>
                    <p>
                      <strong className={styles.category}>{v.category}</strong>
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
            </ul>
          </article>

          <article
            className={`${styles.categoryPopularPostList} ${styles.postListArea}`}
          >
            <p className={styles.areaTitle}>커리어 카테고리의 인기글</p>

            <ul className={styles.postList}>
              {useCustomHook.otherPostList.map((v, i) => (
                <li key={i}>
                  <div className={styles.topBar}>
                    <p>
                      <strong className={styles.category}>{v.category}</strong>
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
            </ul>
          </article>
        </aside>
      </main>

      <CommonFooter />

      {useCustomHook.postVerPopup && (
        <>
          <PostVerPopup off={() => useCustomHook.setPostVerPopup(false)} />
          <PopupBg bg off={() => useCustomHook.setPostVerPopup(false)} />
        </>
      )}

      {useCustomHook.imgPopup && (
        <>
          <PostImgPopup imgUrl={useCustomHook.imgPopup} />
          <PopupBg bg off={() => useCustomHook.setImgPopup("")} />
        </>
      )}

      {useCustomHook.reportPostPopup && (
        <>
          <ReportPostPopup
            off={() => useCustomHook.setReportPostPopup(false)}
            confirmFunc={useCustomHook.onSuccessReportPost}
          />
          <PopupBg bg off={() => useCustomHook.setReportPostPopup(false)} />
        </>
      )}

      {useCustomHook.reportUserPopup && (
        <>
          <ReportUserPopup
            off={() => useCustomHook.setReportUserPopup(false)}
            confirmFunc={useCustomHook.onSuccessReportUser}
          />
          <PopupBg bg off={() => useCustomHook.setReportUserPopup(false)} />
        </>
      )}

      {useCustomHook.hideUserPostPopup && (
        <>
          <ConfirmPopup
            title="이 사용자의 글을 숨기시겠어요?"
            content="이미 구매한 글을 제외하고 wooAng님의 게시글을 더는 보이지 않아요."
            confirmFunc={() => useCustomHook.setHideUserPostPopup(false)}
            cancelFunc={() => useCustomHook.setHideUserPostPopup(false)}
          />
          <PopupBg bg off={() => useCustomHook.setHideUserPostPopup(false)} />
        </>
      )}

      {useCustomHook.compReportPopup && (
        <>
          <ErrorMsgPopup
            msg="신고가 접수되었습니다."
            confirmFunc={() => useCustomHook.setHideUserPostPopup(false)}
          />
          <PopupBg bg off={() => useCustomHook.setHideUserPostPopup(false)} />
        </>
      )}
    </>
  );
}
