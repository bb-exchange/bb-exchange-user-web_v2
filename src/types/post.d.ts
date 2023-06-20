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

interface IpostVersions {
  badge?: "best" | "new";
  now?: boolean;
  read?: boolean;
  num: number;
  createdAt: Date;
  title: string;
}
