interface IpostCategories {
  category: string;
  description: string;
}

interface Ireply {
  nickname?: string;
  tier?: "gold" | "silver";
  text?: JSX.Element;
  likeCount?: number;
  isLiked?: boolean;
  isDeleted?: boolean;
  nestedReply?: Ireply[];
  createdAt?: Date;
}
