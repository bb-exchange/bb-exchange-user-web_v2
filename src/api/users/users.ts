import { basicInstance } from "../instance";

export const getMyProfile = async () => {
  return await basicInstance.get("/v1/users/profile");
};

export const getProfile = async (userId: string) => {
  return await basicInstance.get(`/v1/users/profile?user_id=${userId}`);
};
