import styles from "./mobileHeader.module.scss";

import Link from "next/link";
import { useRouter } from "next/router";

import Image from ".src/components/Image";
import classNames from "classnames";

const MobileHeader = () => {
  const { push, pathname } = useRouter();

  const tabList = [
    {
      name: "서비스 소개",
      path: "/serviceIntroduction",
    },
    {
      name: "이벤트",
      path: "/event",
    },
    {
      name: "작성가이드",
      path: "/guide",
    },
  ];

  return (
    <div className={styles.headerContainer}>
      <div className={styles.logoArea} onClick={() => push("/")}>
        <Image
          src="/assets/logos/LogoBlue.svg"
          width={0}
          height={0}
          sizes="(width: 104px)"
          alt="money"
          priority
          style={{ width: "104px", height: "auto" }}
        />
        <span className={styles.beta}>Beta</span>
      </div>
      <div className={styles.tabContainer}>
        {tabList.map(({ name, path }) => (
          <Link key={path} href={path}>
            <div className={styles.tabItem}>
              <span aria-selected={pathname.includes(path)}>{name}</span>
              <div className={classNames(styles.divider)} aria-selected={pathname.includes(path)} />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default MobileHeader;
