interface mypageCategory {
  url: string;
  label: string;
  count?: number;
}

type postState = "판매중" | "비공개" | "일시판매중지" | "영구판매중지";

interface mypageWritePosts {
  title: string;
  replyCount?: number;
  category: string;
  createdAt: Date;
  thumbnailUrl?: string;
  likeCount?: number;
  revenue?: number;
  percentOfChange?: number;
  amountOfChange?: number;
  price?: number;
  state?: postState;
  read?: boolean;
}

interface IwriteGetStateComp {
  styles: { readonly [key: string]: string };
  state?: postState;
}
