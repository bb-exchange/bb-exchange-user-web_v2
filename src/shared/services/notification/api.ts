import api from "@/shared/lib/api";
import { NotificationResponse } from "@/shared/types/notificationType";

export const GET_notifications = async (): Promise<NotificationResponse> => {
  const { data } = await api.get("/v1/notifications", { requireToken: true });
  return data;
};

export const PUT_notification_by_id = async (id: number) => {
  const { data } = await api.put(`/v1/notifications/${id}`, { requireToken: true });
  return data;
};
export const PUT_notification_all = async () => {
  const { data } = await api.put(`/v1/notifications/all`, { requireToken: true });
  return data;
};
