/* eslint-disable react/no-unescaped-entities */
import styles from "./daily.module.scss";

import { useCallback, useEffect, useState } from "react";

import { useRouter } from "next/router";

import { useRecoilValue } from "recoil";

import { useGetDailyEvent } from "@api/event/useGetDailyEvent";

import CommonFooter from "@components/common/commonFooter";
import CommonHeader from "@components/common/header/commonHeader";
import { CommonPopup } from "@components/common/popup/CommonPopup";
import Image from "@components/Image";
import { InvitePopup } from "@components/invite/InvitePopup";

import { D_eventFooterList, D_eventList } from "@data/event/D_event";

import { isLoginState } from "@recoil/index";

const Daily = () => {
  const router = useRouter();

  const isSignedIn = useRecoilValue(isLoginState);
  const { dailyEvent } = useGetDailyEvent();

  const [formattedEventList, setFormattedEventList] = useState<(D_eventList & DailyEvent)[]>([]);

  // 현재 팝업 toggle
  const [invitePopupInfo, setInvitePopupInfo] = useState({
    isShow: false,
    limitPerDay: 0,
    maxAmount: 0,
  });

  const [isLoginPopupShow, setIsLoginPopupShow] = useState<boolean>(false);

  useEffect(() => {
    if (dailyEvent?.dailyEventList) {
      const _formattedEventList = dailyEvent.dailyEventList.map((dailyEvent) => {
        let eventInfo = D_eventList.find((item) => item.name === dailyEvent.name);

        // 이벤트별 목표갯수 치환
        if (eventInfo && eventInfo.title) {
          eventInfo.title = eventInfo.title.replace("${count}", dailyEvent.attainment.toString());
        }

        return { ...dailyEvent, ...eventInfo };
      });

      setFormattedEventList(_formattedEventList);
    }
  }, [dailyEvent?.dailyEventList]);

  const onClickEvent = (event: D_eventList & DailyEvent) => {
    const authRequiredEventList = [
      "ARTICLE_COMMENT",
      "COMMENT_LIKE",
      "WRITE_ARTICLE_WITH_LIKES",
      "INVITE",
    ];

    // 로그인이 필요한 이벤트일 경우 로그인 팝업 SHOW
    if (!isSignedIn && authRequiredEventList.includes(event.name)) {
      return setIsLoginPopupShow(true);
    }

    // 초대하기의 경우 초대하기 POPUP SHOW
    if (event.name === "INVITE") {
      setInvitePopupInfo((prev) => ({
        ...prev,
        isShow: true,
        limitPerDay: event.limitPerDay,
        maxAmount: event.amount * event.limitPerDay,
      }));
      return;
    } else if (event.path) {
      // 그 이외의 경우 router 이동
      router.push(event.path);
    }
  };

  const eventStatusCountRenderItem = useCallback((statusCount: number, limitPerDay: number) => {
    let renderItem;

    if (statusCount === 0) {
      // 미션 수행전인 미션의 경우
      renderItem = <>오늘 {limitPerDay}번 가능</>;
    } else {
      renderItem = (
        <>
          오늘 {statusCount}/{limitPerDay}번 완료
        </>
      );
    }

    return renderItem;
  }, []);

  const eventRightButtonRenderItem = useCallback(
    (name: string, statusCount: number, limitPerDay: number) => {
      let renderItem;
      if (name === "ATTENDANCE") {
        // 출석하기의 경우
        renderItem = (
          <button className={`${styles.onlyAppButton} h3 bold color-white1`}>앱에서 가능</button>
        );
      } else if (statusCount === limitPerDay) {
        // 참여 완료한 이벤트의 경우
        renderItem = <h3 className="h3 color-primary-bg1">내일 다시 열려요</h3>;
      } else {
        renderItem = (
          <Image
            src={"/assets/icons/ArrowRightSmall.svg"}
            width={24}
            height={24}
            alt="arrow_right"
          />
        );
      }

      return renderItem;
    },
    [],
  );

  return (
    <>
      <CommonHeader commonSort="일일보상" />

      <main className={styles.daily}>
        <section className={styles.titleSection}>
          <h1 className="h1 bold">오늘 받을 수 있는 현금</h1>
          <h1 className="h1 bold color-primary1">
            {Intl.NumberFormat().format(dailyEvent?.remainingAmount || 0)}원
          </h1>
          <p className="p1 color-black2">미션은 매일 밤 12시에 다시 시작돼요.</p>
        </section>

        <section>
          <div className={styles.eventContainer}>
            {formattedEventList.map((event) => {
              if (event.name === "ALL_DONE") {
                return (
                  <div key={event.id} className={`${styles.eventFooter} bg-gray2`}>
                    <h3 className="h3 bold">
                      모두 완료시{" "}
                      <span className="color-primary1">
                        {Intl.NumberFormat().format(event.amount)}원
                      </span>{" "}
                      추가 지급!
                    </h3>
                  </div>
                );
              } else {
                return (
                  <div
                    key={event.id}
                    className={styles.eventRowSection}
                    onClick={() => onClickEvent(event)}
                  >
                    <div className={styles.row}>
                      <Image src={event.image || ""} width={70} height={70} alt={event.name} />

                      <div className={styles.eventTitleSection}>
                        <h3 className="h3 bold color-black1">{event.title}</h3>
                        <p className="p3 bold color-primary1">
                          {Intl.NumberFormat().format(event.amount)}원
                        </p>
                        <p className="p2 color-black1">
                          {eventStatusCountRenderItem(event.statusCount, event.limitPerDay)}
                        </p>
                      </div>
                    </div>

                    {eventRightButtonRenderItem(event.name, event.statusCount, event.limitPerDay)}
                  </div>
                );
              }
            })}
          </div>
        </section>

        <section className={styles.footer}>
          <p className="p1 bold color-black2">유의사항</p>

          <ul>
            {D_eventFooterList.map((html, index) => (
              <li key={index} className="h3" dangerouslySetInnerHTML={{ __html: html }} />
            ))}
          </ul>
        </section>
      </main>

      <CommonFooter />

      {/* 친구 초대하기 팝업 */}
      {invitePopupInfo.isShow && (
        <InvitePopup
          maxInviteCount={invitePopupInfo.limitPerDay}
          maxAmount={invitePopupInfo.maxAmount}
          onClose={() => setInvitePopupInfo((prev) => ({ ...prev, isShow: false }))}
        />
      )}

      {isLoginPopupShow && (
        <CommonPopup
          title="로그인 후 매일 보상 받으세요"
          subTitle="해당 기능은 로그인이 필요해요"
          leftButtonText="취소"
          leftButonClick={() => setIsLoginPopupShow(false)}
          confirmFunc={() => router.push("/auth/signin")}
          confirmText="로그인"
        />
      )}
    </>
  );
};

export default Daily;
