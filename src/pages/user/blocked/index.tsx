import { D_blockedUsers } from ".src/data/user/D_blockedUsers";
import DefaultProfImg from ".assets/example/DefaultProfImg.png";
import Image from "next/image";
import styles from "./blockedUsers.module.scss";
import Gold from ".assets/icons/tier/Gold.svg";
import { useState } from "react";
import ConfirmPopup from ".src/components/common/popup/confirmPopup";
import PopupBg from ".src/components/common/popupBg";
import { useRouter } from "next/router";
import { deleteBlockUser } from ".src/api/users/users";

const BlockedUsers = () => {
  const router = useRouter();

  const [openPopup, setOpenPopup] = useState(
    router.query.openPopup === "true" || false
  );

  return (
    <div id={styles.blockedUsers}>
      <div className={styles.contentBox}>
        <h2>차단 사용자 관리</h2>
        <div className={styles.divisionLine} />
        <ul>
          {D_blockedUsers.map(({ nickname, id, listed }) => (
            <li key={id}>
              <div className={styles.userProfile}>
                <Image
                  src={DefaultProfImg.src}
                  alt={"프로필 이미지"}
                  width={32}
                  height={32}
                />
                <span>{nickname}</span>
                <Gold />
              </div>
              <button onClick={() => setOpenPopup(true)}>차단해제</button>
            </li>
          ))}
        </ul>
      </div>
      {openPopup && (
        <>
          <ConfirmPopup
            cancelFunc={() => setOpenPopup(false)}
            confirmFunc={() => {
              setOpenPopup(false);
              //   deleteBlockUser(1);
            }}
            content={
              <>
                <span className={styles.boldText}>
                  사용자 차단을 해제하시겠습니까?
                </span>
                <span>
                  차단 해제 시 해당 사용자의 비법글을 보고
                  <br />
                  구매할 수 있습니다.
                </span>
              </>
            }
          />
          <PopupBg bg off={() => setOpenPopup(false)} />
        </>
      )}
    </div>
  );
};

export default BlockedUsers;
export function getStaticProps() {
  return { props: { commonLayout: true } };
}
