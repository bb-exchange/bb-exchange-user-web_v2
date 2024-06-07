import AlertCount from "./alertCount";
import AlertHoverPopup from "./alertHoverPopup";
import PostCategoryPopup from "./postCategoryPopup";
import ProfileHoverPopup from "./profileHoverPopup";

import styles from "./commonHeader.module.scss";

import { useEffect, useRef } from "react";

import { useRouter } from "next/router";

import { useQuery } from "@tanstack/react-query";
import { useRecoilValue } from "recoil";

import DefaultProfImg from "@assets/example/DefaultProfImg.png";
import ChevronRt from "@assets/icons/ChevronRt.svg";
import Hamburger from "@assets/icons/Hamburger.svg";
import Shop from "@assets/icons/Shop.svg";
import TriangleDn from "@assets/icons/TriangleDn.svg";
import WriteWhite from "@assets/icons/WriteWhite.svg";
import Dvider from "@assets/images/divider.svg";
import LogoBlue from "@assets/logos/LogoBlue.svg";

import { getNotifications } from "@api/notification";
import { NotificationResponse } from "@api/notification/types";
import { getEthicalPledge, getProfile } from "@api/users/users";

import Image from "@components/Image";

import { D_commonHeaderCategoryList } from "@data/common/header";

import { isLoginState, profileState } from "@recoil/index";

interface HeaderProps {
  commonSort?: "인기" | "최신" | "상장" | "서비스 소개" | "이벤트" | "일일보상";
}

export default function CommonHeader({ commonSort }: HeaderProps) {
  const router = useRouter();

  const isSignedIn = useRecoilValue(isLoginState);
  const profile = useRecoilValue(profileState);

  const isClickedEnroll = useRef<boolean>(false);

  const onClickTab = (url: string, label: string) => {
    // 인증이 필요한 탭 List
    const authRequiredLabelList = ["일일보상"];

    if (authRequiredLabelList.includes(label) && !isSignedIn) {
      router.push("/auth/signin");
      return;
    }

    router.push(`/${url}`);
  };

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

  const { data: notifications } = useQuery<NotificationResponse>({
    queryKey: ["getNotifications"],
    queryFn: () => getNotifications(),
  });
  const alertCount = notifications?.data?.contents.filter((content) => !content.isRead);

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

          <div className={styles.rightCont}>
            {isSignedIn ? (
              <>
                <button className={styles.writeBtn} onClick={onClickEnroll}>
                  <WriteWhite />
                  <p>작성하기</p>
                </button>

                <div className={styles.headerIcon}>
                  <button
                    onClick={() => {
                      router.push("/charge");
                    }}
                  >
                    <Shop />
                  </button>
                </div>
                <div className={styles.headerIcon}>
                  <AlertCount count={alertCount?.length ?? 0} />
                  <AlertHoverPopup data={notifications} />
                </div>

                <div className={styles.headerIcon}>
                  <Image
                    className={styles.profile}
                    src={profileData?.data.data.profileImage || DefaultProfImg}
                    alt="profile image"
                    loader
                    priority
                    width={28}
                    height={28}
                  />
                  <ProfileHoverPopup />
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
              {D_commonHeaderCategoryList.map((v, i) =>
                v.label === "divder" ? (
                  <Dvider key={i} />
                ) : (
                  <li
                    key={i}
                    className={v.label === commonSort ? styles.on : ""}
                    onClick={() => onClickTab(v.url, v.label)}
                  >
                    <p>{v.label}</p>
                  </li>
                ),
              )}
            </ul>
          </div>

          <div className={styles.rightCont}>
            <div className={styles.bannerBox}>
              <div className={styles.banner} onClick={() => router.push("/event")}>
                <p className="p4 color-black2">
                  내 콘텐츠도 <span className="p4 semibold">로캣상장</span> 시키고 수익화하기
                </p>
                <ChevronRt />
              </div>
            </div>
          </div>
        </article>
      </section>
    </header>
  );
}
