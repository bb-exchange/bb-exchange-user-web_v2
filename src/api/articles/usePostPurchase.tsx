import { postPurchase } from "./purchase";

import { useMutation } from "@tanstack/react-query";

export const usePostPurchase = () => {
  const { mutateAsync } = useMutation({
    mutationFn: postPurchase,
  });

  return {
    postPurchase: mutateAsync,
  };
};
