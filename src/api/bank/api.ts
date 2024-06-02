import { basicInstance } from "../instance";

/**
 * 유저 은행정보 불러오기 api
 */
export const getBankInfo = async () => {
  return await basicInstance.get("/v1/bankdetails");
};
/**
 * 은행 목록 조회 api
 */
export const getBanks = async () => {
  return await basicInstance.get("/v1/banks");
};
