import Image from "next/image";
import Link from "next/link";
import { useRecoilValue } from "recoil";

import section1 from "../../../public/assets/images/serviceIntroduction/section1.png";
import section2 from "../../../public/assets/images/serviceIntroduction/section2-1.png";
import section3 from "../../../public/assets/images/serviceIntroduction/section3-1.png";
import section32 from "../../../public/assets/images/serviceIntroduction/section3-2.png";
import section4 from "../../../public/assets/images/serviceIntroduction/section4-1.png";
import section42 from "../../../public/assets/images/serviceIntroduction/section4-2.png";
import section43 from "../../../public/assets/images/serviceIntroduction/section4-3.png";
import section44 from "../../../public/assets/images/serviceIntroduction/section4-4.png";
import section45 from "../../../public/assets/images/serviceIntroduction/section4-5.png";
import section5 from "../../../public/assets/images/serviceIntroduction/section5.png";
import banner from "../../../public/assets/images/serviceIntroduction/banner.png";

import CommonHeader from ".src/components/common/header/commonHeader";
import styles from "./mobile.module.scss";
import { isLoginState } from ".src/recoil";

const DesktopPage = () => {
  const isSignedIn = useRecoilValue(isLoginState);

  return (
    <>
      <CommonHeader />
      <main className={styles.service}>
        <section className={styles.section1}>
          <div>
            <h3>
              <span>내 글을 주식처럼 거래하는 곳</span>
              <strong>비법거래소</strong>
            </h3>
            <Link href={isSignedIn ? "/enroll" : "/auth/signin"}>
              <button className={`${styles.btn} ${styles.section1Btn}`}>
                수익 창출하러 가기
              </button>
            </Link>
          </div>
          <div className={styles.section1ImgBox}>
            <Image src={section1} alt="" width={450} />
          </div>
        </section>

        <section className={styles.section2}>
          <h3>
            <div>
              누구한테도 말하기 아까운
              <br /> 나의 소중한 경험과 지식,
            </div>
            <strong>비법거래소에서 판매하세요!</strong>
          </h3>

          <div className={styles.section2ImgBox}>
            <Image
              className={styles.section2Img1}
              src={section2}
              alt=""
              width={482}
            />
            {/* <Image
              className={styles.section2Img2}
              src={section22}
              alt=""
              width={340}
            />
            <Image
              className={styles.section2Img3}
              src={section23}
              alt=""
              width={340}
            /> */}
          </div>
        </section>

        <section className={styles.section3}>
          <div className={styles.section3Box}>
            <div className={styles.section3Box1}>
              <h3 className={styles.title}>내 글이 돈이 된다고?</h3>
              <p className={styles.subTitle}>
                좋아요 100개만 받으면
                <br />
                수익화가 시작됩니다.
              </p>
              <p className={styles.infoText}>
                내 글이 사람들에게 좋아요 100개를 받으면
                <br />
                글은 100포인트로 상장되어 수익창출이 시작돼요.
              </p>
            </div>
            <Image src={section3} alt="" width={496} />
          </div>
          <div className={styles.section3Box}>
            <div className={styles.section3Box2}>
              <h3 className={styles.title}>공정한 기회</h3>
              <p className={styles.subTitle}>
                좋아요가 더 쌓일수록
                <br />더 두둑해지는 내 지갑!
              </p>
              <p className={styles.infoText}>
                글을 읽은 사용자들에게 더 많은 좋아요를 받을수록
                <br />내 글은 점점 더 높은 가격에 거래돼요.
              </p>
            </div>
            <Image src={section32} alt="" width={422} />
          </div>
        </section>

        <section className={styles.section4}>
          <div className={styles.titleArea}>
            <h3 className={styles.title}>비법거래소 수익창출 방법</h3>
            <p className={styles.subTitle}>
              나의 글이
              <br />
              어떻게 돈을 벌어올까요?
            </p>
          </div>
          <ul>
            <li>
              <Image src={section4} alt="" width={480} />
              <div className={styles.section4ListBox}>
                <div className={styles.section4ListNum}>01</div>
                <p className={styles.section4ListText}>
                  내 상장글의 첫 구매자는
                  <br />
                  100P를 내고 글을 읽을 수 있어요.
                </p>
              </div>
            </li>
            <li>
              <Image src={section42} alt="" width={480} />
              <div className={styles.section4ListBox}>
                <div className={styles.section4ListNum}>02</div>
                <p className={styles.section4ListText}>
                  첫 구매자가 좋아요를 누르면
                  <br />
                  글 가격은 101P로 상승해요!
                  <br />
                  반대로 싫어요를 받으면 글 가격은 하락해요.
                </p>
              </div>
            </li>
            <li>
              <Image src={section43} alt="" width={480} />
              <div className={styles.section4ListBox}>
                <div className={styles.section4ListNum}>03</div>
                <p className={styles.section4ListText}>
                  두번째 구매자는 <br />
                  1P 상승된 101P에 글을 읽을 수 있어요.
                </p>
              </div>
            </li>
            <li>
              <Image src={section44} alt="" width={480} />
              <div className={styles.section4ListBox}>
                <div className={styles.section4ListNum}>04</div>
                <p className={styles.section4ListText}>
                  이 과정이 반복되며 글의 가격은 상승과
                  <br />
                  하락을 반복하며 계속 판매돼요.
                </p>
              </div>
            </li>
            <li>
              <Image src={section45} alt="" width={480} />
              <div className={styles.section4ListBox}>
                <div className={styles.section4ListNum}>05</div>
                <p className={styles.section4ListText}>
                  판매 대금은 마이페이지에서
                  <br />
                  수수료를 제외하고 출금할 수 있어요.
                </p>
              </div>
            </li>
          </ul>
        </section>

        <section className={styles.section5}>
          <div className={styles.section5LeftBox}>
            <h3 className={styles.title}>어떻게 글을 써야할지 모르겠다구?</h3>
            <p className={styles.subTitle}>작성 가이드라인!</p>
            <p className={styles.section5Text}>
              여러분의 꿀팁, 경험, 지식, 이야기 모두
              <br />
              누군가에게는 꼭 필요한 비법입니다.
            </p>
            <button className={`${styles.btnLine} ${styles.section5Btn}`}>
              비법거래소 작성 가이드 {">"}
            </button>
          </div>
          <Image src={section5} alt="" width={368} />
        </section>

        <section className={styles.section6}>
          <h4 className={styles.subTitle}>
            당신의 꿀팁,
            <br />
            지금 바로 자산으로 바꿔보세요!
          </h4>
          <Link href={isSignedIn ? "/enroll" : "/auth/signin"}>
            <button className={`${styles.btn} ${styles.section6Btn}`}>
              수익 창출하러 가기
            </button>
          </Link>
          <Image src={banner} alt="" width={1200} />
        </section>
      </main>
    </>
  );
};

export default DesktopPage;
