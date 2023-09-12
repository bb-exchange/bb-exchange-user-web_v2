import { basicInstance } from "../instance";

export const fetchArticles = async ({ queryKey }: { queryKey: any[] }) => {
  const [sortBy, page]: string[] = queryKey;

  return await basicInstance.get(`/v1/articles`, {
    params: {
      sortBy: sortBy.toUpperCase(),
      page,
    },
  });
};

export const postArticle = async (formData: IpostArticle) => {
  basicInstance.post(`/v1/articles`, formData).then((res) => console.log(res));
};

export const postImages = async (formData: any) => {
  console.log(formData);

  return basicInstance.post("/v1/images/multi", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};

export const userArticles = async (query: string) => {
  return await basicInstance.get(`/v1/articles/users/${query}`);
};
