import { D_blockedUsers } from ".src/data/user/D_blockedUsers";
import DefaultProfImg from ".assets/example/DefaultProfImg.png";
import Image from "next/image";
import styles from "./hiddenUsers.module.scss";
import Gold from ".assets/icons/tier/Gold.svg";
import { useState } from "react";
import ConfirmPopup from ".src/components/common/popup/confirmPopup";
import PopupBg from ".src/components/common/popupBg";
import { useRouter } from "next/router";
import { deleteBlockUser } from ".src/api/users/users";

const HiddenUsers = () => {
  const router = useRouter();

  const [openPopup, setOpenPopup] = useState(
    router.query.openPopup === "true" || false
  );

  return (
    <div id={styles.hiddenUsers}>
      <div className={styles.contentBox}>
        <h2>숨긴 사용자 관리</h2>
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
              <button onClick={() => setOpenPopup(true)}>숨김해제</button>
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
                  이 사용자의 게시물을 다시 보시겠어요?
                </span>
                <span>
                  게시글 목록에서 이 사용자의 게시글을
                  <br />
                  다시 볼 수 있어요.
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

export default HiddenUsers;
export function getStaticProps() {
  return { props: { commonLayout: true } };
}
