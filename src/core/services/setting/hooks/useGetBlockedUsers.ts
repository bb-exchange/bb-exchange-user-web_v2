import { GET_blocked_users } from "../api";

import { useQuery } from "@tanstack/react-query";

export const useGetBlockedUsers = () => {
  const { data } = useQuery({
    queryKey: [GET_blocked_users.name],
    queryFn: GET_blocked_users,
  });

  return {
    blockedUsers: data,
  };
};
