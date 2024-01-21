import {
  GetServerSideProps,
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
} from "next";

import DesktopPage from ".src/components/service/desktop";
import MobilePage from ".src/components/service/mobile";

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const userAgent = context.req.headers["user-agent"];

  return {
    props: {
      isMobile: !!userAgent?.includes("Mobile"),
    },
  };
};

const GuidePage = ({
  isMobile,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return <>{isMobile ? <MobilePage /> : <DesktopPage />}</>;
};

export default GuidePage;
