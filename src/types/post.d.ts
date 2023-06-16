interface IpostCategories {
  category: string;
  description: string;
}

interface Ireply {
  nickname?: string;
  tier?: "gold" | "silver";
  text?: string;
  likeCount?: number;
  isLiked?: boolean;
  isDeleted?: boolean;
  nestedReply?: Ireply[];
  createdAt?: Date;
}
