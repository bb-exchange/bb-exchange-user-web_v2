import { basicInstance } from ".src/api/instance";
import axios from "axios";
import { cookies } from "next/dist/client/components/headers";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useCookies } from "react-cookie";
//(비회원인 경우)
//카카오 인증 성공 -> 서비스 이용동의 -> 바로 닉네임 설정 페이지로 이동 (휴대폰 인증 단계 X) (중도 이탈 시 맨 처음부터 시작)
//구글, 애플 인증 성공 -> -> 서비스 이용동의-> 휴대폰 인증 페이지로 이동 -> 닉네임 설정 페이지로 이동 (중도 이탈 시 맨 처음부터 시작)

//(회원인 경우)
//인증 성공 -> 메인 페이지로 랜딩

const GoogleAuth = () => {
  const { query, push } = useRouter();
  const [cookie, setCookie] = useCookies([
    "authKey",
    "accessToken",
    "refreshToken",
  ]);

  useEffect(() => {
    if (query?.code) {
      (async () => {
        const res = await axios.post(
          `https://www.googleapis.com/oauth2/v4/token`,
          {
            code: query?.code,
            grant_type: "authorization_code",
            client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
            client_secret: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET,
            redirect_uri: process.env.NEXT_PUBLIC_GOOGLE_REDIRECT_URI,
          },
          { headers: { "content-type": "application/x-www-form-urlencoded" } }
        );
        if (res) {
          const response = await basicInstance.post("/v1/auth/oidc/login", {
            idToken: res.data.id_token,
            accessToken: res.data.access_token,
          });

          if (response.data.status === "OAUTH_VERIFIED") {
            setCookie("authKey", response.data.key, {
              path: "/",
            });
            push("/auth/terms-agreement");
          } else if (response.data.accessToken && response.data.refreshToken) {
            setCookie("accessToken", response.data.accessToken, {
              path: "/",
            });
            setCookie("refreshToken", response.data.refreshToken, {
              path: "/",
            });
            push("/");
            //TO DO: 리덕스 전역 login 처리
          }
        }
      })();
    }
  }, [query?.code]);

  return <div></div>;
};

export default GoogleAuth;
