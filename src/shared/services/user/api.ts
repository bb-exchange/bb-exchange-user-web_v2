import api from "@/shared/lib/api";
import { MyDataResponse, UserProfileResponse } from "@/shared/types/userType";

export const GET_my_profile = async (): Promise<MyDataResponse> => {
  const { data }: { data: MyDataResponse } = await api.get("/v1/users/me");
  return data;
};

export const GET_user_profile = async ({
  userId,
}: {
  userId: number;
}): Promise<UserProfileResponse> => {
  const { data }: { data: UserProfileResponse } = await api.get(`/v1/users/profile/${userId}`);
  return data;
};
