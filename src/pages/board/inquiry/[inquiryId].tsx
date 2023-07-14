import { useRouter } from "next/router";

import styles from "./[inquiryId].module.scss";
import { D_INQUIRY_LIST } from ".src/data/board/D_inquiryList";
import { useEffect } from "react";

const InquiryDetail = () => {
  const { query, push } = useRouter();
  const reply = D_INQUIRY_LIST?.[Number(query?.inquiryId)]?.reply;
  const read = D_INQUIRY_LIST?.[Number(query?.inquiryId)]?.read;
  const returnBtn = () => {
    if (reply) {
      if (read) return <button className={styles.grayBtn}>답변완료</button>;
      else return <button className={styles.blueBtn}>답변완료</button>;
    } else {
      return <button className={styles.lightGrayBtn}>답변전</button>;
    }
  };

  return (
    <div id={styles.inquiryDetail}>
      <div className={styles.content}>
        <div>
          {returnBtn()}
          <p className={styles.title}>
            {D_INQUIRY_LIST?.[Number(query?.inquiryId)]?.title}
          </p>
          <span className={styles.regDate}>
            {D_INQUIRY_LIST?.[Number(query?.inquiryId)]?.regDate}
          </span>
        </div>
        <div className={styles.divisionLine} />
        <p className={styles.description}>
          안정적인 서비스 제공을 위하여 시스템 점검을 실시할 예정입니다.안정적인
          서비스 제공을 위하여 시스템 점검을 실시할 예정입니다.안정적인 서비스
          제공을 위하여 시스템 점검을 실시할 예정입니다.안정적인 서비스 제공을
          위하여 시스템 점검을 실시할 예정입니다.안정적인 서비스 제공을 위하여
          시스템 점검을 실시할 예정입니다.안정적인 서비스 제공을 위하여 시스템
          점검을 실시할 예정입니다.안정적인 서비스 제공을 위하여 시스템 점검을
          실시할 예정입니다.안정적인 서비스 제공을 위하여 시스템 점검을 실시할
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

        {reply && (
          <>
            <div className={styles.boldLine} />
            <div className={styles.sectionOfReply}>
              <>
                <p className={styles.replyTitle}>답변이 완료되었습니다.</p>
                <span className={styles.regDate}>2023.01.01</span>
              </>
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
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default InquiryDetail;

export const getStaticPaths = () => {
  return {
    paths: [{ params: { inquiryId: "2" } }],
    fallback: true,
  };
};
export function getStaticProps({ params }: any) {
  return { props: { commonLayout: true } };
}
