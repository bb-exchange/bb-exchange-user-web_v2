import styles from "./myWithdraw.module.scss";
import CustomDatePicker from ".src/components/common/customDatePicker";
import moment from "moment";
import PageNav from ".src/components/common/pageNav";
import UseMyWithdraw from ".src/hooks/mypage/asset/useMyWithdraw";
import ArrowIcon from ".assets/icons/ArrowAsset.svg";

export default function MyWithdraw() {
  const useMyWithdraw = UseMyWithdraw();

  return (
    <article className={styles.myWithdraw}>
      <div className={styles.topBar}>
        <div className={styles.filterCont}>
          <p className={styles.key}>조회 기간</p>
          <div className={styles.dateLayout}>
            <span>
              <ArrowIcon onClick={useMyWithdraw.onPrevDate} />
            </span>
            <p>{useMyWithdraw.selectedDate}</p>
            <span>
              <ArrowIcon onClick={useMyWithdraw.onNextDate} />
            </span>
          </div>
        </div>

        <button className={styles.excelBtn} onClick={() => {}}>
          엑셀 다운로드
        </button>
      </div>

      <ul className={styles.dataList}>
        {useMyWithdraw.dataList.map((v, i) => (
          <li key={i}>
            <div className={styles.leftBox}>
              <p className={styles.createdAt}>
                {moment(v.createdAt).format("YYYY.MM.DD")}
              </p>
            </div>

            <div className={styles.rightBox}>
              <p
                className={`${styles.status} ${
                  v.status === "출금 진행중" ? styles.on : ""
                }`}
              >
                {v.status}
              </p>

              <p className={styles.amount}>
                {Intl.NumberFormat().format(v.amount)} 원
              </p>
            </div>
          </li>
        ))}
      </ul>

      <PageNav />
    </article>
  );
}
