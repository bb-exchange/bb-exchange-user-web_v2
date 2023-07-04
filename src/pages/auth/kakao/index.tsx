import { basicInstance } from ".src/api/instance";
import { signIn } from ".src/features/userSlice";
import LocalStorage from ".src/util/localStorage";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useCookies } from "react-cookie";
import { useDispatch } from "react-redux";

const KakaoAuth = () => {
  const { query, push } = useRouter();
  const [cookie, setCookie] = useCookies([
    "authKey",
    "accessToken",
    "refreshToken",
  ]);
  const dispatch = useDispatch();

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
          console.log(response);
          //reponse에 status가 PHONE_VERIFIED이면(비회원) => 서비스 이용동의 페이지 => 닉네임 설정 페이지
          //accessToken이 있으면(회원) => 메인페이지로 랜딩
          if (response.data.data.data.status === "PHONE_VERIFIED") {
            setCookie("authKey", response.data.data.data.key, {
              path: "/",
            });
            push("/auth/terms-agreement?from=kakao");
          } else if (response.data.data.data.oauthTypes) {
            //이미 가입된 정보가 있는 경우(response에 oauthType 내려옴)
            LocalStorage.setItem(
              "oauthType",
              response.data.data.data.oauthTypes[0]
            );
            push("/auth/duplicate-social-account");
          } else if (
            response.data.data.data.accessToken &&
            response.data.data.data.refreshToken
          ) {
            //정상 로그인 처리
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

export default KakaoAuth;
