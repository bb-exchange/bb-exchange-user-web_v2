interface IenrollProps {
  thumbNail: string;
  category: IpostCategories;
  title: string;
  content: string;
  tag: string;
  tagList: string[];
}

interface IrecentTag {
  recentTag: string;
  usedCount: number;
}

interface Idrafts {
  createdAt: Date;
  title: string;
}
