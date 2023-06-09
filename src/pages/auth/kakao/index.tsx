import { basicInstance } from ".src/api/instance";
import LocalStorage from ".src/util/localStorage";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useCookies } from "react-cookie";

const KakaoAuth = () => {
  const { query, push } = useRouter();
  const setCookie = useCookies(["authKey"])[1];

  useEffect(() => {
    if (query?.code) {
      //getKakaoToken
      (async () => {
        const { data } = await axios.post(
          "https://kauth.kakao.com/oauth/token ",
          {
            code: query.code,
            grant_type: "authorization_code",
            client_id: process.env.NEXT_PUBLIC_KAKAO_JS_KEY,
            redirect_uri: process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URI,
          },
          {
            headers: {
              "Content-type": "application/x-www-form-urlencoded;charset=utf-8",
            },
          }
        );
        //send kakaoToken to server
        if (data) {
          const response = await basicInstance.post("/v1/auth/oidc/login", {
            idToken: data.id_token,
            accessToken: data.access_token,
          });
          //reponse에 status가 PHONE_VERIFIED이면(비회원) => 서비스 이용동의 페이지 => 닉네임 설정 페이지
          //accessToken이 있으면(회원) => 메인페이지로 랜딩
          console.log(response.data);
          if (response.data.status === "PHONE_VERIFIED") {
            setCookie("authKey", response.data.data.data.key, {
              path: "/",
            });
            push("/auth/terms-agreement?from=kakao");
          } else if (response.data.oauthTypes) {
            //이미 가입된 정보가 있는 경우(response에 oauthType 내려옴)
            LocalStorage.setItem("oauthType", response.data.oauthTypes[0]);
            push("/auth/duplicate-social-account");
          }
        }
      })();
    }
  }, [query?.code]);
  return <div></div>;
};

export default KakaoAuth;
