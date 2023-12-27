import { basicInstance } from "../instance";

export const editMyProfile = async (data: any) => {
  return await basicInstance.patch("/v1/users/profile", data);
};

export const getProfile = async (userId: number) => {
  return await basicInstance.get(`/v1/users/profile/${userId}`);
};

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
