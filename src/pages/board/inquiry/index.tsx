import ImageAttention from "../../../../public/assets/images/attention.svg";

import styles from "./inquiry.module.scss";

import { useEffect } from "react";

import { useRouter } from "next/router";

import PageNav from ".src/components/common/pageNav";
import ConfirmPopup from ".src/components/common/popup/confirmPopup";
import PopupBg from ".src/components/common/popupBg";
import InquiryLayout from ".src/components/inquiry/InquiryLayout";
import { D_INQUIRY_LIST } from ".src/data/board/D_inquiryList";
import usePostInquiry from ".src/hooks/board/usePostInquiry";
import usePopstate from ".src/hooks/common/usePopstate";

interface inquiryList {
  title: string;
  regDate: string;
  boardId: number;
  reply: boolean;
  read: boolean;
}
const Inquiry = () => {
  const router = useRouter();
  //뒤로가기 시 설정페이지로 이동.
  usePopstate("/setting");
  const D_EMPTY: any = [];
  const data = D_INQUIRY_LIST;

  const returnBtn = (reply: boolean, read: boolean) => {
    if (reply) {
      if (read) return <button className={styles.grayBtn}>답변완료</button>;
      else return <button className={styles.blueBtn}>답변완료</button>;
    } else {
      return <button className={styles.lightGrayBtn}>답변전</button>;
    }
  };

  return (
    <InquiryLayout>
      <div id={styles.inquiry}>
        <p>최근 1년 간 문의내역만 조회 가능합니다.</p>
        {data.length > 0 ? (
          <>
            <ul>
              {data.map(({ title, regDate, boardId, reply, read }: inquiryList, idx: number) => (
                <li key={idx} className={read && reply ? `${styles.isRead}` : ""}>
                  <div onClick={() => router.push(`/board/inquiry/${boardId}`)}>
                    <p>
                      <span className={styles.q}>Q.</span>
                      {title}
                    </p>
                    <section>
                      <span className={styles.regDate}>{regDate}</span>
                      {returnBtn(reply, read)}
                    </section>
                  </div>
                </li>
              ))}
            </ul>
            <PageNav />
          </>
        ) : (
          <div className={styles.noContent}>
            <ImageAttention />
            <p>1:1문의 내역이 없습니다.</p>
          </div>
        )}
      </div>
    </InquiryLayout>
  );
};

export default Inquiry;

export function getStaticProps() {
  return { props: { commonLayout: true } };
}
