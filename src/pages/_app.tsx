import Layout from ".src/components/layouts/Layout";
import ".src/styles/globals.scss";
import type { AppProps } from "next/app";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { CookiesProvider, useCookies } from "react-cookie";
import { wrapper } from ".src/app/store";
import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";

export default function App({ Component, ...rest }: AppProps) {
  const queryClient = new QueryClient();
  const { store, props } = wrapper.useWrappedStore(rest);

  return (
    <Provider store={store}>
      <PersistGate persistor={store.__persistor}>
        <CookiesProvider>
          <QueryClientProvider client={queryClient}>
            <Layout pageProps={props.pageProps}>
              <Component {...props.pageProps} />
            </Layout>
            <ReactQueryDevtools />
          </QueryClientProvider>
        </CookiesProvider>
      </PersistGate>
    </Provider>
  );
}
