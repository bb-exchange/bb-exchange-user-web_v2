import { useRouter } from "next/router";
import styles from "./profileHoverPopup.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { signOut } from ".src/features/userSlice";
import { useCookies } from "react-cookie";
import { AppStore } from ".src/app/store";
import { useEffect } from "react";
import { basicInstance } from ".src/api/instance";

const ProfileHoverPopup = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const nickname = useSelector((state: AppStore) => state.user.nickname);
  const [, , removeCookie] = useCookies(["accessToken", "refreshToken"]);

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
        <li
          onClick={() => {
            dispatch(signOut());
            removeCookie("accessToken", { path: "/" });
            removeCookie("refreshToken", { path: "/" });
            router.push("/auth/signin");
          }}
        >
          로그아웃
        </li>
      </ul>
    </section>
  );
};

export default ProfileHoverPopup;
