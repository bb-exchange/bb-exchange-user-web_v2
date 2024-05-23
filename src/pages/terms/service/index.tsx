import { NotionRenderer } from "react-notion-x";

import notion from ".src/lib/notion";
import { ExtendedRecordMap } from "notion-types";

const TermsService = ({ recordMap }: { recordMap: ExtendedRecordMap }) => {
  return (
    <div>
      <NotionRenderer recordMap={recordMap} fullPage={true} darkMode={false} />
    </div>
  );
};

export default TermsService;

export async function getStaticProps() {
  const pageType = "29746a6bb8514619a3eca3a80f393f54";
  const recordMap = await notion.getPage(pageType);
  return { props: { recordMap }, revalidate: 10 };
}
