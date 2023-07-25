import { basicInstance } from ".src/api/instance";
import { signIn } from ".src/features/userSlice";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useCookies } from "react-cookie";
import { useDispatch } from "react-redux";
import Image from "next/image";
import LocalStorage from ".src/util/localStorage";
import styles from "../loadingLayout.module.scss";
//(비회원인 경우)
//카카오 인증 성공 -> 서비스 이용동의 -> 바로 닉네임 설정 페이지로 이동 (휴대폰 인증 단계 X) (중도 이탈 시 맨 처음부터 시작)
//구글, 애플 인증 성공 -> -> 서비스 이용동의-> 휴대폰 인증 페이지로 이동 -> 닉네임 설정 페이지로 이동 (중도 이탈 시 맨 처음부터 시작)

//(회원인 경우)
//인증 성공 -> 메인 페이지로 랜딩

const GoogleAuth = () => {
  const { query, push } = useRouter();
  const dispatch = useDispatch();
  const [cookie, setCookie] = useCookies([
    "oauthId",
    "oauthType",
    "accessToken",
    "refreshToken",
  ]);

  useEffect(() => {
    if (query?.code) {
      (async () => {
        const { data: googleTokenData } = await axios.post(
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
        if (googleTokenData) {
          const { data: authLoginData } = await basicInstance.post(
            "/v1/auth/oidc/login",
            {
              idToken: googleTokenData.id_token,
              oauthType: "GOOGLE",
            }
          );
          if (authLoginData.message === "user not registered") {
            //verify user account
            const { data: registerVerifyData } = await basicInstance.post(
              "/v1/auth/register/verify ",
              {
                oauthType: "GOOGLE",
                idToken: googleTokenData.id_token,
                kakaoAccessToken: null,
              }
            );
            console.log(registerVerifyData.data);

            if (registerVerifyData.data.status === "OAUTH_VERIFIED") {
              setCookie("oauthId", registerVerifyData.data.oauthId, {
                path: "/",
              });
              setCookie("oauthType", registerVerifyData.data.oauthType, {
                path: "/",
              });
              push({
                pathname: "/auth/terms-agreement",
              });
            }
            //중복계정 존재
            else if (registerVerifyData.data.oauthTypes) {
              LocalStorage.setItem(
                "oauthType",
                registerVerifyData.data.oauthTypes[0]
              );
              push("/auth/duplicate-social-account");
            }
          } else if (
            authLoginData.data.data.accessToken &&
            authLoginData.data.data.refreshToken
          ) {
            //정상 로그인 처리
            setCookie("accessToken", authLoginData.data.data.accessToken, {
              path: "/",
            });
            setCookie("refreshToken", authLoginData.data.data.refreshToken, {
              path: "/",
            });
            //닉네임 가져오기
            const { data } = await axios.get(
              `https://api.stage-bibubex.com/v1/users/me`,
              {
                headers: {
                  Authorization: `Bearer ${authLoginData.data.data.accessToken}`,
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

export default GoogleAuth;
