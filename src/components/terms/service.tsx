// import { TERMS_OF_SERVICE_V1 } from ".src/data/terms-agreement/D_terms";
import styles from "./service.module.scss";
export default function termsOfService() {
  return (
    <div id={styles.termsOfService}>
      <h2>[제1장 총칙]</h2>

      <ul className={styles.ul}>
        <span>제1조 (목적)</span>
        <li>
          <p>
            이 약관은 비법거래소(이하 “회사”라고 합니다)가 온라인 마켓플레이스
            (http://www.bibubex.com , 이하 “비법거래소 사이트”라고 합니다)와
            스마트폰 등 이동통신기기를 통해 제공되는 모바일 애플리케이션(이하
            “모바일 비법거래소”이라고 합니다)을 통하여 제공하는 중개서비스 및
            기타 정보 서비스(이하 “서비스”라고 합니다)와 관련하여 회사와 회원
            또는 회사와 비회원 간의 권리와 의무, 책임 사항 및 회원의 서비스 이용
            절차에 관한 사항을 규정함을 목적으로 합니다.
          </p>
        </li>
        <li></li>
        <li></li>
      </ul>
    </div>
  );
}
