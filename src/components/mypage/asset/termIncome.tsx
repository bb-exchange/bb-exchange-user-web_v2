import styles from "./termIncome.module.scss";
import CustomDatePicker from ".src/components/common/CustomDatePicker";
import moment from "moment";
import UseMyTermIncome from ".src/hooks/mypage/asset/useMytermIncome";

export default function TermIncome() {
  const useMyTermIncome = UseMyTermIncome();

  return (
    <article className={styles.termIncome}>
      <div className={styles.topBar}>
        <div className={styles.filterCont}>
          <p className={styles.key}>조회 기간</p>

          <div className={styles.pickerBox}>
            <CustomDatePicker
              date={useMyTermIncome.startDate || new Date()}
              setDate={useMyTermIncome.setStartDate}
            />
          </div>

          <p className={styles.slash}>~</p>

          <div className={styles.pickerBox}>
            <CustomDatePicker
              date={useMyTermIncome.endDate || new Date()}
              setDate={useMyTermIncome.setEndDate}
            />
          </div>

          <button className={styles.submitBtn} onClick={() => {}}>
            조회
          </button>
        </div>

        <button className={styles.excelBtn} onClick={() => {}}>
          엑셀 다운로드
        </button>
      </div>

      <ul className={styles.dataList}>
        {useMyTermIncome.dataList.map((v, i) => (
          <li key={i}>
            <div className={styles.termBox}>
              {moment(v.startDate).format("YYYY.MM.DD")}~
              {moment(v.endDate).format("YYYY.MM.DD")}
            </div>
            <p className={styles.amount}>
              {Intl.NumberFormat().format(v.amount)} 원
            </p>
          </li>
        ))}
      </ul>
    </article>
  );
}
