import styles from "./alertHoverPopup.module.scss";

import { useRouter } from "next/router";

import { useMutation } from "@tanstack/react-query";
import cn from "classnames";
import moment from "moment";

import ArrowRight from "@assets/icons/BlackArrowRight.svg";

import { updateNotification, updateNotificationAll } from "@api/notification";
import { NotificationResponse } from "@api/notification/types";

import { NotificationTypeCode } from "@const/common";

type AlertHoverPopupProps = {
  data?: NotificationResponse;
  refetch: () => void;
};

const AlertHoverPopup = ({ data: notificationData, refetch }: AlertHoverPopupProps) => {
  const hasReadAlarm = notificationData?.data?.contents?.every((content) => content.isRead);
  const router = useRouter();

  const { mutate: updateNotificationById } = useMutation({
    mutationFn: updateNotification,
    onSuccess: () => {
      refetch();
    },
  });
  const { mutate: updateNotificationByAll } = useMutation({
    mutationFn: updateNotificationAll,
    onSuccess: () => {
      refetch();
    },
  });

  const onClickTargetId = (contentId: number, targetId: number) => {
    updateNotificationById(contentId);
    if (!targetId) return;
    router.push(`/post/${targetId}`);
  };

  return (
    <section className={styles.alertContainer}>
      <div className={styles.title}>알림</div>
      <ul>
        {notificationData?.data?.contents && notificationData?.data?.contents?.length > 0 ? (
          notificationData?.data?.contents?.map((content) => {
            return (
              <li
                key={content.id}
                onClick={() => onClickTargetId(content.id, content.landingTargetId)}
              >
                <div className={styles.mainContainer}>
                  <div className={styles.topSection}>
                    <span className={cn(styles.chip, { [styles.active]: !content.isRead })}>
                      {NotificationTypeCode[content.templateCode].label}
                    </span>
                    <span className={styles.time}>
                      {moment(content.createdAt).format("MM월 DD일 (dd) a hh:mm")}
                    </span>
                  </div>
                  <div className={styles.bottomSection}>
                    <p className={styles.content}>{content.title}</p>
                    <p className={styles.description}>{content.content}</p>
                  </div>
                </div>
                {!!content.landingTargetId && <ArrowRight />}
              </li>
            );
          })
        ) : (
          <div className={styles.noData}>알림이 없습니다.</div>
        )}
      </ul>
      <button
        className={styles.textButton}
        disabled={hasReadAlarm}
        onClick={() => updateNotificationByAll()}
      >
        모두 읽음 처리하기
      </button>
    </section>
  );
};

export default AlertHoverPopup;
