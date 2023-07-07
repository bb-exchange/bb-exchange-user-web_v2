import InquiryLayout from ".src/components/inquiry/InquiryLayout";
import styles from "./inquiry.module.scss";
import { useRouter } from "next/router";

const Inquiry = () => {
  const router = useRouter();

  return (
    <div>
      <InquiryLayout>
        <div></div>
      </InquiryLayout>
    </div>
  );
};

export default Inquiry;

export function getStaticProps() {
  return { props: { commonLayout: true } };
}
