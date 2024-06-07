import { isDailyEventSuccess } from ".";
import { useQuery } from "@tanstack/react-query";

export const useIsDailyEventSuccess = (userId: number, eventType: string) => {
  const { data } = useQuery({
    queryKey: [isDailyEventSuccess.name],
    queryFn: () => isDailyEventSuccess(userId, eventType),
    enabled: !!userId && !!eventType,
  });

  return {
    isDailyEventSuccess: data?.data,
  };
};
