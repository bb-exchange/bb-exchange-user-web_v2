import styles from "./setting.module.scss";
export default function Setting() {
  return (
    <div className={styles.setting}>
      <div className={styles.contentBox}>
        <div className={styles.titleWrap}>
          <h2>설정</h2>
        </div>
        <div className={styles.gridBoxWrap}>
          <div>알림</div>
          <div>고객센터</div>
          <div>사용자관리</div>
          <div>약관 및 정책</div>
          <div>정보 관리</div>
        </div>
      </div>
    </div>
  );
}

export function getStaticProps() {
  return { props: { commonLayout: true } };
}
