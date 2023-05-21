import { basicInstance } from "../instance";

export const fetchCategory = async () => {
  return await basicInstance.get("/v1/articles/category");
};
