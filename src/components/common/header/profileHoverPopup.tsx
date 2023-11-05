import { useRecoilValue } from "recoil";
import { useRouter } from "next/router";

import styles from "./profileHoverPopup.module.scss";
import { useSignOut } from ".src/hooks/common/useSignOut";
import { userNameState } from ".src/recoil";

const ProfileHoverPopup = () => {
  const router = useRouter();

  const nickname = useRecoilValue(userNameState);

  const [logOut] = useSignOut();

  return (
    <section className={styles.hoverArea}>
      <ul className={styles.profileHoverPopup}>
        <li className={styles.bold}>
          <span>안녕하세요,</span> <br />
          <span className={styles.blue}>{nickname}님</span>
        </li>
        <li onClick={() => router.push("/mypage")}>마이페이지</li>
        <li onClick={() => router.push("/setting")}>설정</li>
        <li onClick={logOut}>로그아웃</li>
      </ul>
    </section>
  );
};

export default ProfileHoverPopup;
