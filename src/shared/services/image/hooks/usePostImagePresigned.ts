import { POST_image_presigned } from "../api";
import { useMutation } from "@tanstack/react-query";

export const usePostImagePresigned = () => {
  return useMutation({
    mutationKey: [POST_image_presigned.name],
    mutationFn: POST_image_presigned,
  });
};
