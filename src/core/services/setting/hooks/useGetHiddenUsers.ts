import { GET_hidden_users } from "../api";

import { useQuery } from "@tanstack/react-query";

export const useGetHiddenUsers = () => {
  const { data } = useQuery({
    queryKey: [GET_hidden_users.name],
    queryFn: GET_hidden_users,
  });

  return {
    hiddenUsers: data,
  };
};
