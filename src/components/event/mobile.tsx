import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRecoilValue } from "recoil";

import eventText from "../../../public/assets/images/event/event-text.png";
import event1 from "../../../public/assets/images/event/event1.png";
import event2 from "../../../public/assets/images/event/event2.png";
import enrollImg from "../../../public/assets/images/event/enroll-img.png";
import likeImg from "../../../public/assets/images/event/like-img.png";
import codeImg from "../../../public/assets/images/event/code.png";
import promotionImg from "../../../public/assets/images/event/promotion.png";
import mLogo from "../../../public/assets/images/serviceIntroduction/m-logo.png";

import styles from "./mobile.module.scss";
import ErrorMsgPopup from ".src/components/common/popup/errorMsgPopup";
import ConfirmTitlePopup from ".src/components/common/popup/confirmTitlePopup";
import PopupBg from ".src/components/common/popupBg";
import { isLoginState } from ".src/recoil";
import MobileHeader from "../common/header/mobileHeader";
import classNames from "classnames";

const Event = ({
  isClient,
  isAndroid,
}: {
  isClient: boolean;
  isAndroid: boolean;
}) => {
  const isSignedIn = useRecoilValue(isLoginState);

  const [copyPopup, setCopyPopup] = useState<boolean>(false);
  const [preparePopup, setPreparePopup] = useState<boolean>(false);

  const onLinkShare = () => {
    if (isClient) {
      //@ts-ignore
      BbxClient.postMessage(
        JSON.stringify({ share: "https://stage-bibeop.com/event" })
      );
      return;
    }
    setCopyPopup(true);
    window.navigator.clipboard.writeText("https://stage-bibeop.com/event");
  };

  const onClickPost = () => {
    //@ts-ignore
    BbxClient.postMessage(JSON.stringify({ destination: "post" }));
  };

  const onClickAppLink = () => {
    if (isAndroid) {
      setPreparePopup(true);
    } else
      window.location.assign(
        "https://apps.apple.com/kr/app/%EB%B9%84%EB%B2%95%EA%B1%B0%EB%9E%98%EC%86%8C-%EA%B8%80%EB%A1%9C-%EB%8F%88-%EB%B2%84%EB%8A%94-%EC%B4%88%EA%B0%84%EB%8B%A8-%EB%B6%80%EC%88%98%EC%9E%85-%EC%95%B1%ED%85%8C%ED%81%AC/id6446600331"
      );
  };

  return (
    <>
      {!isClient && <MobileHeader />}
      <main className={classNames(styles.eventPage, !isClient && styles.web)}>
        <section className={styles.section1}>
          <p className={styles.section1SubTitle}>100만원의 주인공은 누구?</p>
          <Image src={eventText} alt="" width={337} />
          <div className={styles.section1Bg}>
            <div className={styles.section1Box}>
              이직, 결혼, 육아, 취준 등<br /> 묵혀둔 나의 꿀팁들을 공유하면
              <br /> <strong>100만 원</strong>을 드려요!
            </div>
          </div>
        </section>

        <section className={styles.section2}>
          <Image src={event1} alt="" width={122} />
          <p className={styles.sectionInfo}>
            최강 비법 선발전!
            <br />
            출시 기념 <strong>100만 원</strong> 쏩니다
          </p>

          <div className={styles.eventBox}>
            <div className={styles.eventTop}>
              <div className={styles.box}>
                <div>
                  <span className={styles.title}>참여 방법</span>
                  <p className={styles.subTitle1}>
                    비법거래소에 내가 가진
                    <br /> 궁극의 꿀팁, 경험, 노하우 등의
                    <br />
                    <strong className={styles.blueText}>비법</strong>을 올려요.
                  </p>
                </div>
                <Image
                  className={styles.section2Img1}
                  src={enrollImg}
                  alt=""
                  width={175}
                />
              </div>

              <div className={styles.box}>
                <div>
                  <span className={styles.title}>선정 방법</span>
                  <p className={styles.subTitle2}>
                    이벤트 기간 내 비법거래소에서
                    <br />
                    <strong className={styles.redText}>
                      가장 높은 좋아요
                    </strong>{" "}
                    수를 받으면 돼요.
                  </p>
                </div>
                <Image
                  className={styles.section2Img2}
                  src={likeImg}
                  alt=""
                  width={128}
                />
              </div>
            </div>

            <div className={styles.eventBottom}>
              <div className={styles.eventBottomBox}>
                <div className={styles.bottomTitle}>꿀팁 1</div>
                <p className={styles.bottomText}>
                  내 글을 친구들 혹은 SNS를 통해
                  <br />
                  열심히 홍보해서 좋아요를 늘려도 좋아요.
                </p>
              </div>
              <div className={styles.eventBottomBox}>
                <div className={styles.bottomTitle}>꿀팁 2</div>
                <p className={styles.bottomText}>
                  어떤 글이 인기 많을지 모르니,
                  <br />
                  여러 개의 글을 써서 1등 확률을 높이세요.
                </p>
              </div>
            </div>
          </div>

          {!isClient && (
            // <Link href={isSignedIn ? "/enroll" : "/auth/signin"}>
            <button
              onClick={onClickAppLink}
              className={`${styles.btn} ${styles.btn1}`}
            >
              100만원의 주인공 되기
            </button>
            // </Link>
          )}
          {isClient && (
            <button
              className={`${styles.btn} ${styles.btn1}`}
              onClick={onClickPost}
            >
              100만원의 주인공 되기
            </button>
          )}
        </section>

        <section className={styles.section3}>
          <Image src={event2} alt="" width={126} />
          <p className={styles.sectionInfo}>
            꿀팁 많고, 글 잘 쓰는 <strong>친구 초대하기!</strong>
            <br />
            친구가 1등 하면,
            <br /> 친구도 나도 100만 원 받아요.
          </p>

          <div className={styles.eventBox}>
            <div className={styles.section3EventTop}>
              <div>
                <div className={styles.box}>
                  <div>
                    <span className={styles.title}>참여 방법</span>
                    <p className={styles.subTitle1}>
                      글 잘쓰는 친구를 초대하고,
                      <br />
                      <strong className={styles.redText}>
                        친구의 글이 1등
                      </strong>
                      하길 기도해요.
                    </p>
                  </div>
                </div>

                <div className={styles.box}>
                  <div>
                    <span className={styles.title}>선정 방법</span>
                    <p className={styles.subTitle2}>
                      친구가 1등하면 친구는 물론
                      <br />
                      초대한{" "}
                      <strong className={styles.blueText}>나도 100만 원</strong>
                      을 받아요.
                    </p>
                  </div>
                </div>
              </div>
              <Image src={codeImg} alt="" width={200} />
            </div>

            <div className={styles.eventBottom}>
              <div>
                <div className={styles.bottomTitle}>꿀팁 1</div>
                <p className={styles.bottomText}>
                  친구의 글도 SNS를 통해
                  <br />
                  열심히 홍보해서 좋아요를 늘려도 좋아요.
                </p>
              </div>
              <Image
                src={promotionImg}
                alt=""
                width={113}
                className={styles.promotImg}
              />
            </div>
          </div>
          <button
            onClick={onLinkShare}
            className={`${styles.btn} ${styles.btn2}`}
          >
            이벤트 공유하기
          </button>
        </section>

        <div className={styles.footer}>
          <div className={styles.footerTitle}>이벤트 유의사항</div>
          <ul>
            <li>
              <span className={styles.listMark} />
              2024년 3월 31일 23시 59분 59초 기준 가장 높은 좋아요를 받아 가치를
              인정받은 글의 소유자분께 100만원의 상금을 드려요.
            </li>
            <li>
              <span className={styles.listMark} />
              EVENT 2는 친구가 가입할 경우, 추천인 코드를 꼭 입력해야해요.
              추천인 코드는 마이페이지에서 찾을 수 있어요.
            </li>
            <li>
              <span className={styles.listMark} />
              하나의 계정으로 여러개의 게시글을 작성하여 참여할 수 있어요.
            </li>
            <li>
              <span className={styles.listMark} />
              비법거래소에서 좋아요를 받은 글만 인정돼요.
            </li>
            <li>
              <span className={styles.listMark} />
              어뷰징 행위가 확인된 계정들은 영구 이용제한 조치되며, 상금 이벤트
              대상에서 제외돼요.
            </li>
            <li>
              <span className={styles.listMark} />
              제세공과금은 비법거래소가 대신 내드려요.
            </li>
          </ul>
        </div>

        {!isClient && (
          <div className={styles.moveApp}>
            <div className={styles.moveAppLeft}>
              <Image src={mLogo} alt="" />
              <p className={styles.moveAppText1}>
                <strong>비법거래소</strong>를 앱으로 편리하게 이용하세요!
              </p>
            </div>
            <p className={styles.moveAppText2} onClick={onClickAppLink}>
              앱으로 이용하기
            </p>
          </div>
        )}
      </main>

      {preparePopup && (
        <>
          <ConfirmTitlePopup
            title="안드로이드 앱 심사중!"
            content={`안드로이드 앱은 아직 심사중입니다.
PC를 통해 비법거래소를 만나보세요!`}
            confirmText="확인"
            confirmFunc={() => setPreparePopup(false)}
            zIndex={80}
          />
          <PopupBg bg zIndex={70} off={() => setPreparePopup(false)} />
        </>
      )}

      {copyPopup && (
        <>
          <ErrorMsgPopup
            msg="URL이 복사되었습니다."
            confirmFunc={() => setCopyPopup(false)}
          />
          <PopupBg bg off={() => setCopyPopup(false)} />
        </>
      )}
    </>
  );
};

export default Event;
