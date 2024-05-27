import { useState } from "react";

import { articles, updateArticleBookmark } from ".src/api/articles/articles";
import { ArticleData, Articles, ArticleSearchType } from ".src/api/interface";
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
    select: (data) => {
      setArticlesData({
        totalPages: data.totalPages,
        pageNumber: data.pageNumber,
        size: data.size,
        contents: data.contents,
      });
    },
  });
  const queryClient = useQueryClient();

  type ArticleProps = {
    totalPages: number;
    pageNumber: number;
    size: number;
    contents: ArticleData[];
  };
  const [articlesData, setArticlesData] = useState<ArticleProps>({
    totalPages: 1,
    pageNumber: 0,
    size: 0,
    contents: [],
  });

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
