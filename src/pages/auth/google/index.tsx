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
    "authKey",
    "accessToken",
    "refreshToken",
  ]);

  useEffect(() => {
    if (query?.code) {
      (async () => {
        const res = await axios.post(
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
        if (res) {
          const response = await basicInstance.post("/v1/auth/oidc/login", {
            idToken: res.data.id_token,
            accessToken: res.data.access_token,
          });

          if (response.data.data.data.status === "OAUTH_VERIFIED") {
            setCookie("authKey", response.data.data.data.key, {
              path: "/",
            });
            push("/auth/terms-agreement");
          } else if (response.data.data.data.oauthTypes) {
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

  return (
    <div className={styles.loadingLayout}>
      <Image
        src={"/assets/icons/loading/threeDots.gif"}
        alt={"loading dots"}
        width={150}
        height={200}
      />
    </div>
  );
};

export default GoogleAuth;
