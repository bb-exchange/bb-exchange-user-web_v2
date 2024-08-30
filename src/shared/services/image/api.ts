import { Post } from "../services";

import { PostImagePresignedRequest, PostImagePresignedResponse } from "@/shared/types/imageType";

/** image presigned url 발급 */
export const POST_image_presigned = async (request: PostImagePresignedRequest) => {
  const { data } = await Post<PostImagePresignedResponse>("/v1/images/presigned", request, {
    requireToken: true,
  });
  return data.data;
};
