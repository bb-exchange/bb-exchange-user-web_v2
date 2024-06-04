import { basicInstance } from "../instance";

/**
 * 유저 은행정보 불러오기 api
 */
export const getBankInfo = async () => {
  const data = await basicInstance.get("/v1/bankdetails");
  return data;
};
/**
 * 은행 목록 조회 api
 */
export const getBanks = async () => {
  const data = await basicInstance.get("/v1/banks");
  return data;
};
