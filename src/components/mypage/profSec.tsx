import styles from "./profSec.module.scss";
import Gold from ".assets/icons/tier/Gold.svg";
import ChevronRtBlue from ".assets/icons/ChevronRtBlue.svg";

export default function ProfSec() {
  return (
    <section className={styles.profSec}>
      <article className={styles.leftArea}>
        <button className={styles.profImgBtn} onClick={() => {}}></button>

        <div className={styles.infoCont}>
          <div className={styles.nicknameBar}>
            <h1 className={styles.nickname}>치은짱짱맨</h1>

            <Gold />
          </div>

          <p className={styles.profMsg}>
            재테크, 투자, 자동차 전문가입니다. 12년간 7개의 은행, 증권사,
            투자은행을 다닌 경험이 있으며, 시드 2000천으로 현재 자산 58억 달성한
            모든 비법을 공유합니다. 다들 따라오세요!!! 가보자구욧~!~!
          </p>

          <ul className={styles.accountList}>
            <li>
              <p className={styles.key}>보유 포인트</p>

              <p className={styles.value}>{Intl.NumberFormat().format(0)}</p>

              <button className={styles.detailBtn} onClick={() => {}}>
                <ChevronRtBlue />
              </button>
            </li>

            <hr />

            <li>
              <p className={styles.key}>예상 전산금</p>

              <p className={styles.value}>{Intl.NumberFormat().format(0)}</p>

              <button className={styles.detailBtn} onClick={() => {}}>
                <ChevronRtBlue />
              </button>
            </li>
          </ul>
        </div>
      </article>

      <article className={styles.rightArea}>
        <button className={styles.profBtn} onClick={() => {}}>
          <p>프로필 수정</p>
        </button>
      </article>
    </section>
  );
}
