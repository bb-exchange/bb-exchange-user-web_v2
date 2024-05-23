import { useMemo } from "react";

import { articles, updateArticleBookmark } from ".src/api/articles/articles";
import { Articles, ArticleSearchType } from ".src/api/interface";
import { keepPreviousData, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useArticles = (props: {
  searchType: ArticleSearchType;
  category: string;
  page: number;
}) => {
  const queryKey = [articles.name, props];

  // NOTE 글 목록
  const { data } = useQuery({
    queryKey,
    queryFn: () => articles(props),
    placeholderData: keepPreviousData,
  });

  const queryClient = useQueryClient();

  const articlesData = useMemo(
    () =>
      data == null
        ? { totalPages: 1, pageNumber: 0, contents: [], size: 0 }
        : {
            totalPages: data.totalPages,
            pageNumber: data.pageNumber,
            contents: data.contents,
            size: data.size,
          },
    [data],
  );

  // NOTE 글 목록 수정
  const { mutate: mutateArticle } = useMutation({
    mutationFn: ({ index, ...props }: { index: number; bookmarking: boolean; articleId: number }) =>
      updateArticleBookmark(props),
    onMutate: ({ index, bookmarking }) => {
      queryClient.setQueryData<Articles>(queryKey, (articles) => {
        if (articles != null) {
          const { contents } = articles;
          contents[index].articleInfo.interest = bookmarking;
        }
        return articles;
      });
    },
    onError: () => {
      // TODO alert
    },
  });

  return { articlesData, mutateArticle };
};
