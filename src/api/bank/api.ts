import { basicInstance } from "../instance";
import { BankInfoType } from "./type";

/**
 * 유저 은행정보 불러오기 api
 */
export const getBankDetails = async () => {
  const response = await basicInstance.get("/v1/bankdetails");
  return response;
};
/**
 * 은행 목록 조회 api
 */
export const getBanks = async () => {
  const { data } = await basicInstance.get("/v1/banks");
  return data;
};

/**
 * 유저 은행정보 없으면 업데이트 하기
 */
export const updateBankDetails = async (data: BankInfoType) => {
  const response = await basicInstance.post("/v1/bankdetails/update", data);
  return response;
};
