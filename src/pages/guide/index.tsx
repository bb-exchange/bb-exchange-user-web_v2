import {
  GetServerSideProps,
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
} from "next";

import DesktopPage from ".src/components/guide/desktop";
import MobilePage from ".src/components/guide/mobile";

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const userAgent = context.req.headers["user-agent"];
  const isBibeopClient = context.req.headers["bibeop-client"];

  return {
    props: {
      isMobile: !!userAgent?.includes("Mobile"),
      isClient: !!isBibeopClient,
    },
  };
};

const GuidePage = ({
  isMobile,
  isClient,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return <>{isMobile ? <MobilePage isClient={isClient} /> : <DesktopPage />}</>;
};

export default GuidePage;
