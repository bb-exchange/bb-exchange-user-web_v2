import { NotificationType, PageData } from "@/shared/constants/enums";

export type NotificationSummary = {
  id: number;
  templateCode: NotificationType;
  title: string;
  content: string | null;
  isRead: boolean;
  createdAt: number;
  landingTargetId: number;
};

/** [GET] /v1/notifications : 유저 최근 알림 조회 */
export type NotificationResponse = {
  data: {
    contents: NotificationSummary[];
  } & PageData;
};
