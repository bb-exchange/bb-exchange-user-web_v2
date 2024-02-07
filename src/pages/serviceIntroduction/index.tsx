import {
  GetServerSideProps,
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
} from "next";

import DesktopPage from ".src/components/service/desktop";
import MobilePage from ".src/components/service/mobile";
import Head from "next/head";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

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
  const { pathname } = useRouter();
  const [currentUrl, setCurrentUrl] = useState<string>();
  useEffect(() => {
    if (currentUrl != null) return;
    const url = window.location.origin;
    setCurrentUrl(url);
  }, [currentUrl]);

  return (
    <>
      <Head>
        <meta property="og:title" content="비법거래소" />
        <meta property="og:url" content={pathname} />
        <meta
          property="og:image"
          content="/assets/images/og_image_service_kakao.png"
        />
        <meta property="og:description" content="제2의 월급, 비법거래소에서" />

        <meta name="twitter:card" content="summary" />
        <meta property="twitter:domain" content={currentUrl} />
        <meta property="twitter:url" content={pathname} />
        <meta name="twitter:title" content="비법거래소" />
        <meta name="twitter:description" content="제2의 월급, 비법거래소에서" />
        <meta
          name="twitter:image"
          content="/assets/images/og_image_service_x.png"
        />
      </Head>

      {isMobile ? <MobilePage isClient={isClient} /> : <DesktopPage />}
    </>
  );
};

export default GuidePage;
