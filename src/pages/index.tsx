import { GetServerSideProps, InferGetServerSidePropsType } from "next";
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
}> = async () => {
  const queryClient = new QueryClient();

  const defaultValues = {
    category: "ALL",
    sortBy: "LATEST" as const,
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
