import { getReportReasons } from "./users";

import { useQuery } from "@tanstack/react-query";

export const useGetReportReasons = () => {
  const { data = [], refetch } = useQuery({
    queryKey: ["getReportReasons"],
    queryFn: () => getReportReasons(),
  });

  return {
    reportReasons: data,
    refetch,
  };
};
