import { basicInstance } from "../instance";

/**
 * 통신사 코드 가져오기 api
 */
export const getTelecoms = async () => {
  const data = await basicInstance.get("/v1/phone/telecoms");
  return data;
};
