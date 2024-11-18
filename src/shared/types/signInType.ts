export interface GoogleLoginResponse {
  access_token: string;
  expires_in: number;
  scope: string;
  token_type: string;
  id_token: string;
}

export interface LoginResponse {
  code?: string;
  message?: string;
  data?: {
    accessToken: string;
    refreshToken: string;
    accessTokenExpiredDate: number;
  };
}

export interface SignUpResponse {
  data: {
    status: string;
    oauthId: string;
    oauthType: string;
  };
}

export interface TokenDataType {
  isNewUser: boolean;
  accessToken?: string;
  refreshToken?: string;
}

export type SocialLoginType = "GOOGLE" | "KAKAO" | "APPLE";
