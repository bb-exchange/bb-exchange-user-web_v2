interface IhomeCategory {
  url: string;
  label: string;
}

interface IpostList {
  rankDiff?: number;
  title: string;
  replyCount?: number;
  thumbnailUrl?: string;
  category: string;
  categoryImg: string;
  creatorNickname: string;
  createdAt: Date;
  percentOfChange?: number;
  amountOfChange?: number;
  point?: number;
  likeCount?: number;
  isLike?: boolean;
  isList?:boolean;
}
