import { useRouter } from "next/router";
import styles from "./profileHoverPopup.module.scss";

const ProfileHoverPopup = () => {
  const router = useRouter();
  return (
    <section className={styles.hoverArea}>
      <ul className={styles.profileHoverPopup}>
        <li className={styles.bold}>
          <span>안녕하세요,</span> <br />
          <span className={styles.blue}>비법거래소짱짱님</span>
        </li>
        <li onClick={() => router.push("/mypage")}>마이페이지</li>
        <li onClick={() => router.push("/setting")}>설정</li>
        <li>공지사항 / 고객센터</li>
        <li>로그아웃</li>
      </ul>
    </section>
  );
};

export default ProfileHoverPopup;
