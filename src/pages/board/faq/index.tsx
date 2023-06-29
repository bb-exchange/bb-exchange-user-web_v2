import { useRouter } from "next/router";
import styles from "./faq.module.scss";
import PageNav from ".src/components/common/pageNav";
import { D_FAQ_LIST } from ".src/data/board/D_faqList";

interface faqList {
  title: string;
  regDate: string;
  boardId: number;
}

const Faq = () => {
  const router = useRouter();
  return (
    <div id={styles.faq}>
      <h2>
        <span>FAQ</span>
        <span className={styles.grayText}>총 999건</span>
      </h2>
      <ul className={styles.faqLists}>
        {D_FAQ_LIST.map(({ title, regDate, boardId }: faqList, idx) => (
          <li key={idx} onClick={() => router.push(`/board/faq/${boardId}`)}>
            <p>
              <span className={styles.blueText}>Q. </span>
              {title}
            </p>
            <span>{regDate}</span>
          </li>
        ))}
      </ul>
      <PageNav />
    </div>
  );
};

export default Faq;

export function getStaticProps() {
  return { props: { commonLayout: true } };
}
