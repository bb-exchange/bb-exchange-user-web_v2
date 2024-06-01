/* eslint-disable react/no-unescaped-entities */
import styles from "./daily.module.scss";

import { useCallback, useEffect, useState } from "react";

import { useRouter } from "next/router";

import { useGetDailyEvent } from "@api/event/useGetDailyEvent";

import CommonFooter from "@components/common/commonFooter";
import CommonHeader from "@components/common/header/commonHeader";
import Image from "@components/Image";
import { InvitePopup } from "@components/invite/InvitePopup";

import { D_eventFooterList, D_eventList } from "@data/event/D_event";

import useGetMyProfile from "@hooks/common/useGetProfile";

const Daily = () => {
  const router = useRouter();

  const { profile: myProfile } = useGetMyProfile();
  const { dailyEvent } = useGetDailyEvent(myProfile && myProfile.userId);

  const [formattedEventList, setFormattedEventList] = useState<(D_eventList & DailyEvent)[]>([]);

  // 현재 팝업 toggle
  const [isInvitePopupShow, setIsInvitePopupShow] = useState(false);

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

  const onClickEvent = (eventName: string, eventTargetPath?: string) => {
    // 초대하기의 경우 초대하기 POPUP SHOW
    if (eventName === "INVITE") {
      setIsInvitePopupShow(true);
      return;
    } else if (eventTargetPath) {
      // 그 이외의 경우 router 이동
      router.push(eventTargetPath);
    }
  };

  const eventStatusCountRenderItem = useCallback((statusCount: number, limitPerDay: number) => {
    let renderItem;

    if (statusCount === limitPerDay) {
      // 참여완료한 이벤트인 경우
      renderItem = (
        <>
          오늘 {statusCount}/{limitPerDay}번 완료
        </>
      );
    } else if (limitPerDay <= 1) {
      // 1회 이상의 미션인 경우
      renderItem = <>오늘 {limitPerDay}번 가능</>;
    } else if (statusCount < limitPerDay) {
      renderItem = (
        <>
          오늘 {limitPerDay - statusCount}/{limitPerDay}번 가능
        </>
      );
    } else {
      renderItem = <>오늘 {limitPerDay}번 가능</>;
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
      <CommonHeader />

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
                    onClick={() => onClickEvent(event.name, event.path)}
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
              <li
                key={index}
                className={`${styles.notice} h3`}
                dangerouslySetInnerHTML={{ __html: html }}
              />
            ))}
          </ul>
        </section>
      </main>

      <CommonFooter />

      {/* 친구 초대하기 팝업 */}
      {isInvitePopupShow && <InvitePopup onClose={() => setIsInvitePopupShow(false)} />}
    </>
  );
};

export default Daily;
