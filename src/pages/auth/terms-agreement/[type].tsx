import notion from ".src/lib/notion";
import { NotionRenderer } from "react-notion-x";
import { ExtendedRecordMap } from "notion-types";
import styles from "./[type].module.scss";
import IconX from ".assets/icons/X.svg";
import { useRouter } from "next/router";
import { useEffect } from "react";

const TermsPopup = ({ recordMap }: { recordMap: ExtendedRecordMap }) => {
  const router = useRouter();

  return (
    <div className={styles.termsPopup}>
      <div className={styles.bg} onClick={() => router.back()} />
      <section className={styles.contentBox}>
        <div className={styles.header}>
          <IconX className={styles.iconX} onClick={() => router.back()} />
        </div>
        <div className={styles.notionContent}>
          <NotionRenderer
            recordMap={recordMap}
            fullPage={true}
            darkMode={false}
          />
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
  return { props: { recordMap }, revalidate: 10 };
}
