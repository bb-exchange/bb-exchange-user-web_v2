import { fetchCategory } from ".src/api/articles/category";
import { useQuery } from "@tanstack/react-query";

export default function usePostCategoryQuery() {
  const { data } = useQuery({
    queryKey: ["articleCategory"],
    queryFn: fetchCategory,
  });

  return data?.data;
}
