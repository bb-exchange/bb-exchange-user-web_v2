import { postReportByUserId } from "./users";

import { useMutation } from "@tanstack/react-query";

export const usePostReportByUserId = () => {
  const { mutateAsync } = useMutation({
    mutationFn: postReportByUserId,
  });

  return {
    postReportByUserIdMutate: mutateAsync,
  };
};
