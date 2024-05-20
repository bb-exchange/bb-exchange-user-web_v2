import { basicInstance } from "../instance";

export const getActual = async () => {
  return await basicInstance.get("/v1/settlement/actual");
};
