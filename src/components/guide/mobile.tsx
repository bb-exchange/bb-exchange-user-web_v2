import Link from "next/link";
import classNames from "classnames";

import styles from "./mobile.module.scss";
import Image from "../Image";
import ConfirmTitlePopup from ".src/components/common/popup/confirmTitlePopup";
import MobileHeader from "../common/header/mobileHeader";
import { useState } from "react";
import PopupBg from "../common/popupBg";
import { useRouter } from "next/router";

const MobilePage = ({
  isClient,
  isAndroid,
}: {
  isClient: boolean;
  isAndroid: boolean;
}) => {
  const { push } = useRouter();

  const getImgPath = (name: string) => `/assets/images/${name}_mobile.png`;

  const [preparePopup, setPreparePopup] = useState<boolean>(false);

  const onClickMoveToNewPost = () => {
    if (!isClient) {
      onClickMoveToApp();
      return;
    }
    //@ts-ignore
    if (typeof BbxClient !== undefined && isClient) {
      //@ts-ignore
      BbxClient.postMessage(JSON.stringify({ destination: "post" }));
    }
  };

  const onClickMoveToEvent = () => {
    //@ts-ignore
    if (typeof BbxClient !== undefined && isClient) {
      //@ts-ignore
      BbxClient.postMessage(JSON.stringify({ destination: "event" }));
    } else push("/event");
  };

  const onClickMoveToApp = () => {
    if (isAndroid) {
      setPreparePopup(true);
    } else window.location.assign(`${process.env.NEXT_PUBLIC_APPLE_APP_STORE}`);
  };

  return (
    <main className={classNames(styles.container, !isClient && styles.web)}>
      {!isClient && <MobileHeader />}
      <section className={styles.wrapper}>
        <article className={styles.introArea}>
          <div className={styles.desc}>
            <span className={styles.title}>작성가이드</span>
            <div>
              <h2>당신도 부수익, 쉽게 만들 수 있어요! </h2>
              <h1>어떤 글을 써야 잘 팔릴까요?</h1>
            </div>
          </div>
          <div
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "flex-end",
            }}
          >
            <Image
              src="/assets/images/money_bag.png"
              width={156}
              height={158}
              alt="money"
              priority
            />
          </div>
        </article>

        <div className={styles.contentArea}>
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

              <Image
                src={getImgPath("categories")}
                height={0}
                width={0}
                sizes="(width: 375px)"
                alt="categories"
                priority
                style={{ width: "auto", height: "auto" }}
              />
            </div>
          </article>

          <article className={styles.content}>
            <h2 className={styles.titleArea}>
              <span className={styles.title}>02</span>
              <span className={styles.title}>제목 작성하기</span>
            </h2>

            <div className={classNames(styles.content, styles.sub)}>
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

                <Image
                  src={getImgPath("titles_1")}
                  height={0}
                  width={0}
                  sizes="(width: 375px)"
                  alt="titles_1"
                  priority
                  style={{ width: "auto", height: "auto" }}
                />
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

                <Image
                  src={getImgPath("titles_2")}
                  height={0}
                  width={0}
                  sizes="(width: 375px)"
                  alt="titles_2"
                  priority
                  style={{ width: "auto", height: "auto" }}
                />
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

              <Image
                src={getImgPath("intro")}
                height={0}
                width={0}
                sizes="(width: 375px)"
                alt="intro"
                priority
                style={{ width: "auto", height: "auto" }}
              />
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

              <div className={styles.imageWrapper}>
                <Image
                  src={getImgPath("draft_1")}
                  height={0}
                  width={0}
                  sizes="(width: 375px)"
                  alt="draft_1"
                  priority
                  style={{ width: "auto", height: "auto" }}
                />

                <Image
                  src={getImgPath("draft_2")}
                  height={0}
                  width={0}
                  sizes="(width: 375px)"
                  alt="draft_2"
                  priority
                  style={{ width: "auto", height: "auto" }}
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

              <Image
                src={getImgPath("profit")}
                height={0}
                width={0}
                sizes="(width: 375px)"
                alt="profit"
                priority
                style={{ width: "auto", height: "auto" }}
              />
            </div>
          </article>
        </div>

        <article className={styles.outroArea}>
          <div className={styles.desc}>
            <p>이번 글은 플랫폼 개발 전,</p>
            <p>사전 리서치에서 발견된</p>
            <p>인사이트와 팁이었습니다! 🙃</p>
            <p>(여러분만의 비법을 자유롭게 작성해주세요오오오)</p>
          </div>

          <button onClick={onClickMoveToNewPost}>비법 작성하러 가기</button>
        </article>

        {!isClient && (
          <Link href="/event">
            <Image
              src={getImgPath("event_banner")}
              height={0}
              width={0}
              sizes="(width: 100%)"
              alt="event_banner"
              priority
              style={{ width: "100%", height: "auto" }}
            />
          </Link>
        )}
        {isClient && (
          <button onClick={onClickMoveToEvent}>
            <Image
              src={getImgPath("event_banner")}
              height={0}
              width={0}
              sizes="(width: 100%)"
              alt="event_banner"
              priority
              style={{ width: "100%", height: "auto" }}
            />
          </button>
        )}
        {!isClient && (
          <footer className={styles.footer}>
            <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
              <Image
                src="/assets/logos/bbx_logo.png"
                height={24}
                width={24}
                alt="bbx_logo"
                priority
              />
              <span style={{ fontWeight: 500, color: "#555" }}>
                <span style={{ fontWeight: 700 }}>비법거래소</span>를 앱으로
                편리하게 이용하세요!
              </span>
            </div>
            <button onClick={onClickMoveToApp}>앱으로 이용하기</button>
          </footer>
        )}
        {preparePopup && (
          <>
            <ConfirmTitlePopup
              title="안드로이드 앱 심사중!"
              content={`안드로이드 앱은 아직 심사중입니다.
PC를 통해 비법거래소를 만나보세요!`}
              confirmText="확인"
              confirmFunc={() => setPreparePopup(false)}
              zIndex={80}
            />
            <PopupBg bg zIndex={70} off={() => setPreparePopup(false)} />
          </>
        )}
      </section>
    </main>
  );
};

export default MobilePage;
