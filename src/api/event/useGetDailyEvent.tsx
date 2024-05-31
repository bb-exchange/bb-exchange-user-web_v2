import { getDailyEvent } from ".";
import { useQuery } from "@tanstack/react-query";

export const useGetDailyEvent = (userId: number) => {
  const { data, refetch } = useQuery({
    queryKey: [getDailyEvent.name],
    queryFn: () => getDailyEvent(userId),
    enabled: !!userId,
  });

  return {
    dailyEvent: data?.data,
    refetch,
  };
};
