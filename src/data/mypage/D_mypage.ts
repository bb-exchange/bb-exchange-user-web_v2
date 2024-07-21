export const D_mypagePostCategoryList: mypageCategory[] = [
  { url: "", label: "작성한 글", path: "/mypage" },
  { url: "buy", label: "구매한 글", path: "/mypage/buy" },
  { url: "free", label: "무료 획득 글", path: "/mypage/free" },
  { url: "like", label: "찜한 글", path: "/mypage/like" },
];

export const D_mypageNavList: mypageNavs[] = [
  {
    label: "글 관리",
    details: [
      {
        label: "내가 쓴 글",
        url: "/mypage",
      },
      {
        label: "내가 구매한 글",
        url: "/mypage/buy",
      },
      {
        label: "내가 찜한 글",
        url: "/mypage/like",
      },
    ],
  },
  {
    label: "프로필 수정",
    url: "/mypage/edit_prof",
  },
  {
    label: "포인트 관리",
    url: "/mypage/point",
  },
  {
    label: "수익금 관리",
    url: "/mypage/asset",
  },
];

export const D_mypagePointCategoryList: string[] = ["전체", "구매", "충전"];
