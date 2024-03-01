import { basicInstance } from "../instance";

export const editMyProfile = async (data: any) => {
  return await basicInstance.patch("/v1/users/profile", data);
};

export const getProfile = async (userId: number) =>
  await basicInstance.get(`/v1/users/profile/${userId}`);

export const deleteBlockUser = async (userId: number) => {
  return await basicInstance.delete(`/v1/users/${userId}/block`);
};

export const withdrawal = async () => {
  return await basicInstance.delete("v1/users", { data: { reason: "기타" } });
};

export const getEthicalPledge = async () => {
  return (await basicInstance.get("v1/users/ethical-pledge")).data;
};

export const postEthicalPledge = async () => {
  return await basicInstance.patch("v1/users/ethical-pledge");
};

// NOTE 로그인한 사용자 정보
export const currentUserInfo = async () =>
  await basicInstance
    .get(`/v1/users/me`)
    .then(
      ({
        data: { data },
      }: {
        data: { data: { id: number; nickname: string } };
      }) => data
    );

// NOTE 특정 사용자 글 숨기기
export const hideAuthorsPosts = async ({
  author,
  userId,
}: {
  author: number;
  userId: number;
}) =>
  await basicInstance
    .post(`/v1/users/${author}/hide`, {
      params: { currentUserId: userId },
    })
    .then(({ data: { message } }: { data: { message: string } }) => message);

// NOTE 닉네임 존재여부 체크
export const checkNickname = async (nickname: string) =>
  await basicInstance
    .get(`/v1/users/nickname/${nickname}/exists`)
    .then(({ data: { data } }) => data);

//NOTE - 추천인 코드 존재여부 체크
export const checkRecommendCode = async (recommendCode: string) =>
  await basicInstance
    .get(`/v1/users/recommend-code/${recommendCode}/exists`)
    .then(({ data: { data } }) => data);
