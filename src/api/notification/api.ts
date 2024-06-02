import { basicInstance } from "../instance";
import { NotificationResponse } from "./types";

export const getNotifications = async (): Promise<NotificationResponse> => {
  const { data } = await basicInstance.get("/v1/notifications");
  return data;
};

export const updateNotification = async (id: number) => {
  const { data } = await basicInstance.put(`/v1/notifications/${id}`);
  return data;
};
export const updateNotificationAll = async () => {
  const { data } = await basicInstance.put(`/v1/notifications/all`);
  return data;
};
