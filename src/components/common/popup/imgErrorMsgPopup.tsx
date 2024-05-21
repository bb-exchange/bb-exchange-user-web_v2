import styles from "./imgErrorMsgPopup.module.scss";

import Danger from ".assets/icons/Danger.svg";

interface Iprops {
  msg: any;
  subMsg?: any;
  confirmFunc: Function;
  btnText: string;
}

export default function ImgErrorMsgPopup({ msg, subMsg, confirmFunc, btnText }: Iprops) {
  return (
    <section className={styles.errorMsgPopup}>
      <div className={styles.msgBox}>
        {/* TODO 아이콘 위치 스타일 수정 필요 */}
        <Danger />
        <p className={styles.msg}>{msg}</p>
        {subMsg ? <p className={styles.subMsg}>{subMsg}</p> : <></>}
      </div>

      <button className={styles.confirmBtn} onClick={() => confirmFunc()}>
        {btnText}
      </button>
    </section>
  );
}
