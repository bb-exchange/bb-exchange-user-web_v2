import styles from "./asset.module.scss";
import CommonFooter from ".src/components/common/commonFooter";
import CommonHeader from ".src/components/common/header/commonHeader";
import MypageNavAside from ".src/components/mypage/mypageNavAside";

export default function Asset() {
  return (
    <>
      <CommonHeader />

      <main className={styles.asset}>
        <MypageNavAside />

        <section className={styles.contSec}></section>
      </main>

      <CommonFooter />
    </>
  );
}
