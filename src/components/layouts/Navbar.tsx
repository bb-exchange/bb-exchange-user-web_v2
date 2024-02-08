import { useRouter } from "next/router";
import styles from "./styles/Navbar.module.scss";
import Link from "next/link";
import OutlinedBtn from "../Buttons/OutlinedBtn";
import HomeLink from "../../../public/assets/logos/LogoBlue.svg";

const Navbar = () => {
  const { pathname } = useRouter();

  return (
    <nav id={styles.Navbar}>
      <div className={styles.mainNavbar}>
        <section>
          <Link className={styles.homeLink} href={"/"}>
            <HomeLink />
          </Link>
        </section>
        <OutlinedBtn
          text={"문의하기"}
          onClick={() => window.open("https://pf.kakao.com/_xbTmcxj")}
        />
      </div>
      {!pathname?.includes("/auth") && <div className={styles.subNavbar}></div>}
    </nav>
  );
};

export default Navbar;
