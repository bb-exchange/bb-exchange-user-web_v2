import Popular from "./popular";

import { useEffect, useState } from "react";

import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import Head from "next/head";

import { articles } from ".src/api/articles/articles";
import { dehydrate, DehydratedState, HydrationBoundary, QueryClient } from "@tanstack/react-query";

export const getServerSideProps: GetServerSideProps<{
  dehydratedState: DehydratedState;
}> = async () => {
  const queryClient = new QueryClient();

  const defaultValues = {
    category: "ALL",
    searchType: "POPULAR" as const,
    page: 0,
  };

  await queryClient.prefetchQuery({
    queryKey: ["articles", defaultValues],
    queryFn: () => articles(defaultValues),
  });

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
      commonLayout: true,
      commonSort: "인기",
    },
  };
};

export default function Home({
  dehydratedState,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const [currentUrl, setCurrentUrl] = useState<string>();

  useEffect(() => {
    if (currentUrl != null) return;
    const url = window.location.origin;
    setCurrentUrl(url);
  }, [currentUrl]);

  return (
    <HydrationBoundary state={dehydratedState}>
      <Head>
        <meta property="og:title" content="비법거래소" />
        <meta property="og:url" content={currentUrl} />
        <meta property="og:image" content="/assets/images/og_image_service_kakao.png" />
        <meta property="og:description" content="제2의 월급, 비법거래소에서" />

        <meta name="twitter:card" content="summary" />
        <meta property="twitter:domain" content={currentUrl} />
        <meta property="twitter:url" content={currentUrl} />
        <meta name="twitter:title" content="비법거래소" />
        <meta name="twitter:description" content="제2의 월급, 비법거래소에서" />
        <meta name="twitter:image" content="/assets/images/og_image_service_x.png" />
      </Head>

      <Popular />
    </HydrationBoundary>
  );
}
