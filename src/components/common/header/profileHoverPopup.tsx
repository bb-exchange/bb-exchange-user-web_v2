import { useRecoilValue } from "recoil";
import { useRouter } from "next/router";

import styles from "./profileHoverPopup.module.scss";
import { useSignOut } from ".src/hooks/common/useSignOut";
import { userNameState } from ".src/recoil";
import IconCopy from ".assets/icons/Copy.svg";
import useGetMyProfile from ".src/hooks/common/useGetProfile";

const ProfileHoverPopup = () => {
  const router = useRouter();

  const nickname = useRecoilValue(userNameState);

  const [logOut] = useSignOut();
  const { profile: myProfile } = useGetMyProfile();

  return (
    <section className={styles.hoverArea}>
      <ul className={styles.profileHoverPopup}>
        <li className={styles.bold}>
          <span>안녕하세요,</span> <br />
          <span className={styles.blue}>{nickname}님</span>
          <span className={styles.codeArea}>
            <div>추천인 코드</div>
            <div>{myProfile?.recommendCode}</div>
            <div
              onClick={() => {
                navigator.clipboard.writeText(myProfile?.recommendCode);
              }}
              className={styles.copyIcon}
            >
              <IconCopy />
            </div>
          </span>
        </li>
        <li onClick={() => router.push("/mypage/write")}>마이페이지</li>
        <li onClick={() => router.push("/setting")}>설정</li>
        <li onClick={logOut}>로그아웃</li>
      </ul>
    </section>
  );
};

export default ProfileHoverPopup;
