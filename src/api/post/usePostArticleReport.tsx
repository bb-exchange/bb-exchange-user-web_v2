import { reportArticle } from "./post";

import { useMutation } from "@tanstack/react-query";

export const usePostArticleReport = () => {
  const { mutateAsync } = useMutation({
    mutationFn: reportArticle,
  });

  return {
    reportArticle: mutateAsync,
  };
};
