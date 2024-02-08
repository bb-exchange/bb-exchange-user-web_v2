import Link from "next/link";
import { useRouter } from "next/router";
import { useQuery } from "@tanstack/react-query";
import { useRecoilValue } from "recoil";

import styles from "./desktop.module.scss";
import { isLoginState } from ".src/recoil";
import { getEthicalPledge } from ".src/api/users/users";

import Navbar from "../layouts/Navbar";
import CommonFooter from "../common/commonFooter";
import CommonHeader from "../common/header/commonHeader";
import Image from "../Image";

const DesktopPage = () => {
  const { push } = useRouter();

  const isSignedIn = useRecoilValue(isLoginState);
  const { data: ethicalPledgeData } = useQuery({
    queryKey: ["user", "get|ethical-pledge"],
    queryFn: getEthicalPledge,
    enabled: isSignedIn,
  });

  const getImgPath = (name: string) => `/assets/images/${name}_desk.png`;

  const onClickNewPost = () =>
    !isSignedIn
      ? push("/auth/signin")
      : ethicalPledgeData?.data.agreeToEthicalPledge
      ? push("/enroll")
      : push("/enroll/term");

  return (
    <>
      <Navbar />
      <CommonHeader />
      <main className={styles.container}>
        <section className={styles.wrapper}>
          <article className={styles.introArea}>
            <div className={styles.desc}>
              <span className={styles.title}>작성가이드</span>
              <div>
                <h2>당신도 부수익, 쉽게 만들 수 있어요! </h2>
                <h1>어떤 글을 써야 잘 팔릴까요?</h1>
              </div>
            </div>
            <Image
              src="/assets/images/money_bag.png"
              width={310}
              height={314}
              alt="money"
              priority
            />
          </article>

          <article className={styles.content}>
            <h2 className={styles.titleArea}>
              <span className={styles.title}>01</span>
              <span className={styles.title}>주제 & 카테고리 선택</span>
            </h2>

            <div className={styles.descArea}>
              <div className={styles.desc}>
                <p>
                  비법거래소에는 총 13개의 카테고리가 있어요. 카테고리를 보고
                  주제를 떠올려보는 것도 좋아요.
                </p>
                <p>
                  카테고리는 트렌드나 글의 수요에 따라 유동적으로 운영될 수
                  있어요!
                </p>
              </div>

              <div className={styles.imageWrapper}>
                <Image
                  src={getImgPath("categories")}
                  height={0}
                  width={0}
                  sizes="(width: 1200px)"
                  alt="categories"
                  priority
                  style={{ width: "1200px", height: "auto" }}
                />
              </div>
            </div>
          </article>

          <article className={styles.content}>
            <h2 className={styles.titleArea}>
              <span className={styles.title}>02</span>
              <span className={styles.title}>제목 작성하기</span>
            </h2>

            <div className={styles.content}>
              <div className={styles.descArea}>
                <div className={styles.desc}>
                  <p>
                    매력적인 제목은 곧 글이 팔리는 가격 형성에 영향을 미쳐요.
                  </p>
                  <p>
                    최대 40자 이내로 글의 내용을 잘 이해할 수 있는 키워드를
                    포함해 제목을 작성해보세요.
                  </p>
                </div>

                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    padding: "40px 0",
                    gap: "32px",
                  }}
                >
                  <Image
                    src={getImgPath("titles_1")}
                    height={248}
                    width={780}
                    alt="titles_1"
                  />
                  <p
                    style={{
                      width: "780px",
                      color: "#696969",
                      fontSize: "18px",
                      fontWeight: 600,
                    }}
                  >
                    연봉협상, 겨울 등 시즌 내용이 들어가거나 사람들이 관심있어할
                    키워드를 포함해 보는 것도 좋아요.
                  </p>
                </div>
              </div>

              <div className={styles.descArea}>
                <div className={styles.desc}>
                  <p>
                    비법거래소 팀에서 사업 계획을 하며 사전 리서치를 했던 자료
                    중, 상위 랭크된 글들의 제목을 공유드릴게요!
                  </p>
                  <p>
                    (이 글들이 꼭 정답은 아니니, 참고하여 나만의 경험이 담긴
                    글을 구성해보세요.)
                  </p>
                </div>
                <div
                  className={styles.imageWrapper}
                  style={{ padding: "26px 0" }}
                >
                  <Image
                    src={getImgPath("titles_2")}
                    height={282}
                    width={1065}
                    alt="titles_2"
                  />
                </div>
              </div>
            </div>
          </article>

          <article className={styles.content}>
            <h2 className={styles.titleArea}>
              <span className={styles.title}>03</span>
              <span className={styles.title}>서문 작성하기</span>
            </h2>

            <div className={styles.descArea}>
              <div className={styles.desc}>
                <p>제목과 서문은 글 구매 욕구를 자극하는 중요한 역할을 해요.</p>
              </div>

              <div
                className={styles.imageWrapper}
                style={{ paddingTop: "45px" }}
              >
                <Image
                  src={getImgPath("intro")}
                  height={397}
                  width={950}
                  alt="intro"
                />
              </div>
            </div>
          </article>

          <article className={styles.content}>
            <h2 className={styles.titleArea}>
              <span className={styles.title}>04</span>
              <span className={styles.title}>초안 & 버전 저장하기</span>
            </h2>

            <div className={styles.descArea}>
              <div className={styles.desc}>
                <p>
                  초안이라도 좋아요. 미리 저장해두고 조금씩 보완해서 올리면
                  돼요.
                </p>
                <p>
                  누구나 처음부터 좋은 글을 쓰기 어려워 하니, 고민보다 일단
                  시작부터!
                </p>
              </div>

              <div
                className={styles.imageWrapper}
                style={{ paddingTop: "45px" }}
              >
                <Image
                  src={getImgPath("draft")}
                  height={370}
                  width={1014}
                  alt="draft"
                />
              </div>
            </div>
          </article>

          <article className={styles.content}>
            <h2 className={styles.titleArea}>
              <span className={styles.title}>Q.</span>
              <span className={styles.title}>
                비법글을 쓰면 어떻게 부수익이 창출되나요?
              </span>
            </h2>

            <div className={styles.descArea}>
              <div className={styles.desc}>
                <p>
                  내 글이 좋아요 100개를 받으면, 상장이 됨과 동시에 부수익을
                  얻을 수 있어요.
                </p>
                <p>좋은 글을 써서 좋은 평가를 받을수록 수익은 배가 돼요.</p>
              </div>

              <div className={styles.imageWrapper}>
                <Image
                  src={getImgPath("profit")}
                  height={415}
                  width={1200}
                  alt="profit"
                />
              </div>
            </div>
          </article>

          <article className={styles.outroArea}>
            <div className={styles.desc}>
              <p>
                이번 글은 플랫폼 개발 전, 사전 리서치에서 발견된 인사이트와
                팁이었습니다! 🙃
              </p>
              <p>(여러분만의 비법을 자유롭게 작성해주세요오오오)</p>
            </div>

            <button onClick={onClickNewPost}>비법 작성하러 가기</button>
          </article>

          <div className={styles.imageWrapper}>
            <Link href="/event">
              <Image
                src={getImgPath("event_banner")}
                height={274}
                width={1200}
                alt="event_banner"
              />
            </Link>
          </div>
        </section>
      </main>
      <CommonFooter />
    </>
  );
};

export default DesktopPage;
