import { useRouter } from "next/router";
import styles from "./styles/Navbar.module.scss";
import { useEffect } from "react";
import Link from "next/link";
import OutlinedBtn from "../Buttons/OutlinedBtn";

const Navbar = () => {
  const { pathname } = useRouter();
  console.log(pathname);

  return (
    <nav id={styles.Navbar}>
      <div className={styles.mainNavbar}>
        <section>
          <Link className={styles.homeLink} href={"/"}>
            비법거래소
          </Link>
          <OutlinedBtn text={"문의하기"} />
        </section>
      </div>
      {!pathname?.includes("/auth") && <div className={styles.subNavbar}></div>}
    </nav>
  );
};

export default Navbar;
