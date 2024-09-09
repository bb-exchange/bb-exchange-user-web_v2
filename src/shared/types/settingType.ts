export interface HiddenUser {
  userId: number;
  image: string;
  nickname: string;
  gradeType: string;
}

export interface BlockedUser extends HiddenUser {}

export interface PostHideUserRequest {
  userId: number;
  userName: string;
}

export interface PostHideUserResponse {
  code: number;
  message: string;
}

export interface DeleteRemoveUserRequest {
  reason: string;
}