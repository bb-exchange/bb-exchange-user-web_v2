import {
  GetServerSideProps,
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
} from "next";
import {
  DehydratedState,
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";

import { articles } from ".src/api/articles/articles";

import Lastest from "./latest";

export const getServerSideProps: GetServerSideProps<{
  dehydratedState: DehydratedState;
}> = async (context: GetServerSidePropsContext) => {
  const userAgent = context.req.headers["user-agent"];
  // console.log({ userAgent });
  if (userAgent?.includes("Mobile")) {
    console.log("Mobile!");
  }

  const queryClient = new QueryClient();

  const defaultValues = {
    category: "ALL",
    searchType: "LATEST" as const,
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
      commonSort: "최신",
    },
  };
};

export default function Home({
  dehydratedState,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <HydrationBoundary state={dehydratedState}>
      <Lastest />
    </HydrationBoundary>
  );
}
