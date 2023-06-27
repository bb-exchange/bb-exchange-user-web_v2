import { basicInstance } from ".src/api/instance";
import { signIn } from ".src/features/userSlice";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useCookies } from "react-cookie";
import { useDispatch } from "react-redux";

const AppleAuth = () => {
  const { query, push } = useRouter();
  const dispatch = useDispatch();
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
            setCookie("authKey", response.data.data.data.key, {
              path: "/",
            });
            push("/auth/terms-agreement");
          } else if (
            response.data.data.data.accessToken &&
            response.data.data.data.refreshToken
          ) {
            setCookie("accessToken", response.data.data.data.accessToken, {
              path: "/",
            });
            setCookie("refreshToken", response.data.data.data.refreshToken, {
              path: "/",
            });
            //닉네임 가져오기
            const { data } = await axios.get(
              `https://api.stage-bibubex.com/v1/users/me`,
              {
                headers: {
                  Authorization: `Bearer ${response.data.data.data.accessToken}`,
                },
              }
            );
            dispatch(signIn(data?.data.nickname)); //전역 로그인 처리
            push("/");
          }
        }
      })();
    }
  }, [query?.code]);
  return <div></div>;
};

export default AppleAuth;
