import usePost from ".src/hooks/post/usePost";
import styles from "./buyPostPopup.module.scss";
import X from ".assets/icons/X.svg";
import UseBuyPostPopup from ".src/hooks/post/useBuyPostPopup";
import CheckCircle from ".assets/icons/CheckCircle.svg";
import CheckCircleBlueO from ".assets/icons/CheckCircleBlueO.svg";

interface Iprops {
  usePost: ReturnType<typeof usePost>;
}

export default function BuyPostPopup({ usePost }: Iprops) {
  const useBuyPostPopup = UseBuyPostPopup({ usePost });

  return (
    <section className={styles.buyPostPopup}>
      <article className={styles.topBar}>
        <h1 className={styles.popupTitle}>
          취준생 모여라! 답변 못하면 탈락하는 면접 질문 30선 제목 다 나오게
          할까요
        </h1>

        <button
          className={styles.exitBtn}
          onClick={() => usePost.setBuyPopup(false)}
        >
          <X />
        </button>
      </article>

      <article className={styles.priceArea}>
        <ul className={styles.priceList}>
          <li className={styles.account}>
            <p className={styles.key}>보유 포인트</p>
            <p className={styles.value}>
              {Intl.NumberFormat().format(12000)} P
            </p>
          </li>

          <li className={styles.price}>
            <p className={styles.key}>구매 가격</p>
            <p className={styles.value}>{Intl.NumberFormat().format(425)} P</p>
          </li>
        </ul>
      </article>

      <article className={styles.actionArea}>
        <div className={styles.agreeBar}>
          <button
            className={styles.agreeTermBtn}
            onClick={useBuyPostPopup.onClickAgreeTermBtn}
          >
            {useBuyPostPopup.agreeTerm ? <CheckCircleBlueO /> : <CheckCircle />}

            <p>구매조건 확인 및 결제 진행 동의</p>
          </button>
        </div>

        <button
          className={styles.confirmBtn}
          disabled={!useBuyPostPopup.agreeTerm}
          onClick={useBuyPostPopup.onClickConfirmBtn}
        >
          결제하기
        </button>
      </article>
    </section>
  );
}
