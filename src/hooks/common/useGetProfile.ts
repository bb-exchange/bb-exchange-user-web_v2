import { useQuery } from "@tanstack/react-query";
import { useRecoilValue } from "recoil";

import { getProfile } from ".src/api/users/users";
import { currentUserInfo } from ".src/api/users/users";
import { isLoginState } from ".src/recoil";

interface profile {
  userId: number;
  nickname: string;
  description: string;
  balance: number;
  expectedSettlementAmount: number;
  gradeType: string;
  profileImage: string | null;
  recommendCode: string;
  settlementAmount: number;
}
export default function useGetMyProfile() {
  const isLogin = useRecoilValue(isLoginState);

  // NOTE 현재 로그인한 유저 정보
  const { data: currentUserData } = useQuery({
    queryKey: [currentUserInfo.name],
    queryFn: currentUserInfo,
    enabled: isLogin,
    gcTime: Infinity,
  });

  const { data }: any = useQuery({
    queryKey: ["myProfile"],
    queryFn: () => getProfile(currentUserData?.id ?? 0),
    enabled: !!currentUserData?.id,
  });
  return data?.data.data as profile;
}
