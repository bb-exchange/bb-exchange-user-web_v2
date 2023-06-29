import PageNav from ".src/components/common/pageNav";
import styles from "./notice.module.scss";
import { D_NOTICE_LIST } from ".src/data/board/D_noticeList";
import { useRouter } from "next/router";

interface noticeList {
  title: string;
  regDate: string;
  noticeId: number;
}

const Notice = () => {
  const router = useRouter();
  return (
    <div id={styles.notice}>
      <h2>공지사항</h2>
      <ul className={styles.noticeLists}>
        {D_NOTICE_LIST.map(({ title, regDate, noticeId }: noticeList, idx) => (
          <li
            key={idx}
            onClick={() => router.push(`/board/notice/${noticeId}`)}
          >
            <p>{title}</p>
            <span>{regDate}</span>
          </li>
        ))}
      </ul>
      <PageNav />
    </div>
  );
};

export default Notice;

export function getStaticProps() {
  return { props: { commonLayout: true } };
}
