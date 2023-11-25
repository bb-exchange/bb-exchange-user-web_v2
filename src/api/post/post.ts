import { basicInstance } from "../instance";
import { IPostDetailRes } from "../interface/post";

export const fetchPost = async (articleId?: string) => {
  if (articleId == null) return;

  return (await basicInstance.get(
    `/v1/articles/${articleId}`
  )) as IPostDetailRes;
};

// NOTE 게시글 좋아요 등록/해제
export const updateLikePost = async ({
  isLike,
  articleId,
}: {
  isLike: boolean;
  articleId: string;
}) => {
  const method = isLike ? "POST" : "DELETE";
  return await basicInstance({
    url: `/v1/articles/${articleId}/like`,
    method,
  })
    .then(({ data: { message } }: { data: { message: string } }) => message)
    .catch((error) => {
      throw error.response.data;
    });
};

// NOTE 게시글 싫어요 등록/해제
export const updateDislikePost = async ({
  isDislike,
  articleId,
}: {
  isDislike: boolean;
  articleId: string;
}) => {
  const method = isDislike ? "POST" : "DELETE";
  return await basicInstance({
    url: `/v1/articles/${articleId}/dislike`,
    method,
  })
    .then(({ data: { message } }: { data: { message: string } }) => message)
    .catch((error) => {
      throw error.response.data;
    });
};
