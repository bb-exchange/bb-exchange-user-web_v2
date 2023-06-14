import { basicInstance } from ".src/api/instance";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useCookies } from "react-cookie";

const AppleAuth = () => {
  const { query, push } = useRouter();
  const [cookie, setCookie] = useCookies([
    "authKey",
    "accessToken",
    "refreshToken",
  ]);

  //https://appleid.apple.com/auth/token

  useEffect(() => {
    if (query?.code) {
      (async () => {
        const res = await axios.post(
          `https://appleid.apple.com/auth/token`,
          {
            code: query?.code,
            grant_type: "authorization_code",
            client_id: process.env.NEXT_PUBLIC_APPLE_CLIENT_ID,
            client_secret: process.env.NEXT_PUBLIC_APPLE_CLIENT_SECRET,
            redirect_uri: process.env.NEXT_PUBLIC_APPLE_REDIRECT_URI,
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
            // dispatch(signIn()); //전역 로그인 처리
            push("/");
          }
        }
      })();
    }
  }, [query?.code]);
  return <div></div>;
};

export default AppleAuth;
