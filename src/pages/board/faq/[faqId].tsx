import { useRouter } from "next/router";
import styles from "../boardDetail.module.scss";
import { D_FAQ_LIST } from ".src/data/board/D_faqList";

const FaqDetail = () => {
  const { query } = useRouter();

  return (
    <div id={styles.boardDetail}>
      <h2>FQA</h2>
      <ul className={styles.content}>
        <li>
          <p className={styles.title}>
            {D_FAQ_LIST?.[Number(query?.faqId)]?.title}
          </p>
          <span className={styles.regDate}>
            {D_FAQ_LIST?.[Number(query?.faqId)]?.regDate}
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

export default FaqDetail;

export const getStaticPaths = () => {
  return {
    paths: [{ params: { faqId: "2" } }],
    fallback: true,
  };
};
export function getStaticProps({ params }: any) {
  return { props: { commonLayout: true } };
}
