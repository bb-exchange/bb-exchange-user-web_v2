"use client";

import { useEffect } from "react";

import Image from "next/image";

import styles from "./signin.module.scss";

import Header from "@/shared/components/layouts/header";
import { Text } from "@/shared/components/ui/text";

export default function Login() {
  useEffect(() => {
    // 로그인 화면 진입 시 쿠키에 저장된 토큰 전부 삭제 및 로그아웃 처리?
  }, []);

  const kakaoLoginHandler = () => {
    const kakaoAuthUrl = "https://kauth.kakao.com/oauth/authorize";
    const queryString = getQueryString({
      client_id: `${process.env.NEXT_PUBLIC_KAKAO_JS_KEY}`,
      redirect_uri: `${process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URI}`,
      response_type: "code",
      scope: "openid",
    });
    window.location.assign(`${kakaoAuthUrl}${queryString}`);
  };
  const googleLoginHandler = () => {
    const googleAuthUrl = "https://accounts.google.com/o/oauth2/v2/auth";
    const queryString = getQueryString({
      client_id: `${process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}`,
      redirect_uri: `${process.env.NEXT_PUBLIC_GOOGLE_REDIRECT_URI}`,
      response_type: "code",
      scope: "https://www.googleapis.com/auth/userinfo.email&access_type=offline",
    });
    window.location.assign(`${googleAuthUrl}${queryString}`);
  };
  const appleLoginHandler = () => {
    const appleAuthUrl = "https://appleid.apple.com/auth/authorize";
    const queryString = getQueryString({
      client_id: `${process.env.NEXT_PUBLIC_APPLE_CLIENT_ID}`,
      redirect_uri: `${process.env.NEXT_PUBLIC_APPLE_REDIRECT_URI}`,
      response_type: "code",
    });
    window.location.assign(`${appleAuthUrl}${queryString}`);
  };

  const getQueryString = (queryParams: { [key: string]: any }) => {
    let queryString = "?";
    Object.keys(queryParams).forEach((key) => {
      queryString += `${key}=${queryParams[key]}&`;
    });
    return queryString.slice(0, -1);
  };

  return (
    <LoginLayout>
      <div className={styles.loginPage}>
        <div className={styles.contentBox}>
          <Text variant="display2" weight="bold" as="h2">
            간편하게 로그인하고
            <br />
            다양한 비법들을 만나보세요!
          </Text>
          <Text variant="title2" weight="regular" className={styles.titleText}>
            적은 비용으로 어디에도 없던 숨은 비법을 즐기세요!
          </Text>
          <div className={styles.imgWrap}>
            <Image
              src="/assets/images/splash_badge.png"
              alt="스플래시 이미지"
              width={110}
              height={162}
              className={styles.badge}
              quality={100}
              priority
            />
          </div>
          <Image
            src="/assets/images/kakao_login.svg"
            alt="카카오 로그인"
            width={384}
            height={60}
            quality={100}
            className={styles.loginButton}
            onClick={kakaoLoginHandler}
          />
          <Text variant="body2_normal" weight="regular" className={styles.orText}>
            또는
          </Text>
          <section className={styles.btnGroup}>
            <Image
              src="/assets/images/google_logo.svg"
              alt="구글 로그인"
              width={56}
              height={56}
              quality={100}
              className={styles.loginButton}
              onClick={googleLoginHandler}
            />
            <Image
              src="/assets/images/apple_logo.svg"
              alt="애플 로그인"
              width={56}
              height={56}
              quality={100}
              className={styles.loginButton}
              onClick={appleLoginHandler}
            />
          </section>
        </div>
      </div>
    </LoginLayout>
  );
}

function LoginLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      {children}
    </>
  );
}
