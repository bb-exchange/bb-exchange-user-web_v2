import { NotionRenderer } from "react-notion-x";

import notion from ".src/lib/notion";
import { ExtendedRecordMap } from "notion-types";

const TermsPrivacy = ({ recordMap }: { recordMap: ExtendedRecordMap }) => {
  return (
    <div>
      <NotionRenderer recordMap={recordMap} fullPage={true} darkMode={false} />
    </div>
  );
};

export default TermsPrivacy;

export async function getStaticProps() {
  const pageType = "e7d34cb12cc8485e90066b6e9f2bb979";
  const recordMap = await notion.getPage(pageType);
  return { props: { recordMap }, revalidate: 10 };
}
