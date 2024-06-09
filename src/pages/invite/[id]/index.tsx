import styles from "./linkScreen.module.scss";

import { useCallback, useEffect, useMemo, useState } from "react";

import { NextPageContext } from "next";
import Image from "next/image";
import { useRouter } from "next/router";

import LogoIcon from ".assets/logos/LogoIcon.png";
import Head from "next/head";

enum MobileType {
  iOS,
  Android,
  Unknown,
}



export default function Link({ isMobile, agent }: { isMobile: boolean; agent: MobileType }) {
  const router = useRouter();
  const [mounted, setMounted] = useState<Boolean>(false);
  const { id: articleId } = router.query as { id: string };
  const date = useMemo(() => new Date(), []);

  useEffect(() => {
    setMounted(true);
  }, []);

  const toApp = useCallback(
    (agent: MobileType) => {
      setTimeout(() => {
        if (+new Date() - +date < 2000) {
          /// handle to appstore or not
          // router.push(`/post/${articleId}`);
        }
      }, 1500);
      if (agent === MobileType.iOS) {
        location.href = `bibeop:invite?code=${articleId}`;
      } else {
        location.href = `bibeop://invite?code=${articleId}`;
      }
    },
    [date, articleId],
  );

  const toWeb = () => {
    if (!isMobile) {
      // router.push(`/post/${articleId}`);
      router.push("/");
    } else {
      router.push("/");
    }
  };

  useEffect(() => {
    console.log(isMobile, agent);
    if (!mounted) return;
    if (agent === MobileType.Unknown) {
      router.push(`/`);
    } else {
      toApp(agent);
    }
  }, [isMobile, agent, router, articleId, mounted, toApp]);

  return (
    <>
      <Head>
        <meta property="og:title" content="비법거래소에 초대됐어요." />
        <meta property="og:url" content={router.asPath} />
        <meta property="og:image" content="/assets/images/og/invite_og.png" />
        <meta property="og:description" content="내 꿀팁으로 수익을 창출하세요!" />
      </Head>
      {mounted && (
        <div className={styles.container}>
          <div className={styles.logoWrapper}>
            <Image src={LogoIcon} alt="bbx-logo" fill />
          </div>
          <caption>페이지 이동중입니다</caption>
          <button onClick={toWeb}>웹으로 보기</button>
        </div>
      )}
    </>
  );
}



Link.getInitialProps = async (ctx: NextPageContext) => {
  const isServer = !!ctx.req;
  const userAgent = (isServer ? ctx.req?.headers["user-agent"] : navigator.userAgent) ?? "";
  const isMobile = /(iPad|iPhone|Android|Mobile)/i.test(userAgent) || false;

  let agent: MobileType = MobileType.Unknown;

  if (!isMobile) {
    agent = MobileType.Unknown;
  } else if (userAgent.match(/Android/i)) {
    agent = MobileType.Android;
  } else if (userAgent.match(/iPhone|iPad|iPod|Webkit/i)) {
    agent = MobileType.iOS;
  }

  return {
    isMobile,
    agent,
  };
};
