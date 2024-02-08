import styles from "./commonFooter.module.scss";
import Apple from ".assets/icons/Apple.svg";
import Google from ".assets/icons/Google.svg";
import router from "next/router";

export default function CommonFooter() {
  return (
    <footer className={styles.commonFooter}>
      <section className={styles.innerSec}>
        <article className={styles.leftArea}>
          <ul className={styles.infoList}>
            <li>
              <strong className={styles.company}>비법거래소</strong>
              <hr />
              <p className={styles.companyNum}>
                <strong>사업자번호</strong> 495-59-00604
              </p>
              <hr />
              <p className={styles.manager}>
                <strong>대표</strong> 민윤기
              </p>
            </li>
            <li>
              {/* <p>
                <strong>통신판매업신고</strong> 2023-서울서초-1234
              </p> */}
              <p>
                <strong>대표번호</strong> 1688-8078
              </p>
            </li>
            <li>
              <p>
                <strong>주소</strong> 경기도 용인시 수지구 현암로 148,
                602호(비법거래소)
              </p>
            </li>
          </ul>

          <div className={styles.rightArea}>
            <strong className={styles.label}>비법거래소 APP Download</strong>
            <div className={styles.btnBox}>
              <button>
                <Apple />
                <strong>APP Store</strong>
              </button>

              <button className={styles.google}>
                <Google />

                <strong>Google Play</strong>
              </button>
            </div>
          </div>
        </article>

        <article className={styles.bottomArea}>
          <p className={styles.infoText}>
            비법거래소는 통신판매중개시스템의 제공자로서 통신판매의 당사자가
            아닙니다. 콘텐츠 생산, 환불 등과 관련한 의무와 책임은 판매자에게
            있습니다.
          </p>
          <ul className={styles.categoryList}>
            <li
              onClick={() =>
                router.push({
                  pathname: "/terms/service",
                })
              }
            >
              <p>이용약관</p>
            </li>

            <li
              onClick={() =>
                router.push({
                  pathname: "/terms/privacy",
                })
              }
            >
              <strong>개인정보처리방침</strong>
            </li>

            <li>
              <p>비법거래소 고객센터</p>
            </li>

            <li>
              <p>카카오톡 1:1 문의</p>
            </li>

            <li>
              <p>제휴제안</p>
            </li>
          </ul>
        </article>
      </section>
    </footer>
  );
}
