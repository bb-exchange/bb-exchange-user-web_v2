import { basicInstance } from "../instance";

//NOTE - 닉네임 등록
interface INickname {
  oauthType: string;
  oauthId: string;
  nickname: string;
}
export const registerNickname = async (body: INickname) => {
  return (await basicInstance.post("/v1/auth/nickname", body)).data;
};

//NOTE - 회원가입
interface IRegister {
  oauthType: string;
  oauthId: string;
  recommendCode: string;
  nickname: string;
}
export const registerUser = async (body: IRegister) => {
  return (await basicInstance.post("/v1/auth/register", body)).data;
};
