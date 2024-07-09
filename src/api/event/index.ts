import { basicInstance } from "@api/instance";

export const getDailyEvent = async () =>
  (await basicInstance.get<GetEventsRes>("/v1/events/daily")).data;

export const isDailyEventSuccess = async (userId: number, eventType: string) =>
  await basicInstance.get<IsDailyEventSuccessRes>(`/v1/events/daily/done/${eventType}`, {
    params: {
      userId,
    },
  });
