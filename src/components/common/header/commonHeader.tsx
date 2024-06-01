import PostCategoryPopup from "./postCategoryPopup";
import ProfileHoverPopup from "./profileHoverPopup";

import styles from "./commonHeader.module.scss";

import { useEffect, useRef, useState } from "react";

import { useRouter } from "next/router";

import DefaultProfImg from ".assets/example/DefaultProfImg.png";
import Bell from ".assets/icons/Bell.svg";
import ChevronRt from ".assets/icons/ChevronRt.svg";
import Hamburger from ".assets/icons/Hamburger.svg";
import Shop from ".assets/icons/Shop.svg";
import TriangleDn from ".assets/icons/TriangleDn.svg";
import WriteWhite from ".assets/icons/WriteWhite.svg";
import LogoBlue from ".assets/logos/LogoBlue.svg";
import { getEthicalPledge, getProfile } from ".src/api/users/users";
import ConfirmTitlePopup from ".src/components/common/popup/confirmTitlePopup";
import PopupBg from ".src/components/common/popupBg";
import Image from ".src/components/Image";
import { D_commonHeaderCategoryList } from ".src/data/common/header";
import { isLoginState, profileState, userNameState } from ".src/recoil";
import { useQuery } from "@tanstack/react-query";
import { useRecoilValue } from "recoil";

interface Iprops {
  commonSort?: "인기" | "최신" | "상장" | "서비스 소개" | "이벤트";
}

export default function CommonHeader({ commonSort }: Iprops) {
  const router = useRouter();

  const nickname = useRecoilValue(userNameState);
  const isSignedIn = useRecoilValue(isLoginState);
  const profile = useRecoilValue(profileState);

  const [preparePopup, setPreparePopup] = useState<boolean>(false);

  const isClickedEnroll = useRef<boolean>(false);

  const onClickTab = (url: string) => router.push(`/${url}`);

  const { refetch, data: ethicalPledgeData } = useQuery({
    queryKey: ["user", "get|ethical-pledge"],
    queryFn: getEthicalPledge,
    enabled: false,
  });

  const onClickEnroll = () => {
    isClickedEnroll.current = true;
    refetch();
  };

  useEffect(() => {
    if (isClickedEnroll.current) {
      ethicalPledgeData?.data.agreeToEthicalPledge
        ? router.push("/enroll")
        : router.push("/enroll/term");

      isClickedEnroll.current = false;
    }
  }, [ethicalPledgeData, router]);

  const { data: profileData } = useQuery({
    queryKey: ["myProfile"],
    queryFn: () => getProfile(profile.userId),
    enabled: !!profile.userId,
  });

  return (
    <header className={styles.commonHeader}>
      <section className={styles.innerSec}>
        <article className={styles.topArea}>
          <div className={styles.leftCont}>
            <button className={styles.logoBtn} onClick={() => router.push("/")}>
              <LogoBlue />
              <span className={styles.logoBeta}>Beta</span>
            </button>
          </div>

          <div className={`${styles.rightCont} ${isSignedIn ? "login" : ""} `}>
            {isSignedIn ? (
              <>
                <button className={styles.writeBtn} onClick={onClickEnroll}>
                  <WriteWhite />
                  <p>작성하기</p>
                </button>

                <div className={styles.imgWrap}>
                  <div
                    className={styles.shopImgWrap}
                    onClick={() => {
                      router.push("/charge");
                    }}
                  >
                    <Shop />
                  </div>

                  <div className={styles.alertImgWrap} onClick={() => setPreparePopup(true)}>
                    <Bell />
                    {/* NOTE - 임시로 주석처리 (기능 미개발) */}
                    {/* <AlertCount />
                    <AlertHoverPopup /> */}
                  </div>

                  <div className={styles.profImgWrap}>
                    <Image
                      className={styles.profile}
                      src={profileData?.data.data.profileImage || DefaultProfImg}
                      alt="profile image"
                      loader
                      priority
                      width={29}
                      height={29}
                    />
                    <ProfileHoverPopup />
                  </div>
                </div>
              </>
            ) : (
              <>
                <button className={styles.writeBtn} onClick={() => router.push("/auth/signin")}>
                  <WriteWhite />
                  <p>작성하기</p>
                </button>

                <button className={styles.authBtn} onClick={() => router.push("/auth/signin")}>
                  <p>로그인/회원가입</p>
                </button>
              </>
            )}
          </div>
        </article>

        <article className={styles.bottomArea}>
          <div className={styles.leftCont}>
            <span className={styles.selBtnBox}>
              <button className={styles.categoryBtn}>
                <Hamburger />

                <div className={styles.valueBox}>
                  <p>전체 카테고리</p>
                  <TriangleDn />
                </div>
              </button>

              <PostCategoryPopup />
            </span>

            <ul className={styles.categoryList}>
              {D_commonHeaderCategoryList.map((v, i) => (
                <li
                  key={i}
                  className={v.label === commonSort ? styles.on : ""}
                  onClick={() => onClickTab(v.url)}
                >
                  <p>{v.label}</p>
                </li>
              ))}
            </ul>
          </div>

          <div className={styles.rightCont}>
            <div className={styles.bannerBox}>
              <div
                className={styles.banner}
                onClick={() => (!isSignedIn ? router.push("/auth/signin") : onClickEnroll())}
              >
                <p className={styles.cont}>
                  {!!isSignedIn && (
                    <span>
                      <strong className={styles.nickname}>{nickname}</strong>
                      님,
                    </span>
                  )}
                  나만의 비법, 지식, 경험을 공유하고 수익을 창출해 보세요!
                </p>
                <ChevronRt />
              </div>
            </div>
          </div>
        </article>
      </section>
      {preparePopup && (
        <>
          <ConfirmTitlePopup
            title="앗! 개발중입니다."
            content={`비법거래소 배타버전에서는 아직 작동하지
않는 기능입니다. 빨리 준비해볼게요!!`}
            confirmText="확인"
            confirmFunc={() => setPreparePopup(false)}
            zIndex={80}
          />
          <PopupBg bg zIndex={70} off={() => setPreparePopup(false)} />
        </>
      )}
    </header>
  );
}
