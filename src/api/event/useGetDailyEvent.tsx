import { getDailyEvent } from ".";
import { useQuery } from "@tanstack/react-query";

export const useGetDailyEvent = () => {
  const { data, refetch } = useQuery({
    queryKey: [getDailyEvent.name],
    queryFn: () => getDailyEvent(),
  });

  return {
    dailyEvent: data?.data,
    refetch,
  };
};
