"use client";

import Image from "next/image";

import styles from "./login.module.scss";

import Header from "@/shared/components/layouts/header";

export default function Login() {
  const kakaoLoginHandler = () => {};
  const googleLoginHandler = () => {};
  const appleLoginHandler = () => {};

  return (
    <LoginLayout>
      <div className={styles.loginPage}>
        <div className={styles.contentBox}>
          <h2>
            간편하게 로그인하고
            <br />
            다양한 비법들을 만나보세요!
          </h2>
          <p>적은 비용으로 어디에도 없던 숨은 비법을 즐기세요!</p>
          <div className={styles.imgWrap}>
            <Image
              src="/assets/images/splash_badge.png"
              alt="스플래시 이미지"
              width={119}
              height={171}
              className={styles.badge}
              quality={100}
              priority
            />
          </div>
          <button className={styles.kakaoBtn} onClick={kakaoLoginHandler} />
          <span className={styles.orText}>또는</span>
          <section className={styles.btnGroup}>
            <button className={styles.googleBtn} onClick={googleLoginHandler} />
            <button className={styles.appleBtn} onClick={appleLoginHandler} />
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
