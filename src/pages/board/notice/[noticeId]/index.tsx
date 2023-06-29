import { useRouter } from "next/router";
import styles from "../../boardDetail.module.scss";
import { D_NOTICE_LIST } from ".src/data/board/D_noticeList";

const NoticeDetail = () => {
  const { query } = useRouter();

  return (
    <div id={styles.boardDetail}>
      <h2>공지사항</h2>
      <ul className={styles.content}>
        <li>
          <p className={styles.title}>
            {D_NOTICE_LIST?.[Number(query?.noticeId)]?.title}
          </p>
          <span className={styles.regDate}>
            {D_NOTICE_LIST?.[Number(query?.noticeId)]?.regDate}
          </span>
        </li>
        <li>
          <p className={styles.description}>
            안정적인 서비스 제공을 위하여 시스템 점검을 실시할
            예정입니다.안정적인 서비스 제공을 위하여 시스템 점검을 실시할
            예정입니다.안정적인 서비스 제공을 위하여 시스템 점검을 실시할
            예정입니다.안정적인 서비스 제공을 위하여 시스템 점검을 실시할
            예정입니다.안정적인 서비스 제공을 위하여 시스템 점검을 실시할
            예정입니다.안정적인 서비스 제공을 위하여 시스템 점검을 실시할
            예정입니다.안정적인 서비스 제공을 위하여 시스템 점검을 실시할
            예정입니다.안정적인 서비스 제공을 위하여 시스템 점검을 실시할
            예정입니다.안정적인 서비스 제공을 위하여 시스템 점검을 실시할
            예정입니다.안정적인 서비스 제공을 위하여 시스템 점검을 실시할
            예정입니다.안정적인 서비스 제공을 위하여 시스템 점검을 실시할
            예정입니다.안정적인 서비스 제공을 위하여 시스템 점검을 실시할
            예정입니다.안정적인 서비스 제공을 위하여 시스템 점검을 실시할
            예정입니다.안정적인 서비스 제공을 위하여 시스템 점검을 실시할
            예정입니다.안정적인 서비스 제공을 위하여 시스템 점검을 실시할
            예정입니다.안정적인 서비스 제공을 위하여 시스템 점검을 실시할
            예정입니다.
          </p>
        </li>
      </ul>
    </div>
  );
};

export default NoticeDetail;

export const getStaticPaths = async () => {
  return {
    paths: [{ params: { noticeId: "" } }],
    fallback: true,
  };
};
export function getStaticProps() {
  return { props: { commonLayout: true } };
}
