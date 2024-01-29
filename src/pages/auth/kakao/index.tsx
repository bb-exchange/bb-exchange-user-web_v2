import axios from "axios";
import { useRouter } from "next/router";
import Image from "next/image";
import { useCookies } from "react-cookie";
import { useEffect } from "react";
import { useSetRecoilState } from "recoil";

import { basicInstance } from ".src/api/instance";
import styles from "../loadingLayout.module.scss";
import { isLoginState, userNameState } from ".src/recoil";

const KakaoAuth = () => {
  const { query, push } = useRouter();
  const [cookie, setCookie] = useCookies([
    "oauthId",
    "oauthType",
    "accessToken",
    "refreshToken",
  ]);
  const setIsLoginState = useSetRecoilState(isLoginState);
  const setUserNameState = useSetRecoilState(userNameState);

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
            oauthType: "KAKAO",
          });
          //not registerd
          if (response.data.message === "등록되지 않은 유저입니다.") {
            //check kakao user account
            const {
              data: { data: registerVerifyData },
            } = await basicInstance.post("/v1/auth/register/verify ", {
              oauthType: "KAKAO",
              idToken: data.id_token,
              kakaoAccessToken: data.access_token,
            });

            if (registerVerifyData.status === "PHONE_VERIFIED") {
              //휴대폰 인증까지 완료
              setCookie("oauthId", registerVerifyData.oauthId, {
                path: "/",
              });
              setCookie("oauthType", registerVerifyData.oauthType, {
                path: "/",
              });
              push({
                pathname: `/auth/terms-agreement`,
                query: { status: "phoneVerified" },
              });
            } else if (registerVerifyData.status === "ALREADY_REGISTERED") {
              //소셜 계정 중복
              setCookie("oauthId", registerVerifyData.oauthId, {
                path: "/",
              });
              setCookie("oauthType", registerVerifyData.oauthType, {
                path: "/",
              });
              push("/auth/duplicate-social-account");
            }
          } else if (
            response.data.data.accessToken &&
            response.data.data.refreshToken
          ) {
            //정상 로그인 처리
            setCookie("accessToken", response.data.data.accessToken, {
              path: "/",
            });
            setCookie("refreshToken", response.data.data.refreshToken, {
              path: "/",
            });
            //닉네임 가져오기
            const { data } = await axios.get(
              `https://api.stage-bibeop.com/v1/users/me`,
              {
                headers: {
                  Authorization: `Bearer ${response.data.data.accessToken}`,
                },
              }
            );
            setIsLoginState(true);
            setUserNameState(data?.data.nickname);
            push("/");
          }
        }
      })();
    }
  }, [query?.code]);

  return (
    <div className={styles.loadingLayout}>
      <Image
        src={"/assets/icons/loading/threeDots.gif"}
        alt={"loading dots"}
        width={150}
        height={150}
      />
    </div>
  );
};

export default KakaoAuth;
