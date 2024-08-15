import { NotificationResponse } from "./type";

import api from "@/shared/lib/api";

export const GET_notifications = async (): Promise<NotificationResponse> => {
  const { data } = await api.get("/v1/notifications");
  return data;
};

export const PUT_notification_by_id = async (id: number) => {
  const { data } = await api.put(`/v1/notifications/${id}`);
  return data;
};
export const PUT_notification_all = async () => {
  const { data } = await api.put(`/v1/notifications/all`);
  return data;
};
