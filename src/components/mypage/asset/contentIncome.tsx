import styles from "./contentIncome.module.scss";
import moment from "moment";
import PageNav from ".src/components/common/pageNav";
import UseMyContentIncome from ".src/hooks/mypage/asset/useMyContentIncome";
import Swap from ".assets/icons/Swap.svg";

export default function ContentIncome() {
  const useMyContentIncome = UseMyContentIncome();

  return (
    <article className={styles.termIncome}>
      <div className={styles.topBar}>
        <div className={styles.filterCont}>
          <p className={styles.key}>콘텐츠 제목 조회</p>

          <input
            value={useMyContentIncome.contentTitle}
            onChange={(e) => useMyContentIncome.setContentTitle(e.target.value)}
          />

          <button className={styles.submitBtn} onClick={() => {}}>
            조회
          </button>
        </div>

        <button className={styles.excelBtn} onClick={() => {}}>
          엑셀 다운로드
        </button>

        <button className={styles.sortBtn} onClick={() => {}}>
          <Swap />

          <p>수익순</p>
        </button>
      </div>

      <div className={styles.countBar}>
        <p className={styles.count}>
          총 {useMyContentIncome.dataList.length.toString().padStart(2, "0")}개
        </p>
      </div>

      <ul className={styles.dataList}>
        {useMyContentIncome.dataList.map((v, i) => (
          <li key={i}>
            <div className={styles.leftBox}>
              <p className={styles.title}>{v.title}</p>

              <div className={styles.infoBar}>
                <p className={styles.category}>{v.category}</p>・
                <p className={styles.createdAt}>
                  {moment(v.createdAt).fromNow()}
                </p>
              </div>
            </div>

            <p className={styles.amount}>
              {Intl.NumberFormat().format(v.amount)} 원
            </p>
          </li>
        ))}
      </ul>

      <PageNav />
    </article>
  );
}
