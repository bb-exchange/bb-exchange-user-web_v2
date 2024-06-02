import { PageData } from "@api/interface";

import { NotificationInteraction } from "@const/common";

export type NotificationContent = {
  id: number;
  templateCode: NotificationInteraction;
  title: string;
  content: string | null;
  isRead: boolean;
  createdAt: number;
  landingTargetId: number;
};

export type NotificationResponse = {
  data: {
    contents: NotificationContent[];
  } & PageData;
};
