import { PUT_notification_all } from "../api";

import { useMutation } from "@tanstack/react-query";

export const usePutNotificationAll = () => {
  return useMutation({
    mutationKey: [PUT_notification_all.name],
    mutationFn: PUT_notification_all,
  });
};
