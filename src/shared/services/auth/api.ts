import axios from "axios";

import api from "@/shared/lib/api";
import {
  GoogleLoginResponse,
  LoginResponse,
  SignUpResponse,
  SocialLoginType,
} from "@/shared/types/signInType";

export const POST_service_login = async ({
  idToken,
  accessToken,
  oauthType,
}: {
  idToken: string;
  accessToken: string;
  oauthType: SocialLoginType;
}): Promise<LoginResponse> => {
  const { data }: { data: LoginResponse } = await api.post("/v1/auth/oidc/login", {
    idToken,
    accessToken,
    oauthType,
  });
  return data;
};

export const POST_signup = async ({
  idToken,
  oauthType,
  kakaoAccessToken,
}: {
  idToken: string;
  oauthType: SocialLoginType;
  kakaoAccessToken?: string;
}): Promise<SignUpResponse> => {
  const { data }: { data: SignUpResponse } = await api.post("/v1/auth/register/verify ", {
    oauthType,
    idToken,
    kakaoAccessToken: kakaoAccessToken ?? null,
  });
  return data;
};

export const POST_google_login = async ({
  code,
}: {
  code: string;
}): Promise<GoogleLoginResponse> => {
  const { data }: { data: GoogleLoginResponse } = await axios.post(
    `https://www.googleapis.com/oauth2/v4/token`,
    {
      code,
      grant_type: "authorization_code",
      client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
      client_secret: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET,
      redirect_uri: process.env.NEXT_PUBLIC_GOOGLE_REDIRECT_URI,
    },
    { headers: { "content-type": "application/x-www-form-urlencoded" } },
  );
  return data;
};
