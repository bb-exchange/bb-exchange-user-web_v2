import { basicInstance } from "../instance";

export const getActual = async () => {
  return await basicInstance.get("/v1/settlement/actual");
};

export const postProfitToPoint = async ({ amount }: { amount: number }) => {
  return await basicInstance.post("/v1/settlement/profit-to-point", { amount });
};
