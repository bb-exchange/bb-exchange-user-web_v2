import { basicInstance } from ".src/api/instance";
import { signIn } from ".src/features/userSlice";
import LocalStorage from ".src/util/localStorage";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useCookies } from "react-cookie";
import { useDispatch } from "react-redux";
import Image from "next/image";
import styles from "../loadingLayout.module.scss";

const KakaoAuth = () => {
  const { query, push } = useRouter();
  const [cookie, setCookie] = useCookies([
    "oauthId",
    "oauthType",
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
            oauthType: "KAKAO",
          });

          //not registerd
          if (response.data.message === "user not registered") {
            //check kakao user account
            const {
              data: { data: registerVerifyData },
            } = await basicInstance.post("/v1/auth/register/verify ", {
              oauthType: "KAKAO",
              idToken: data.id_token,
              kakaoAccessToken: data.access_token,
            });
            console.log(registerVerifyData);

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
              `https://api.stage-bibubex.com/v1/users/me`,
              {
                headers: {
                  Authorization: `Bearer ${response.data.data.accessToken}`,
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
