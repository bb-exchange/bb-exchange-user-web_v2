import styles from "./buyPostPopup.module.scss";

import { QueryObserverResult } from "@tanstack/react-query";

import CautionRed from "@assets/icons/CautionRed.svg";
import CheckCircle from "@assets/icons/CheckCircle.svg";
import CheckCircleBlueO from "@assets/icons/CheckCircleBlueO.svg";
import X from "@assets/icons/X.svg";

import { PostData } from "@api/interface";

import UseBuyPostPopup from "@hooks/post/useBuyPostPopup";
import UsePost from "@hooks/post/usePost";

interface Iprops {
  usePost: ReturnType<typeof UsePost>;
  refetchArticle: () => Promise<QueryObserverResult<PostData, Error>>;
  title: string;
  price: number;
}

export default function BuyPostPopup({ usePost, title, price, refetchArticle }: Iprops) {
  const useBuyPostPopup = UseBuyPostPopup({ usePost, originalPrice: price, refetchArticle });

  return (
    <section className={styles.buyPostPopup}>
      <article className={styles.topBar}>
        <h1 className="h2 bold color-primary-bg1">{title}</h1>

        <button className={styles.exitBtn} onClick={() => usePost.setBuyPopup(false)}>
          <X />
        </button>
      </article>

      <article
        className={`${styles.priceArea} ${price <= useBuyPostPopup.point ? "" : styles.notEnough}`}
      >
        <ul className={styles.priceList}>
          <li className={styles.account}>
            <p className={styles.key}>보유 포인트</p>
            <p className={styles.value}>{Intl.NumberFormat().format(useBuyPostPopup.point)} P</p>
          </li>

          <li className={styles.price}>
            <p className={styles.key}>구매 가격</p>
            <p className={styles.value}>{Intl.NumberFormat().format(price)} P</p>
          </li>
        </ul>
      </article>

      <article className={styles.actionArea}>
        {price <= useBuyPostPopup.point ? (
          <>
            <div className={styles.agreeBar}>
              <button className={styles.agreeTermBtn} onClick={useBuyPostPopup.onClickAgreeTermBtn}>
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
          </>
        ) : (
          <>
            <div className={styles.notEnoughBar}>
              <CautionRed />

              <p>포인트가 부족하여 구매할 수 없습니다!</p>
            </div>

            <button className={styles.confirmBtn} onClick={useBuyPostPopup.onClickPushMarketBtn}>
              상점으로 이동
            </button>
          </>
        )}
      </article>
    </section>
  );
}
