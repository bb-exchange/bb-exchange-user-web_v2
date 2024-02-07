import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import type { AppProps } from "next/app";
import Head from "next/head";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { RecoilRoot } from "recoil";
import { CookiesProvider } from "react-cookie";

import ".src/lib/recoil";
import "react-notion-x/src/styles.css";
import ".src/styles/globals.scss";

import Layout from ".src/components/layouts/Layout";

export default function App({ Component, ...rest }: AppProps) {
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
          </Layout>
          <ReactQueryDevtools />
        </QueryClientProvider>
      </CookiesProvider>
    </RecoilRoot>
  );
}
