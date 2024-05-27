import { basicInstance } from "../instance";
import { NotificationResponse } from "./types";

export const getNotifications = async (): Promise<NotificationResponse> => {
  const { data } = await basicInstance.get("/v1/notifications");
  return data;
};
