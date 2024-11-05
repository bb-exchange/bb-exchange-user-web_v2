import { useEffect } from "react";
import { useCookies } from "react-cookie";

import Image from "next/image";
import { useRouter } from "next/router";

import styles from "../loadingLayout.module.scss";

import { LoginResponse, SignUpResponse, TokenDataType } from "@/shared/types/signInType";

const [_, setCookie] = useCookies(["oauthId", "oauthType", "accessToken", "refreshToken"]);

const GoogleAuth = () => {
  const { query, push } = useRouter();

  useEffect(() => {
    if (query?.code) {
      (async () => {
        // 1. 소셜 로그인 provider에 요청
        const idToken = await socialLogin();
        if (!idToken) {
          return;
        }
        // 2. idToken 정보와 함께 BE 서버에 요청을 보내 토큰을 받아옴
        const { isNewUser, accessToken, refreshToken } = await getAuthToken(idToken);
        if (isNewUser) {
          // 2-1. 회원가입
          await signUpProcess(idToken);
        } else if (accessToken && refreshToken) {
          // 2-2. 로그인
          setMyProfileData();
          storeTokenData(accessToken, refreshToken);
          push("/");
        }
      })();
    }
  }, [query?.code]);

  const socialLogin = async (): Promise<string | null> => {
    const { data } = await axios.post(
      `https://www.googleapis.com/oauth2/v4/token`,
      {
        code: query?.code,
        grant_type: "authorization_code",
        client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
        client_secret: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET,
        redirect_uri: process.env.NEXT_PUBLIC_GOOGLE_REDIRECT_URI,
      },
      { headers: { "content-type": "application/x-www-form-urlencoded" } },
    );
    const idToken = data.id_token;
    if (!idToken) {
      return null;
    }
    return idToken;
  };

  const getAuthToken = async (idToken: string): Promise<TokenDataType> => {
    const { data }: { data: LoginResponse } = await axios.post("/v1/auth/oidc/login", {
      idToken,
      oauthType: "GOOGLE",
    });
    return {
      isNewUser: data.message === "등록되지 않은 유저입니다.",
      accessToken: data.data.accessToken,
      refreshToken: data.data.refreshToken,
    };
  };

  const signUpProcess = async (idToken: string) => {
    const { data }: { data: SignUpResponse } = await axios.post("/v1/auth/register/verify ", {
      oauthType: "GOOGLE",
      idToken,
      kakaoAccessToken: null,
    });

    if (data.status === "OAUTH_VERIFIED") {
      storeOauthData(data.oauthId, data.oauthType);
      push({
        pathname: "/auth/onboarding",
      });
    }
  };

  const setMyProfileData = async () => {
    const { data: userData } = await axios.get(`/v1/users/me`); // TODO: 토큰 필요한 아이,,,
    const userId = userData?.data.id;
    if (userId) {
      const { data: profileData } = await axios.get(`/v1/users/profile/${userId}`);
      // TODO: profile storage 구현 필요
      // setProfile({
      //   userId: profileData.data.userId,
      //   profileImage: profileData.data.profileImage,
      //   nickname: profileData.data.nickname,
      //   description: profileData.data.description,
      // });
    }
  };

  const storeTokenData = (accessToken: string, refreshToken: string) => {
    setCookie("accessToken", accessToken, {
      path: "/",
    });
    setCookie("refreshToken", refreshToken, {
      path: "/",
    });
  };

  const storeOauthData = (oauthId: string, oauthType: string) => {
    setCookie("oauthId", oauthId, {
      path: "/",
    });
    setCookie("oauthType", oauthType, {
      path: "/",
    });
  };

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
