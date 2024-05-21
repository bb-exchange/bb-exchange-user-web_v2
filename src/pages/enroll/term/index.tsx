import styles from "./termScreen.module.scss";

import { useRouter } from "next/router";

import { postEthicalPledge } from ".src/api/users/users";
import CommonFooter from ".src/components/common/commonFooter";
import CommonHeader from ".src/components/common/header/commonHeader";
import { D_termList } from ".src/data/enroll/D_term";
import { userNameState } from ".src/recoil";
import { useMutation } from "@tanstack/react-query";
import { useRecoilValue } from "recoil";

export default function TermScreen() {
  const router = useRouter();
  const userName = useRecoilValue(userNameState);

  const postEthicalPledgeMutation = useMutation({
    mutationFn: postEthicalPledge,
    onSuccess: () => {
      router.push("/enroll");
    },
  });

  const onClickAgreeBtn = () => {
    postEthicalPledgeMutation.mutateAsync();
  };

  return (
    <>
      <CommonHeader />

      <section className={styles.innerSec}>
        <article className={styles.topBar}>
          <h1 className={styles.pageTitle}>윤리서약</h1>
        </article>

        <article className={styles.contArea}>
          <div className={styles.termCont}>
            <div className={styles.explainBox}>
              <p className={styles.key}>{userName}님, 안녕하세요!</p>
              <p className={styles.value}>
                비법 작성 전, 꼭 알아두셔야 하는 사항들을 미리 알려드립니다. 아래 사항을 꼭
                숙지하여, 즐겁고 안전한 비법 거래를 시작해보세요.
                <br />
                아래 사항에 동의하신다면 하단 &apos;동의합니다&apos; 버튼을 눌러주세요.
              </p>
            </div>

            <ul className={styles.termList}>
              {D_termList.map((v, i) => (
                <li key={i}>
                  <div className={styles.titleBox}>
                    <>{v.icon}</>

                    <h2 className={styles.title}>{v.title}</h2>
                  </div>

                  <ul className={styles.detailList}>
                    {v.detail.map((detV, detI) => (
                      <li key={detI}>{detV}</li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
          </div>

          <button className={styles.agreeBtn} onClick={onClickAgreeBtn}>
            동의합니다
          </button>
        </article>
      </section>

      <CommonFooter />
    </>
  );
}

// export function getStaticProps() {
//   return { props: { navBar: true } };
// }
