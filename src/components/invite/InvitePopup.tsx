import styles from "./InvitePopup.module.scss";

import { CSSProperties, useCallback, useState } from "react";

import { CommonPopup } from "@components/common/popup/CommonPopup";
import Image from "@components/Image";
import Popup from "@components/Popup";

import { D_cautionList } from "@data/invite/D_invitePopup";

import useGetMyProfile from "@hooks/common/useGetProfile";

interface Props {
  maxInviteCount: number;
  onClose: () => void;
}

// 팝업 가로 크기
const POPUP_MAX_WIDTH = 622;

// 팝업 box 스타일
const POPUP_STYLE: CSSProperties = {
  overflow: "hidden",
  maxWidth: POPUP_MAX_WIDTH,
  boxShadow: "0px 3.19px 3.19px 0px rgba(0, 0, 0, 0.25)",
};

export const InvitePopup = ({ maxInviteCount = 0, onClose }: Props) => {
  const { profile } = useGetMyProfile();

  // 초대코드 복사 완료 팝업 toggle
  const [isInviteCodeCopySuccessPopupShow, setIsInviteCodeCopySuccessPopupShow] = useState(false);
  // 이벤트 공유링크 복사 완료 팝업 toggle
  const [isShareLinkCopySuccessPopupShow, setIsShareLinkCopySuccessPopupShow] = useState(false);

  // 초대코드 클립보드 복사
  const onClickRecommendCodeCopy = useCallback(() => {
    if (!profile.recommendCode) return;

    // 초대코드 클립보드 복사
    navigator.clipboard.writeText(profile.recommendCode);
    // 복사 완료 팝업 Show
    setIsInviteCodeCopySuccessPopupShow(true);
  }, [profile?.recommendCode]);

  // 초대링크 복사 && Success Popup Show
  const onClickShare = useCallback(() => {
    // 초대링크 클립보드 복사
    navigator.clipboard.writeText(`${window.location.host}/invite/${profile?.recommendCode}`);
    // 복사 완료 팝업 Show
    setIsShareLinkCopySuccessPopupShow(true);
  }, [profile?.recommendCode]);

  if (!profile?.recommendCode) return null;

  return (
    <Popup title={"친구 초대하기"} visible={true} style={POPUP_STYLE} onClose={onClose}>
      <div className={styles.invitePopupContainer}>
        <main>
          <section className={styles.titleSection}>
            <h3 className="h3 bold">
              비법거래소에 친구를 초대하면 최대 <span className="color-primary1">5,000원</span>을
              받을 수 있어요.
            </h3>

            <p className="p1 color-gray1">
              초대자는 하루에 {maxInviteCount}명까지만 포인트를 받아요.
            </p>
          </section>

          <section className={styles.explainSection}>
            <Image src={"/assets/icons/invite.svg"} width={54} height={54} alt={"invite"} />
            <p className="p2 bold color-black1">
              친구에게 회원가입 이벤트를 공유해주세요.
              <br />
              회원가입시 인증코드에 내 코드를 입력하면 끝!
            </p>
          </section>

          <section className={styles.codeSection}>
            <h3 className="h3 bold color-black1">내 초대코드</h3>
            <h1 className="h1 bold color-primary1">{profile?.recommendCode || ""}</h1>
            <button onClick={onClickRecommendCodeCopy}>
              <p className="p5 color-black1">초대코드 복사</p>
            </button>
          </section>

          <section className={styles.cautionSection}>
            <p className="p3 bold color-primary-bg1">유의사항</p>

            <ul>
              {D_cautionList.map((html, index) => (
                <li
                  key={index}
                  className={`${styles.notice} p2 color-black1`}
                  dangerouslySetInnerHTML={{ __html: html }}
                />
              ))}
            </ul>
          </section>
        </main>

        <button
          className={`${styles.shareButton} p2 bold bg-primary1 color-white1`}
          onClick={onClickShare}
        >
          이벤트 공유하기
        </button>
      </div>

      {isInviteCodeCopySuccessPopupShow && (
        <CommonPopup
          title="초대코드를 복사했어요."
          confirmFunc={() => setIsInviteCodeCopySuccessPopupShow(false)}
        />
      )}

      {isShareLinkCopySuccessPopupShow && (
        <CommonPopup
          title="링크를 복사했어요.<br/>이 링크를 공유해주세요."
          iconSrc="/assets/icons/Attendance.svg"
          confirmFunc={() => setIsShareLinkCopySuccessPopupShow(false)}
        />
      )}
    </Popup>
  );
};
