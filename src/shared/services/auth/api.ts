import axios from "axios";

import api from "@/shared/lib/api";
import { GoogleLoginResponse, LoginResponse, SignUpResponse } from "@/shared/types/signInType";

export const POST_google_login = async (code: string): Promise<GoogleLoginResponse> => {
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

export const POST_service_login = async (idToken: string): Promise<LoginResponse> => {
  const { data }: { data: LoginResponse } = await api.post("/v1/auth/oidc/login", {
    idToken,
    oauthType: "GOOGLE",
  });
  return data;
};

export const POST_signup = async (idToken: string): Promise<SignUpResponse> => {
  const { data }: { data: SignUpResponse } = await axios.post("/v1/auth/register/verify ", {
    oauthType: "GOOGLE",
    idToken,
    kakaoAccessToken: null,
  });
  return data;
};
