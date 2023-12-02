import { useQuery } from "@tanstack/react-query";

import { ArticleSortByType, articlesByUser } from ".src/api/articles/articles";

export const useArticlesByUser = ({
  userId,
  sortBy,
  size = 4,
  articleId,
}: {
  userId?: number;
  sortBy?: ArticleSortByType;
  size?: number;
  articleId: string;
}) => {
  const setKey = (
    sortBy: ArticleSortByType
  ): [string, { userId?: number; sortBy: ArticleSortByType; size: number }] => [
    articlesByUser.name,
    { userId, sortBy, size },
  ];

  const { data: listPrice, status: listPriceStatus } = useQuery({
    queryKey: setKey("PRICE"),
    queryFn: ({ queryKey: [_, props] }) => articlesByUser(props),
    enabled: !!userId && (sortBy === "PRICE" || sortBy == null),
  });

  const { data: listPopular, status: listPopularStatus } = useQuery({
    queryKey: setKey("POPULAR"),
    queryFn: ({ queryKey: [_, props] }) => articlesByUser(props),
    enabled:
      !!userId &&
      (sortBy === "POPULAR" ||
        (listPriceStatus !== "pending" && !listPrice?.length)),
  });

  const { data: listLatest } = useQuery({
    queryKey: setKey("LATEST"),
    queryFn: ({ queryKey: [_, props] }) => articlesByUser(props),
    enabled:
      !!userId &&
      (sortBy === "LATEST" ||
        (listPopularStatus !== "pending" && !listPopular?.length)),
  });

  const list = (listPrice ?? listPopular ?? listLatest ?? []).filter(
    ({ articleInfo: { articleId: id } }) => id !== Number(articleId)
  );

  return list.length > 3 ? list.slice(0, 3) : list;
};
