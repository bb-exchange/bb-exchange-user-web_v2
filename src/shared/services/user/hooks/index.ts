import { GET_my_profile, GET_user_profile } from "../api";
import { useQuery } from "@tanstack/react-query";

export const useMyData = () => {
  return useQuery({
    queryKey: [GET_my_profile.name],
    queryFn: GET_my_profile,
    select: (data) => data,
  });
};

export const useUserProfile = (userId: number) => {
  return useQuery({
    queryKey: [GET_user_profile.name, userId],
    queryFn: () => GET_user_profile({ userId }),
    select: (data) => data,
  });
};
