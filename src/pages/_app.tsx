import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import type { AppProps } from "next/app";
import Head from "next/head";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { RecoilRoot } from "recoil";
import { CookiesProvider } from "react-cookie";
import { GoogleAnalytics, GoogleTagManager } from "@next/third-parties/google";
import { init } from "@amplitude/analytics-browser";

import ".src/lib/recoil";
import "react-notion-x/src/styles.css";
import ".src/styles/globals.scss";

import Layout from ".src/components/layouts/Layout";

export default function App({ Component, ...rest }: AppProps) {
  const GA_KEY = `${process.env.NEXT_PUBLIC_GA_KEY}`;
  const GTM_KEY = `${process.env.NEXT_PUBLIC_GTM_KEY}`;
  const AMPLITUDE_KEY = `${process.env.NEXT_PUBLIC_AMPLITUDE_KEY}`;

  // NOTE - React Query Client 기본 설정
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            refetchOnMount: false,
            refetchOnWindowFocus: false,
            retry: false,
            staleTime: 5 * 100,
            gcTime: 0,
          },
        },
      })
  );

  const router = useRouter();

  //tracking the current and previous page
  useEffect(() => storePathValues, [router.asPath]);

  // NOTE - amplitude
  useEffect(() => {
    init(AMPLITUDE_KEY, { defaultTracking: true });
  }, []);

  function storePathValues() {
    const storage = globalThis?.sessionStorage;
    if (!storage) return;

    const prevPath = storage.getItem("currentPath") as string;
    storage.setItem("prevPath", prevPath);

    storage.setItem("currentPath", globalThis.location.pathname);
  }

  return (
    <RecoilRoot>
      <CookiesProvider>
        <QueryClientProvider client={queryClient}>
          <Head>
            <title>비법거래소</title>
          </Head>

          <Layout pageProps={rest.pageProps}>
            <Component {...rest.pageProps} />
            <GoogleAnalytics gaId={GA_KEY} />
            <GoogleTagManager gtmId={GTM_KEY} />
          </Layout>
          <ReactQueryDevtools />
        </QueryClientProvider>
      </CookiesProvider>
    </RecoilRoot>
  );
}
