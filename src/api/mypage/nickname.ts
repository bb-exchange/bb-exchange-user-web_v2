import { basicInstance } from "../instance";

export const checkUserNickname = async (nickname: string) => {
  return await basicInstance.get("/v1/users/is-exists", {
    params: { nickname },
  });
};
