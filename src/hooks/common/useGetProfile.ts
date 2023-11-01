import { getMyProfile } from ".src/api/users/users";
import { useQuery } from "@tanstack/react-query";

interface profile {
  userId: number;
  nickname: string;
  description: string;
  balance: number;
  withdrawableBalance: number;
}
export default function useGetMyProfile() {
  const { data }: any = useQuery({
    queryKey: ["myProfile"],
    queryFn: getMyProfile,
  });
  return data?.data.data as profile;
}
