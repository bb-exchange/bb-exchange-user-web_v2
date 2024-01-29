import ToggleSwitch from ".src/components/common/toggle/toggleSwitch";
import styles from "./setting.module.scss";
import { useState } from "react";
import ConfirmPopup from ".src/components/common/popup/confirmPopup";
import ConfirmTitlePopup from ".src/components/common/popup/confirmTitlePopup";
import PopupBg from ".src/components/common/popupBg";
import { useSignOut } from ".src/hooks/common/useSignOut";
import { useRouter } from "next/router";
import { withdrawal } from ".src/api/users/users";
import ErrorMsgPopup from ".src/components/common/popup/errorMsgPopup";

export default function Setting() {
  const router = useRouter();
  const [logOut] = useSignOut();
  const [alertChecked, setAlertChecked] = useState(true);
  const [marketingChecked, setMarketingChecked] = useState(true);
  const [alertPopup, setAlertPopup] = useState(
    router.query.alertPopup === "true" || false
  );
  const [marketingPopup, setMarketingPopup] = useState(
    router.query.marketingPopup === "true" || false
  );
  const [logOutPopup, setLogOutPopup] = useState(
    router.query.logOutPopup === "true" || false
  );
  const [withdrawPopup, setWithdrawPopup] = useState(
    router.query.withdrawPopup === "true" || false
  );
  const [inactiveFn, setInactiveFn] = useState(false);

  const openInactivePopup = () => {
    setInactiveFn(true);
  };

  return (
    <div className={styles.setting}>
      <div className={styles.contentBox}>
        <div className={styles.titleWrap}>
          <h2>설정</h2>
        </div>
        <div className={styles.gridBoxWrap}>
          <div className={styles.box}>
            <h3>알림</h3>
            <ul>
              <li
                onClick={() => openInactivePopup()}
                className={styles.boxAlert}
              >
                <div>
                  <span>활동알림</span>
                  <span className={styles.smallText}>상장, 댓글 등 알림</span>
                </div>
                <ToggleSwitch
                  setPopup={setAlertPopup}
                  isChecked={alertChecked}
                  setIsChecked={setAlertChecked}
                />
              </li>
              <li
                onClick={() => openInactivePopup()}
                className={styles.boxAlert}
              >
                <div>
                  <span>마케팅 알림</span>
                  <span className={styles.smallText}>
                    마케팅 정보 수신 동의 2023-12-21
                  </span>
                </div>
                <ToggleSwitch
                  setPopup={setMarketingPopup}
                  isChecked={marketingChecked}
                  setIsChecked={setMarketingChecked}
                />
              </li>
            </ul>
          </div>
          <div className={styles.box}>
            <h3>고객센터</h3>
            <ul>
              <li
                onClick={() => {
                  window.open(
                    "https://bbexchange.notion.site/de262be556504eafad04f699c006f5e4"
                  );
                  // router.push("/board/notice")
                }}
              >
                공지사항
              </li>
              <li
                onClick={() => {
                  window.open(
                    "https://bbexchange.notion.site/af49e261ae3a465a81097d9ad1715fb0"
                  );
                  // router.push("/board/faq")
                }}
              >
                FAQ
              </li>
              <li
                onClick={() => {
                  openInactivePopup();
                  // router.push("/board/inquiry/post")
                }}
              >
                1:1 문의/내역
              </li>
            </ul>
          </div>
          <div className={styles.box}>
            <h3>사용자관리</h3>
            <ul>
              <li
                onClick={() => {
                  openInactivePopup();
                  // router.push("/user/blocked")
                }}
              >
                차단 사용자 관리
              </li>
              <li
                onClick={() => {
                  openInactivePopup();
                  // router.push("/user/hidden")
                }}
              >
                숨긴 사용자 관리
              </li>
            </ul>
          </div>
          <div className={styles.box}>
            <h3>약관 및 정책</h3>
            <ul>
              <li
                onClick={() =>
                  router.push({
                    pathname: "/terms/service",
                  })
                }
              >
                서비스 이용약관
              </li>
              <li
                onClick={() =>
                  router.push({
                    pathname: "/terms/privacy",
                  })
                }
              >
                개인정보 처리방침
              </li>
            </ul>
          </div>
          <div className={styles.box}>
            <h3>정보 관리</h3>
            <ul>
              <li onClick={() => setLogOutPopup(true)}>로그아웃</li>
              <li onClick={() => setWithdrawPopup(true)}>탈퇴하기</li>
            </ul>
          </div>
        </div>
      </div>
      {/* {alertPopup && (
        <>
          <ConfirmPopup
            title="활동 알림을 끄시겠습니까?"
            content={
              <>
                <span>상장, 댓글 등의 주요 알림을</span>
                <br />
                <span>받아볼 수 없게 됩니다</span>
              </>
            }
            cancelFunc={() => setAlertPopup(false)}
            confirmFunc={() => {
              setAlertChecked(false);
              setAlertPopup(false);
            }}
          />
          <PopupBg bg off={() => setAlertPopup(false)} />
        </>
      )} */}
      {/* {marketingPopup && (
        <>
          <ConfirmPopup
            title="마케팅 알림을 끄시겠습니까?"
            content={
              <>
                <span>비법거래소에서 고객님을 위해 준비한</span>
                <br />
                <span>다양한 이벤트와 관련된 알림을</span>
                <br />
                <span>받아볼 수 없게 됩니다</span>
              </>
            }
            cancelFunc={() => setMarketingPopup(false)}
            confirmFunc={() => {
              setMarketingChecked(false);
              setMarketingPopup(false);
            }}
          />
          <PopupBg bg off={() => setMarketingPopup(false)} />
        </>
      )} */}
      {inactiveFn && (
        <>
          <ConfirmTitlePopup
            title="앗! 개발중입니다."
            content={`비법거래소 배타버전에서는 아직 작동하지
않는 기능입니다. 빨리 준비해볼게요!!`}
            confirmText="확인"
            confirmFunc={() => setInactiveFn(false)}
            zIndex={80}
          />
          <PopupBg bg zIndex={70} off={() => setInactiveFn(false)} />
        </>
      )}
      {logOutPopup && (
        <>
          <ConfirmPopup
            title="로그아웃하시겠습니까?"
            content={null}
            cancelFunc={() => setLogOutPopup(false)}
            confirmFunc={() => {
              setLogOutPopup(false);
              logOut();
            }}
          />
          <PopupBg bg off={() => setLogOutPopup(false)} />
        </>
      )}
      {withdrawPopup && (
        <>
          <ConfirmPopup
            title="계정을 탈퇴하시겠습니까?"
            content={
              <>
                <span>1. 모든 게시글이 비공개로 전환됩니다.</span>
                <br />
                <span>
                  2.상장글의 경우 비공개 전환 후 마지막 <br />
                  정산이 이루어진 뒤 최종 탈퇴 처리됩니다.
                </span>
              </>
            }
            cancelFunc={() => setWithdrawPopup(false)}
            confirmFunc={async () => {
              setWithdrawPopup(false);
              const res = await withdrawal();
              if (res.status === 204) {
                logOut();
              }
            }}
          />
          <PopupBg bg off={() => setWithdrawPopup(false)} />
        </>
      )}
    </div>
  );
}

export function getStaticProps() {
  return { props: { commonLayout: true } };
}
