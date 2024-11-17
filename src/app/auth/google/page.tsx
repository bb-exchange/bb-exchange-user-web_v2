"use client";

import { useEffect } from "react";
import { useCookies } from "react-cookie";

import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";

import styles from "../authLoading.module.scss";

import { usePostGoogleLogin } from "@/shared/services/auth/hooks/usePostGoogleLogin";
import { usePostServiceLogin } from "@/shared/services/auth/hooks/usePostServiceLogin";
import { usePostSignUp } from "@/shared/services/auth/hooks/usePostSignUp";
import { useMyData, useUserProfile } from "@/shared/services/user/hooks";
import { TokenDataType } from "@/shared/types/signInType";

const GoogleAuth = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [_, setCookie] = useCookies(["accessToken", "refreshToken", "oauthId", "oauthType"]);
  const { mutateAsync: googleLoginRequest } = usePostGoogleLogin();
  const { mutateAsync: serviceLoginRequest } = usePostServiceLogin();
  const { mutateAsync: signUpRequest } = usePostSignUp();

  useEffect(() => {
    const code = searchParams.get("code");
    if (!code) {
      return;
    }

    (async () => {
      // 1. 소셜 로그인 provider에 인증 요청
      const socialResult = await googleLogin(code);
      if (!socialResult) {
        return;
      }

      // 2. idToken 정보와 함께 BE 서버에 요청을 보내 토큰을 받아옴
      const { isNewUser, accessToken, refreshToken } = await serviceLogin(socialResult);
      if (isNewUser) {
        // 2-1. 회원가입
        await signUpProcess(socialResult.idToken);
      } else if (accessToken && refreshToken) {
        // 2-2. 로그인
        //setMyProfileData();
        storeTokenData(accessToken, refreshToken);
        router.push("/");
      }
    })();
  }, [searchParams]);

  const googleLogin = async (
    code: string,
  ): Promise<{ idToken: string; accessToken: string } | null> => {
    const result = await googleLoginRequest({ code });
    const idToken = result.id_token;
    const accessToken = result.access_token;
    if (!idToken || !accessToken) {
      return null;
    }
    return { idToken, accessToken };
  };

  const serviceLogin = async ({
    idToken,
    accessToken,
  }: {
    idToken: string;
    accessToken: string;
  }): Promise<TokenDataType> => {
    const { code, data } = await serviceLoginRequest({ idToken, accessToken, oauthType: "GOOGLE" });
    // TODO: duplicate-social-account 확인 필요
    return {
      isNewUser: code === "USR000", // 등록되지 않은 유저
      accessToken: data?.accessToken,
      refreshToken: data?.refreshToken,
    };
  };

  const signUpProcess = async (idToken: string) => {
    const { data } = await signUpRequest({ idToken, oauthType: "GOOGLE" });
    if (data.status === "OAUTH_VERIFIED") {
      storeOauthData(data.oauthId, data.oauthType);
      router.push("/auth/onboarding");
    }
  };

  const setMyProfileData = async () => {
    const { data } = useMyData();
    const userId = data?.data.id;
    if (userId) {
      const { data: profileData } = useUserProfile(userId);
      // TODO: profile storage 구현 필요
      if (profileData) {
        console.log(profileData);
        // setProfile({
        //   userId: profileData.data.userId,
        //   profileImage: profileData.data.profileImage,
        //   nickname: profileData.data.nickname,
        //   description: profileData.data.description,
        // });
      }
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
    <div className={styles.authLoadingLayout}>
      <Image
        src={"/assets/images/three_dots_loading.gif"}
        alt={"loading dots"}
        width={150}
        height={150}
      />
    </div>
  );
};

export default GoogleAuth;
