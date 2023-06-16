interface IpostCategories {
  category: string;
  description: string;
}

interface Ireply {
  nickname?: string;
  tier?: "gold" | "silver";
  text?: string;
  like?: number;
  isLiked?: boolean;
  isDeleted?: boolean;
  nestedReply?: Ireply[];
}
