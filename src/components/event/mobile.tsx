import { useState } from "react";
import Image from "next/image";
import { useRecoilValue } from "recoil";

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
  eventUrl,
}: {
  isClient: boolean;
  isAndroid: boolean;
  eventUrl: string;
}) => {
  const [copyPopup, setCopyPopup] = useState<boolean>(false);
  const [preparePopup, setPreparePopup] = useState<boolean>(false);

  const onClickAppLink = () => {
    if (isAndroid) {
      setPreparePopup(true);
    } else window.location.assign(`${process.env.NEXT_PUBLIC_APPLE_APP_STORE}`);
  };

  return (
    <>
      {!isClient && <MobileHeader />}
      <main className={classNames(styles.eventPage, !isClient && styles.web)}>
        <section className={styles.section1}>
          <p className={styles.title1}>정칙 출시 기념</p>
          <p className={styles.title2}>로켓상장 이벤트</p>
          <p className={styles.title3}>
            정식 출시 기념으로 크리에이터 분들의 글을
            <br />더 빨리, 더 많이 팔 수 있도록 지원해요!
          </p>
        </section>

        <section className={styles.section2}>
          <span className={styles.tag}>EVENT</span>
          <p className={styles.title1}>로켓 상장 이벤트</p>
          <p className={styles.title2}>
            선착순 100개의 글을
            <br />
            좋아요 50개에 <span className={styles.highlight}>
              조기상장
            </span>{" "}
            시켜드려요!
          </p>

          <div className={styles.cardArea}>
            <div className={styles.card}>
              <p className={styles.title}>STEP 1</p>
              <span className={styles.content}>
                비법거래소에 사람들이 좋아할
                <br /> 나만의 경험, 나만아는 지식,
                <br /> 인생 꿀팁 등을 올린다.
              </span>
            </div>

            <div className={styles.card}>
              <p className={styles.title}>STEP 2</p>
              <span className={styles.content}>
                내 글이 <span className={styles.highlight}>좋아요 50개</span>가
                되어
                <br /> 상장되도록 열심히
                <br /> 친구들에게 홍보한다.
              </span>
            </div>

            <div className={styles.card}>
              <p className={styles.title}>STEP 3</p>
              <span className={styles.content}>
                상장된 글을 통해
                <br /> 수익을 즐긴다.
              </span>
            </div>
          </div>

          <p className={styles.title1}>
            로켓 성장을 위한
            <br /> 마케팅 지원까지!
          </p>
          <p className={styles.title2}>
            상장된 글이 더 많이 판매될 수 있도록
            <br />
            인스타, 블로그, 틱톡 등에 대신 마케팅을 해드려요.
          </p>
        </section>

        <section className={styles.section3}>
          <p className={styles.title}>선착순 100명 마감 임박!</p>
          <button className={styles.button} onClick={onClickAppLink}>
            글 작성하기
          </button>
        </section>

        <div className={styles.footer}>
          <div className={styles.footerTitle}>
            하단 유의사항을 꼭 읽어주세요
          </div>
          <ul>
            <li>
              <span className={styles.listMark} />
              이벤트 진행 일정 : 2024.3.25 (월) 11:00 ~ 선착순 100명 마감시까지
            </li>
            <li>
              <span className={styles.listMark} />본 이벤트는 당사 사정에 따라
              사전 고지 없이 변경, 종료될 수 있습니다.
            </li>
            <li>
              <span className={styles.listMark} />
              하나의 계정으로 여러개의 게시글을 작성하여 참여할 수 있습니다.
            </li>
            <li>
              <span className={styles.listMark} />
              비법거래소에서 좋아요를 받은 글만 인정됩니다.
            </li>
            <li>
              <span className={styles.listMark} />
              어뷰징 행위가 확인된 계정들은 영구 이용제한 조치됩니다.
            </li>
            <li>
              <span className={styles.listMark} />
              상금 이벤트의 제세공과금은 비법거래소가 부담합니다.
            </li>
            <li>
              <span className={styles.listMark} />
              마케팅 홍보를 원치 않으실 경우 고객센터를 통해 알려주세요.
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
