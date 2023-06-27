import { fetchCategory } from ".src/api/articles/category";
import { useQuery } from "@tanstack/react-query";

export default function usePostCategoryQuery() {
  const { data } = useQuery(["articleCategory"], fetchCategory, {
    retry: false,
  });

  return data?.data;
}
