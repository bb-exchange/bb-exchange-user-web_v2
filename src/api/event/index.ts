import { basicInstance } from "@api/instance";

export const getDailyEvent = async (userId: number) =>
  (
    await basicInstance.get<GetEventsRes>("/v1/events/daily", {
      params: {
        userId,
      },
    })
  ).data;

export const isDailyEventSuccess = async (userId: number, eventType: string) =>
  await basicInstance.get<IsDailyEventSuccessRes>(`/v1/events/daily/done/${eventType}`, {
    params: {
      userId,
    },
  });
