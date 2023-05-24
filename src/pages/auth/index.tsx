import axios from "axios";
import { useRouter } from "next/router";
import { useEffect } from "react";

const Auth = () => {
  //(비회원인 경우)
  //카카오 인증 성공 -> 바로 닉네임 설정 페이지로 이동 (휴대폰 인증 단계 X)
  //구글, 애플 인증 성공 -> 휴대폰 인증 페이지로 이동 -> 닉네임 설정 페이지로 이동 (중도 이탈 시 맨 처음부터 시작)

  //(회원인 경우)
  //인증 성공 -> 메인 페이지로 랜딩

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
