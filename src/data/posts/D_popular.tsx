import { hourToSec } from ".src/util/dateTime";
import thumb1 from ".assets/example/popular/thumb1.png";
import thumb2 from ".assets/example/popular/thumb2.png";
import thumb3 from ".assets/example/popular/thumb3.png";
import thumb4 from ".assets/example/popular/thumb4.png";
import business from ".assets/example/category/business.png";
import hobby from ".assets/example/category/hobby.png";
import etc from ".assets/example/category/etc.png";

export const D_popularPostList: any[] = [
  {
    id: 7,
    rankDiff: 3,
    replyCount: 3,
    title: "반드시 알아야 할 스타트업 IR 자료 필수 항목 9가지",
    thumbnailUrl: thumb1,
    categoryImg: business,
    category: "사업",
    creatorNickname: "투자유치김투자",
    createdAt: new Date(new Date().getTime() - 4 * 24 * hourToSec),
    percentOfChange: 20,
    amountOfChange: 90,
    point: 450,
  },
  {
    id: 6,
    rankDiff: 2,
    replyCount: 3,
    title: "여행 경비를 줄이는 효과적인 방법 10가지",
    thumbnailUrl: thumb2,
    categoryImg: hobby,
    category: "취미",
    creatorNickname: "여행유투버김란",
    createdAt: new Date(new Date().getTime() - 5 * 24 * hourToSec),
    percentOfChange: 20,
    amountOfChange: 80,
    point: 400,
  },
  {
    id: 5,
    rankDiff: 1,
    replyCount: 4,
    title: "변호사가 알려주는 전세 사기 방지법 7",
    thumbnailUrl: thumb3,
    categoryImg: etc,
    category: "기타꿀팁",
    creatorNickname: "법률법인무한",
    createdAt: new Date(new Date().getTime() - 6 * 24 * hourToSec),
    percentOfChange: 10,
    amountOfChange: 22,
    point: 220,
  },
  {
    id: 4,
    rankDiff: 0,
    replyCount: 2,
    title: "첫 유럽 여행을 떠나는 여행자를 위한 팁 7가지",
    thumbnailUrl: thumb4,
    categoryImg: hobby,
    category: "취미",
    creatorNickname: "김란의유럽투어",
    createdAt: new Date(2023, 7, 28),
    percentOfChange: 1,
    amountOfChange: 1,
    point: 101,
  },
];
