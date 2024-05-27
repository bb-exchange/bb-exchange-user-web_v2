import { basicInstance } from "../instance";

export const getNotifications = async (currentUserId: number) => {
  return await basicInstance.get("/v1/notifications", { params: currentUserId });
};
