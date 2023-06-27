import { getMyProfile } from ".src/api/users/users";
import { useQuery } from "@tanstack/react-query";

export default function useGetMyProfile() {
  const { data }: any = useQuery(["myProfile"], getMyProfile);
  return data?.data;
}
