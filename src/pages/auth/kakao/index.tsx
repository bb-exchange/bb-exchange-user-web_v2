import axios from "axios";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useCookies } from "react-cookie";

//(비회원인 경우)
//카카오 인증 성공 -> 바로 닉네임 설정 페이지로 이동 (휴대폰 인증 단계 X)
//구글, 애플 인증 성공 -> 휴대폰 인증 페이지로 이동 -> 닉네임 설정 페이지로 이동 (중도 이탈 시 맨 처음부터 시작)

//(회원인 경우)
//인증 성공 -> 메인 페이지로 랜딩
const KakaoAuth = () => {
  const { query, push } = useRouter();
  const setCookie = useCookies(["authKey"])[1];

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
          code: query.code,
          grant_type: "authorization_code",
          client_id: process.env.NEXT_PUBLIC_KAKAO_JS_KEY,
          redirect_uri: process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URI,
        });
        //send kakaoToken to server
        if (data) {
          const response = await axios.post(
            "https://api.stage-bibubex.com/v1/auth/oidc/login",
            {
              idToken: data.id_token,
              accessToken: data.access_token,
            }
          );
          //reponse에 key가 있으면(비회원) => 닉네임 설정 페이지로 이동
          //accessToken이 있으면(회원) => 메인페이지로 랜딩
          if (response.data.data.data.key) {
            setCookie("authKey", response.data.data.data.key, {
              path: "/",
            });
            push("/auth/user-nickname");
          }
        }
      })();
    }
    console.log(query.code);
  }, [query?.code]);
  return <div></div>;
};

export default KakaoAuth;
