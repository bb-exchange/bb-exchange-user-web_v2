import { basicInstance } from "../instance";

export const getMyProfile = async () => {
  return await basicInstance.get("/v1/users/profile");
};

export const getProfile = async (userId: number) => {
  return await basicInstance.get(`/v1/users/profile?user_id=${userId}`);
};

export const deleteBlockUser = async (userId: number) => {
  return await basicInstance.delete(`/v1/users/${userId}/block`);
};
