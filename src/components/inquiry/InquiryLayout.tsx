import { useRouter } from "next/router";
import styles from "./InquiryLayout.module.scss";

const InquiryLayout = (props: any) => {
  const { pathname, push } = useRouter();

  return (
    <div id={styles.InquiryLayout}>
      <section className={styles.title}>
        <h2>1:1문의</h2>
        <div className={styles.tabLink}>
          <span
            className={pathname.includes("/post") ? `${styles.active}` : ""}
            onClick={() => push("/board/inquiry/post")}
          >
            1:1문의하기
          </span>
          <span
            className={pathname.includes("/post") ? "" : `${styles.active}`}
            onClick={() => push("/board/inquiry")}
          >
            1:1문의내역
          </span>
        </div>
      </section>
      <div className={styles.content}>{props.children}</div>
    </div>
  );
};

export default InquiryLayout;
