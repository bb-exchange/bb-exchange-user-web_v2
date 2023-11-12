import {
  Articles,
  articles,
  updateArticleBookmark,
} from ".src/api/articles/articles";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useArticles = (props: {
  sortBy: "LATEST" | "POPULAR" | "LISTED";
  category: string;
  page: number;
}) => {
  const queryKey = ["articles", props];

  // NOTE 글 목록
  const { data: articleList } = useQuery({
    queryKey,
    queryFn: () => articles(props),
  });

  const queryClient = useQueryClient();

  // NOTE 글 목록 수정
  const { mutate: mutateArticle } = useMutation({
    mutationFn: ({
      index,
      ...props
    }: {
      index: number;
      bookmarking: boolean;
      articleId: number;
    }) => updateArticleBookmark(props),
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

  return { articleList, mutateArticle };
};
