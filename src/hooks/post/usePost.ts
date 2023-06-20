import { fetchPost } from ".src/api/post/post";
import { D_otherPostList, D_replyList } from ".src/data/post/D_post";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useRef, useState } from "react";

export default function usePost() {
  const router = useRouter();
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const [otherPostList, setOtherPostList] =
    useState<IpostList[]>(D_otherPostList);
  const [like, setLike] = useState<1 | 0 | -1>(0);
  const [reply, setReply] = useState<string>("");
  const [replyList, setReplyList] = useState<Ireply[]>(D_replyList);
  const [postVerPopup, setPostVerPopup] = useState<boolean>(false);
  const [imgPopup, setImgPopup] = useState<string>("");

  const { data: postData } = useQuery(["post", router.query.id], fetchPost, {
    retry: false,
  });

  function onClickLikeBtn(int: -1 | 0 | 1) {
    if (int === like) setLike(0);
    else setLike(int);
  }

  return {
    inputRef,
    postData,
    like,
    reply,
    setReply,
    replyList,
    postVerPopup,
    setPostVerPopup,
    onClickLikeBtn,
    otherPostList,
    imgPopup,
    setImgPopup,
  };
}
