"use client";

import { useEffect } from "react";

import Image from "next/image";

import styles from "./signin.module.scss";

import Header from "@/shared/components/layouts/header";
import { Text } from "@/shared/components/ui/text";

export default function Login() {
  useEffect(() => {
    // 로그인 화면 진입 시 쿠키에 저장된 토큰 전부 삭제 및 로그아웃 처리
  }, []);

  const kakaoLoginHandler = () => {
    // window.location.assign(KAKAO_AUTH_URL);
  };
  const googleLoginHandler = () => {
    // window.location.assign(GOOGLE_AUTH_URL);
  };
  const appleLoginHandler = () => {
    // window.location.assign(APPLE_AUTH_URL);
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
