import Image from "next/image";
import { useRouter } from "next/router";

import section1 from "../../../public/assets/images/serviceIntroduction/section1.png";
import mSection2 from "../../../public/assets/images/serviceIntroduction/m-section2.png";
import mSection3 from "../../../public/assets/images/serviceIntroduction/m-section3-1.png";
import section32 from "../../../public/assets/images/serviceIntroduction/section3-2.png";
import section4 from "../../../public/assets/images/serviceIntroduction/section4-1.png";
import section42 from "../../../public/assets/images/serviceIntroduction/section4-2.png";
import section43 from "../../../public/assets/images/serviceIntroduction/section4-3.png";
import section44 from "../../../public/assets/images/serviceIntroduction/section4-4.png";
import section45 from "../../../public/assets/images/serviceIntroduction/section4-5.png";
import section5 from "../../../public/assets/images/serviceIntroduction/section5.png";
import mBanner from "../../../public/assets/images/serviceIntroduction/m-banner.png";
import mLogo from "../../../public/assets/images/serviceIntroduction/m-logo.png";
import mLogoText from "../../../public/assets/images/serviceIntroduction/m-logo-text.png";

import styles from "./mobile.module.scss";
import MobileHeader from "../common/header/mobileHeader";
import classNames from "classnames";
import ConfirmTitlePopup from ".src/components/common/popup/confirmTitlePopup";
import PopupBg from ".src/components/common/popupBg";
import { useState } from "react";

const DesktopPage = ({
  isClient,
  isAndroid,
}: {
  isClient: boolean;
  isAndroid: boolean;
}) => {
  const router = useRouter();

  const [preparePopup, setPreparePopup] = useState<boolean>(false);

  const onClickMoveToHome = () => {
    // TODO 작성하기 이동
    if (isClient) {
      //@ts-ignore
      BbxClient.postMessage(JSON.stringify({ destination: "home" }));
      return;
    } else onClickAppLink();
  };
  const onClickMoveToEvent = () => {
    if (isClient) {
      //@ts-ignore
      BbxClient.postMessage(JSON.stringify({ destination: "event" }));
    } else router.push("/event");
  };

  const onClickMoveToGuide = () => {
    if (isClient) {
      //@ts-ignore
      BbxClient.postMessage(JSON.stringify({ destination: "guide" }));
      return;
    }
    router.push("/guide");
  };

  const onClickAppLink = () => {
    if (isAndroid) {
      setPreparePopup(true);
    } else window.location.assign(`${process.env.NEXT_PUBLIC_APPLE_APP_STORE}`);
  };

  return (
    <>
      {!isClient && <MobileHeader />}
      <main className={classNames(styles.service, !isClient && styles.web)}>
        <section className={styles.section1}>
          {/* <span>글로 돈 버는 초간단 부수입 앱테크</span>
          <strong>비법거래소</strong> */}
          <Image src={mLogoText} alt="" className={styles.logoText} />
          <Image src={section1} alt="" />

          <button
            className={`${styles.btn} ${styles.section1Btn}`}
            onClick={onClickMoveToHome}
          >
            {isClient ? "수익 창출하러 가기" : "APP 다운받기"}
          </button>
        </section>

        <section className={styles.section2}>
          <h3>
            <div>
              누구한테도 말하기 아까운
              <br /> 나의 소중한 경험과 지식,
            </div>
            <strong>비법거래소에서 판매하세요!</strong>
          </h3>

          <Image className={styles.section2Img} src={mSection2} alt="" />
        </section>

        <section className={styles.section3}>
          <div className={styles.section3Box}>
            <h3 className={styles.title}>내 글이 돈이 된다고?</h3>
            <p className={styles.subTitle}>
              좋아요 100개만 받으면
              <br />
              수익화가 시작됩니다.
            </p>
            <Image className={styles.section3Img1} src={mSection3} alt="" />
            <p className={styles.infoText}>
              내 글이 사람들에게 <strong>좋아요 100개</strong>를 받으면
              <br />
              글은 <strong>100포인트로 상장</strong>되어
              <br /> 수익창출이 시작돼요.
            </p>
          </div>

          <div className={styles.section3Box}>
            <h3 className={styles.title}>공정한 기회</h3>
            <p className={styles.subTitle}>
              좋아요가 더 쌓일수록
              <br />더 두둑해지는 내 지갑!
            </p>
            <Image
              className={styles.section3Img2}
              src={section32}
              alt=""
              width={422}
            />
            <p className={styles.infoText}>
              글을 읽은 사용자들에게
              <br /> 더 많은 좋아요를 받을수록
              <br />내 글은 점점 더 높은 가격에 거래돼요.
            </p>
          </div>
        </section>

        <section className={styles.section4}>
          <div className={styles.titleArea}>
            <h3 className={styles.title}>비법거래소 수익창출 방법</h3>
            <p className={styles.subTitle}>
              나의 글이
              <br />
              어떻게 돈을 벌어올까요?
            </p>
          </div>
          <ul>
            <li>
              <div className={styles.section4ListNum}>01</div>
              <p className={styles.section4ListText}>
                내 상장글의 첫 구매자는
                <br />
                100P를 내고 글을 읽을 수 있어요.
              </p>
              <Image src={section4} alt="" />
            </li>
            <li>
              <div className={styles.section4ListNum}>02</div>
              <p className={styles.section4ListText}>
                첫 구매자가 좋아요를 누르면
                <br />
                글 가격은 101P로 상승해요!
                <br />
                반대로 싫어요를 받으면 글 가격은 하락해요.
              </p>
              <Image src={section42} alt="" />
            </li>
            <li>
              <div className={styles.section4ListNum}>03</div>
              <p className={styles.section4ListText}>
                두번째 구매자는 <br />
                1P 상승된 101P에 글을 읽을 수 있어요.
              </p>
              <Image src={section43} alt="" />
            </li>
            <li>
              <div className={styles.section4ListNum}>04</div>
              <p className={styles.section4ListText}>
                이 과정이 반복되며 글의 가격은 상승과
                <br />
                하락을 반복하며 계속 판매돼요.
              </p>
              <Image src={section44} alt="" />
            </li>
            <li>
              <div className={styles.section4ListNum}>05</div>
              <p className={styles.section4ListText}>
                판매 대금은 마이페이지에서
                <br />
                수수료를 제외하고 출금할 수 있어요.
              </p>
              <Image src={section45} alt="" />
            </li>
          </ul>
        </section>

        <section className={styles.section5}>
          <h3 className={styles.title}>어떻게 글을 써야할지 모르겠다구?</h3>
          <p className={styles.subTitle}>작성 가이드라인!</p>
          <Image src={section5} alt="" />
          <p className={styles.section5Text}>
            여러분의 꿀팁, 경험, 지식, 이야기 모두
            <br />
            누군가에게는 꼭 필요한 비법입니다.
          </p>
          <button
            className={`${styles.btnLine} ${styles.section5Btn}`}
            onClick={onClickMoveToGuide}
          >
            비법거래소 작성 가이드 {">"}
          </button>
        </section>

        <section className={styles.section6}>
          <h4 className={styles.section6Title}>
            당신의 꿀팁,
            <br />
            지금 바로 자산으로 바꿔보세요!
          </h4>
          {!isClient ? (
            <button
              onClick={onClickAppLink}
              className={`${styles.btn} ${styles.section6Btn}`}
            >
              수익 창출하러 가기
            </button>
          ) : (
            <button
              className={`${styles.btn} ${styles.section6Btn}`}
              onClick={onClickMoveToHome}
            >
              수익 창출하러 가기
            </button>
          )}
          <button onClick={onClickMoveToEvent}>
            <Image src={mBanner} alt="" />
          </button>
        </section>

        {!isClient && (
          <div className={styles.moveApp}>
            <div className={styles.moveAppLeft}>
              <Image src={mLogo} alt="" />
              <p className={styles.moveAppText1}>
                <strong>비법거래소</strong>를 앱으로 편리하게 이용하세요!
              </p>
            </div>
            <p onClick={onClickAppLink} className={styles.moveAppText2}>
              앱으로 이용하기
            </p>
          </div>
        )}
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
      </main>
    </>
  );
};

export default DesktopPage;
