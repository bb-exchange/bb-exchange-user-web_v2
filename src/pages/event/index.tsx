import {
  GetServerSideProps,
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
} from "next";

import DesktopPage from ".src/components/event/desktop";
import MobilePage from ".src/components/event/mobile";

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
