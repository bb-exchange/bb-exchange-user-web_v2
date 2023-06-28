import { useRouter } from "next/router";
import styles from "./profileHoverPopup.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { signOut } from ".src/features/userSlice";
import { useCookies } from "react-cookie";
import { AppStore } from ".src/app/store";
import { useEffect } from "react";
import { basicInstance } from ".src/api/instance";
import { useSignOut } from ".src/hooks/common/useSignOut";

const ProfileHoverPopup = () => {
  const router = useRouter();
  const nickname = useSelector((state: AppStore) => state.user.nickname);
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
        <li>공지사항 / 고객센터</li>
        <li onClick={logOut}>로그아웃</li>
      </ul>
    </section>
  );
};

export default ProfileHoverPopup;
