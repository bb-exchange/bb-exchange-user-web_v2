import axios from "axios";
import { useRouter } from "next/router";
import { useEffect } from "react";

const Auth = () => {
  const { query } = useRouter();
  console.log(query);
  const instance = axios.create({
    baseURL: "https://kauth.kakao.com/",
    timeout: 1000,
    headers: {
      "Content-type": "application/x-www-form-urlencoded;charset=utf-8",
    },
  });
  useEffect(() => {
    if (query?.code) {
      //getKakaoToken
      (async () => {
        const { data } = await instance.post("oauth/token ", {
          grant_type: "authorization_code",
          client_id: process.env.NEXT_PUBLIC_KAKAO_JS_KEY,
          redirect_uri: "http://localhost:3000/auth",
          code: query.code,
        });
        console.log(data);
        //send kakaoToken to server
        if (data) {
          const res = await axios.post(
            "https://api.stage-bibubex.com/v1/auth/oidc/login",
            {
              idToken: data.id_token,
              accessToken: data.access_token,
            }
          );
          console.log(res);
        }
      })();
    }
  }, [query?.code]);

  return <div></div>;
};

export default Auth;
