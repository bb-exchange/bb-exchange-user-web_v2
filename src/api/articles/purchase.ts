import { basicInstance } from "@api/instance";

export const postPurchase = async (articleId: number) =>
  await basicInstance.post("/v1/articles/purchase", {
    params: {
      articleId,
    },
  });
