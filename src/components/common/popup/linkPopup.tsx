import Link from "next/link";
import styles from "./linkPopup.module.scss";

interface Iprops {
  msg: any;
  subMsg?: any;
  linkTo: string;
  btnText: string;
}

export default function LinkPopup({ msg, subMsg, linkTo, btnText }: Iprops) {
  return (
    <section className={styles.linkPopup}>
      <div className={styles.msgBox}>
        <p className={styles.msg}>{msg}</p>

        {subMsg ? <p className={styles.subMsg}>{subMsg}</p> : <></>}
      </div>
      <Link href={linkTo}>
        <button className={styles.confirmBtn}>{btnText}</button>
      </Link>
    </section>
  );
}
