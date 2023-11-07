import { basicInstance } from "../instance";

export const fetchCategory = async () =>
  await basicInstance
    .get("/v1/articles/category")
    .then(
      ({
        data: { data },
      }: {
        data: { data: Array<{ category: string; description: string }> };
      }) => data
    );
