import { PUT_notification_by_id } from "../api";

import { useMutation } from "@tanstack/react-query";

export const usePutNotificationById = () => {
  return useMutation({
    mutationKey: [PUT_notification_by_id.name],
    mutationFn: PUT_notification_by_id,
  });
};
