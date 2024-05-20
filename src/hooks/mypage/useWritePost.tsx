import { useState } from "react";

import { useRouter } from "next/router";

import QuestionCircleRed from ".assets/icons/QuestionCircleRed.svg";
import ConfirmPopup from ".src/components/common/popup/confirmPopup";
import ErrorMsgPopup from ".src/components/common/popup/errorMsgPopup";
import PopupBg from ".src/components/common/popupBg";

export default function UseWritePost() {
  const router = useRouter();

  const [tempBlockPopup, setTempBlockPopup] = useState<boolean>(false);
  const [constBlockPopup, setConstBlockPopup] = useState<boolean>(false);

  function onClickTempBlockBtn(e: React.MouseEvent) {
    e.stopPropagation();
    setTempBlockPopup(true);
  }

  function onClickConstBlockBtn(e: React.MouseEvent) {
    e.stopPropagation();
    setConstBlockPopup(true);
  }

  function getStateComp({ styles, state }: IwriteGetStateComp) {
    switch (state) {
      case "판매중":
        return (
          <div className={`${styles.blue} ${styles.stateBox}`}>
            <p className={styles.state}>판매중</p>
          </div>
        );
      case "비공개":
        return (
          <div className={styles.stateBox}>
            <p className={styles.state}>비공개</p>
          </div>
        );
      case "일시판매중지":
        return (
          <>
            <div className={`${styles.red} ${styles.stateBox}`}>
              <p className={styles.state}>판매중지</p>
              <button className={styles.explainBox} onClick={onClickTempBlockBtn}>
                <p>일시</p>
                <QuestionCircleRed />
              </button>
            </div>

            {tempBlockPopup && (
              <>
                <ConfirmPopup
                  title="일시 판매 중지 안내"
                  content={
                    <>
                      [사유 알림 부분, 는 관리자에서 작성]
                      <br />
                      수정 후 심사를 거쳐 다시 판매가 가능합니다.
                    </>
                  }
                  cancelText="닫기"
                  cancelFunc={() => setTempBlockPopup(false)}
                  confirmText="수정하기"
                  confirmFunc={() => router.push("/edit")}
                />
                <PopupBg bg off={() => setTempBlockPopup(false)} />
              </>
            )}
          </>
        );
      case "영구판매중지":
        return (
          <>
            <div className={`${styles.red} ${styles.stateBox}`}>
              <p className={styles.state}>판매중지</p>
              <button className={styles.explainBox} onClick={onClickConstBlockBtn}>
                <p>영구</p>
                <QuestionCircleRed />
              </button>
            </div>

            {constBlockPopup && (
              <>
                <ErrorMsgPopup
                  msg={"영구 판매 중지 안내"}
                  subMsg={
                    <>
                      [사유 알림 부분, 는 관리자에서 작성]
                      <br />
                      사유는 관리자에서 작성
                    </>
                  }
                  confirmFunc={() => setConstBlockPopup(false)}
                />
                <PopupBg bg off={() => setConstBlockPopup(false)} />
              </>
            )}
          </>
        );
    }
    return <></>;
  }

  return {
    getStateComp,
  };
}
