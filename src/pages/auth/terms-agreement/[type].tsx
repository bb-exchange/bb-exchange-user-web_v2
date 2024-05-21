import styles from "./[type].module.scss";

import { NotionRenderer } from "react-notion-x";

import { useRouter } from "next/router";

import IconX from ".assets/icons/X.svg";
import notion from ".src/lib/notion";
import { ExtendedRecordMap } from "notion-types";

const TermsPopup = ({ recordMap }: { recordMap: ExtendedRecordMap }) => {
  const router = useRouter();

  return (
    <div className={styles.termsPopup}>
      <div className={styles.bg} onClick={() => router.back()} />
      <section className={styles.contentBox}>
        <div className={styles.header}>
          <h2 className={styles.headerTitle}>서비스 이용동의</h2>
          <IconX className={styles.iconX} onClick={() => router.back()} />
        </div>
        <div className={styles.notionContent}>
          <NotionRenderer recordMap={recordMap} fullPage={true} darkMode={false} />
        </div>
      </section>
    </div>
  );
};

export default TermsPopup;

export const getStaticPaths = async () => {
  return {
    paths: [{ params: { type: "service" } }, { params: { type: "privacy" } }],
    fallback: false,
  };
};
export async function getStaticProps({ params }: any) {
  const pageType =
    params.type === "service"
      ? "29746a6bb8514619a3eca3a80f393f54"
      : "e7d34cb12cc8485e90066b6e9f2bb979";
  const recordMap = await notion.getPage(pageType);
  return { props: { recordMap, navBar: true }, revalidate: 10 };
}
