import styles from "./commonFooter.module.scss";
import Apple from ".assets/icons/Apple.svg";
import Google from ".assets/icons/Google.svg";
import router from "next/router";
import ConfirmTitlePopup from ".src/components/common/popup/confirmTitlePopup";
import PopupBg from "./popupBg";
import { useState } from "react";
import Image from "../Image";

export default function CommonFooter() {
  const [androidPopup, setAndroidPopup] = useState<boolean>(false);
  const [applePopup, setApplePopup] = useState<boolean>(false);

  const onClickOpenKakaoChannel = () =>
    window.open("http://pf.kakao.com/_xbTmcxj");

  const onClickDownloadAndroid = () => setAndroidPopup(true);
  const onClickDownloadApple = () => setApplePopup(true);

  return (
    <footer className={styles.commonFooter}>
      <section className={styles.innerSec}>
        <article className={styles.leftArea}>
          <ul className={styles.infoList}>
            <li>
              <strong className={styles.company}>비법거래소</strong>
              <hr />
              <p className={styles.companyNum}>
                <strong>사업자번호</strong> 495-59-00604
              </p>
              <hr />
              <p className={styles.manager}>
                <strong>대표</strong> 민윤기
              </p>
            </li>
            <li>
              {/* <p>
                <strong>통신판매업신고</strong> 2023-서울서초-1234
              </p> */}
              <p>
                <strong>대표번호</strong> 1688-8078
              </p>
            </li>
            <li>
              <p>
                <strong>주소</strong> 경기도 용인시 수지구 현암로 148,
                602호(비법거래소)
              </p>
            </li>
          </ul>

          <div className={styles.rightArea}>
            <strong className={styles.label}>비법거래소 APP Download</strong>
            <div className={styles.btnBox}>
              <button onClick={onClickDownloadApple}>
                <Apple />
                <strong>APP Store</strong>
              </button>

              <button
                className={styles.google}
                onClick={onClickDownloadAndroid}
              >
                <Google />

                <strong>Google Play</strong>
              </button>
            </div>
          </div>
        </article>

        <article className={styles.bottomArea}>
          <p className={styles.infoText}>
            비법거래소는 통신판매중개시스템의 제공자로서 통신판매의 당사자가
            아닙니다. 콘텐츠 생산, 환불 등과 관련한 의무와 책임은 판매자에게
            있습니다.
          </p>
          <ul className={styles.categoryList}>
            <li onClick={() => window.open("/terms/service")}>
              <p>이용약관</p>
            </li>

            <li onClick={() => window.open("/terms/privacy")}>
              <strong>개인정보처리방침</strong>
            </li>

            <li onClick={onClickOpenKakaoChannel}>
              <p>비법거래소 고객센터</p>
            </li>

            <li onClick={onClickOpenKakaoChannel}>
              <p>카카오톡 1:1 문의</p>
            </li>

            <li onClick={onClickOpenKakaoChannel}>
              <p>제휴제안</p>
            </li>
          </ul>
        </article>
      </section>

      {applePopup && (
        <>
          <ConfirmTitlePopup
            title="비법거래소 앱 다운로드"
            content={
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Image
                  src={"/assets/images/apple_qr_code.png"}
                  alt={"apple_app"}
                  width={200}
                  height={200}
                />
                <span>코드를 카메라로 스캔하여</span>
                <span>앱스토어로 이동합니다.</span>
              </div>
            }
            confirmText="닫기"
            confirmFunc={() => setApplePopup(false)}
            zIndex={80}
          />
          <PopupBg bg zIndex={70} off={() => setApplePopup(false)} />
        </>
      )}

      {androidPopup && (
        <>
          <ConfirmTitlePopup
            title="비법거래소 앱 다운로드"
            content={
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Image
                  src={"/assets/images/android_qr_code.png"}
                  alt={"apple_app"}
                  width={200}
                  height={200}
                />
                <span>코드를 카메라로 스캔하여</span>
                <span>구글 플레이 스토어로 이동합니다.</span>
              </div>
            }
            confirmText="닫기"
            confirmFunc={() => setAndroidPopup(false)}
            zIndex={80}
          />
          <PopupBg bg zIndex={70} off={() => setAndroidPopup(false)} />
        </>
      )}
    </footer>
  );
}
