import UsePost from "./usePost";

import { useRouter } from "next/router";

import { QueryObserverResult } from "@tanstack/react-query";

import { PostData } from "@api/interface";

interface Iprops {
  usePost: ReturnType<typeof UsePost>;
  refetchArticle: () => Promise<QueryObserverResult<PostData, Error>>;
}

export default function UseCompPayPopup({ usePost, refetchArticle }: Iprops) {
  const router = useRouter();

  // 닫기버튼 클릭시 마이페이지 구매한글 페이지로 랜딩
  const off = () => {
    usePost.setCompPayPopup(false);
    router.push("/mypage/buy");
  };

  // 지금볼래요 클릭시 원문 조회
  const onClickSeeNowBtn = async () => {
    await refetchArticle();
    usePost.setCompPayPopup(false);
  };

  return { off, onClickSeeNowBtn };
}
