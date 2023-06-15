import { fetchPost } from ".src/api/post/post";
import { D_otherPostList } from ".src/data/D_post";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useState } from "react";

export default function usePost() {
  const router = useRouter();

  const [otherPostList, setOtherPostList] =
    useState<IpostList[]>(D_otherPostList);

  const { data: postData } = useQuery(["post", router.query.id], fetchPost, {
    retry: false,
  });

  return {
    postData,
    otherPostList,
  };
}
