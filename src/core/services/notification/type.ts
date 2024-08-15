import { NotificationType } from "@/shared/constants/codes";
import { PageData } from "@/shared/constants/enums";

export type NotificationSummary = {
  id: number;
  templateCode: NotificationType;
  title: string;
  content: string | null;
  isRead: boolean;
  createdAt: number;
  landingTargetId: number;
};

export type NotificationResponse = {
  data: {
    contents: NotificationSummary[];
  } & PageData;
};
