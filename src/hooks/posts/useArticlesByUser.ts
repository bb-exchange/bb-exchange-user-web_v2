import { articlesByUser } from ".src/api/articles/articles";
import { ArticleSortBy } from ".src/api/interface";
import { useQuery } from "@tanstack/react-query";

export const useArticlesByUser = ({
  userId,
  sortBy,
  size = 4,
  articleId,
}: {
  userId?: number;
  sortBy?: ArticleSortBy;
  size?: number;
  articleId: string;
}) => {
  const setKey = (
    sortBy: ArticleSortBy,
  ): [string, { userId?: number; sortBy: ArticleSortBy; size: number }] => [
    articlesByUser.name,
    { userId, sortBy, size },
  ];

  const { data: listPrice, status: listPriceStatus } = useQuery({
    queryKey: setKey("PRICE"),
    queryFn: ({ queryKey: [_, props] }) => articlesByUser(props),
    enabled: !!userId && (sortBy === "PRICE" || sortBy == null),
  });

  const { data: listLatest } = useQuery({
    queryKey: setKey("LATEST"),
    queryFn: ({ queryKey: [_, props] }) => articlesByUser(props),
    enabled:
      !!userId && (sortBy === "LATEST" || (listPriceStatus !== "pending" && !listPrice?.length)),
  });

  const list = (listPrice ?? listLatest ?? []).filter(
    ({ articleInfo: { articleId: id } }) => id !== Number(articleId),
  );

  return list.length > 3 ? list.slice(0, 3) : list;
};
