import { basicInstance } from "../instance";

export const getBankInfo = async () => {
  return await basicInstance.get("/v1/bankdetails");
};
