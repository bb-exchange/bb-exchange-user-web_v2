import { reportUser } from "./post";

import { useMutation } from "@tanstack/react-query";

export const usePostUserReport = () => {
  const { mutateAsync } = useMutation({
    mutationFn: reportUser,
  });

  return {
    reportUser: mutateAsync,
  };
};
