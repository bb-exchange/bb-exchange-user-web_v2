import styles from "./styles/index.module.scss";
import IconArrow from "../../../../public/assets/icons/icon_arrow_right.svg";
import IconCaution from "../../../../public/assets/icons/icon_caution.svg";
const TermsAgreement = () => {
  return (
    <div id={styles.termsAgreement}>
      <div className={styles.contentBox}>
        <p className={styles.title}>서비스 이용동의</p>
        <ul>
          <li className={styles.allAgreement}>약관 전체 동의</li>
          <li className={styles.overAge}>
            (필수) 만 14세 이상입니다.
            <IconCaution className={styles.iconCaution} />
          </li>
          <li>
            (필수) 서비스 이용 약관 <IconArrow />
          </li>
          <li>
            (필수) 개인정보 처리방침 <IconArrow />
          </li>
          <li>
            (필수) 구매조건 확인 및 결제 진행 동의 <IconArrow />
          </li>
          <li>
            (선택) 마케팅 정보 수신 동의 <IconArrow />
          </li>
        </ul>
        <button>다음</button>
      </div>
    </div>
  );
};

export default TermsAgreement;

export function getStaticProps() {
  return { props: { navBar: true } };
}
