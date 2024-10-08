import { Delete, Get, Post } from "../services";

import { PageResponse } from "@/shared/types/commonType";
import {
  BlockedUser,
  DeleteRemoveUserRequest,
  HiddenUser,
  PostHideUserRequest,
  PostHideUserResponse,
} from "@/shared/types/settingType";

/** 숨김 사용자 목록 조회 */
export const GET_hidden_users = async () => {
  const { data } = await Get<HiddenUser[]>("/v1/users/hide", {
    requireToken: true,
  });
  return data.data;
};

/** 숨김 사용자 목록 조회 (IF response값이 페이징 데이터라면) */
export const GET_hidden_users_page_temp = async () => {
  const { data } = await Get<PageResponse<HiddenUser[]>>("/v1/users/hide", {
    requireToken: true,
  });
  return data.data;
};

/** 차단 사용자 목록 조회 */
export const GET_blocked_users = async () => {
  const { data } = await Get<BlockedUser[]>("/v1/users/block", {
    requireToken: true,
  });
  return data.data;
};

/** 사용자 게시글 숨김 */
export const POST_hide_user = async (userId: number) => {
  const response = await Post(`/v1/users/${userId}/hide`, {
    requireToken: true,
  });
  return response.data;
};

/** 사용자 게시글 숨김 (IF RequestBody, ResponseBody가 있을경우 (DELETE, PUT 동일)) */
export const POST_hide_user_req_res_temp = async (request: PostHideUserRequest) => {
  const { data } = await Post<PostHideUserResponse>(`/v1/users/${request.userId}/hide`, request, {
    requireToken: true,
  });
  return data.data;
};

/** 사용자 차단 */
export const POST_block_user = async (userId: number) => {
  const response = await Post(`/v1/users/${userId}/block`, {
    requireToken: true,
  });
  return response.data;
};

/** 사용자 숨김 취소 */
export const DELETE_hide_user = async (userId: number) => {
  const response = await Delete(`/v1/users/${userId}/hide`, {
    requireToken: true,
  });
  return response.data;
};

/** 사용자 차단 취소 */
export const DELETE_block_user = async (userId: number) => {
  const response = await Delete(`/v1/users/${userId}/block`, {
    requireToken: true,
  });
  return response.data;
};

/** 사용자 탈퇴 */
export const DELETE_remove_user = async (request: DeleteRemoveUserRequest) => {
  const response = await Delete("v1/users", {
    data: request,
    requireToken: true,
  });
  return response.data;
};
