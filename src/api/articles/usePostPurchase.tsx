import { postPurchase } from "./purchase";

import { useMutation } from "@tanstack/react-query";

export const usePostPurchase = (articleId: number) => {
  const { mutateAsync } = useMutation({
    mutationFn: () => postPurchase(articleId),
  });
  console.log(articleId);

  return {
    postPurchase: mutateAsync,
  };
};
