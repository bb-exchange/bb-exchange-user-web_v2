import ToggleSwitch from ".src/components/common/toggle/toggleSwitch";
import styles from "./setting.module.scss";
import { useState } from "react";
import ConfirmPopup from ".src/components/common/popup/confirmPopup";
import PopupBg from ".src/components/common/popupBg";
import { useSignOut } from ".src/hooks/common/useSignOut";
import { useRouter } from "next/router";

export default function Setting() {
  const [alertChecked, setAlertChecked] = useState(true);
  const [marketingChecked, setMarketingChecked] = useState(true);
  const [alertPopup, setAlertPopup] = useState(false);
  const [marketingPopup, setMarketingPopup] = useState(false);
  const [logOutPopup, setLogOutPopup] = useState(false);
  const [logOut] = useSignOut();
  const [withdrawPopup, setWithdrawPopup] = useState(false);
  const router = useRouter();

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
              <li className={styles.boxAlert}>
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
              <li className={styles.boxAlert}>
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
              <li onClick={() => router.push("/board/notice")}>공지사항</li>
              <li onClick={() => router.push("/board/faq")}>FAQ</li>
              <li>1:1 문의/내역</li>
            </ul>
          </div>
          <div className={styles.box}>
            <h3>사용자관리</h3>
            <ul>
              <li>차단 사용자 관리</li>
              <li>숨긴 사용자 관리</li>
            </ul>
          </div>
          <div className={styles.box}>
            <h3>약관 및 정책</h3>
            <ul>
              <li>서비스 이용약관</li>
              <li>개인정보 처리방침</li>
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
      {alertPopup && (
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
      )}
      {marketingPopup && (
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
                <span>계정 탈퇴 시 수익금에 대해서는</span>
                <br />
                <span>환불받을 수 없으니 신중하게 선택해주세요</span>
              </>
            }
            cancelFunc={() => setWithdrawPopup(false)}
            confirmFunc={() => {
              setWithdrawPopup(false);
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
