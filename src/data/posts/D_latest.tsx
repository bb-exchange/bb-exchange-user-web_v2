import { hourToSec } from ".src/util/dateTime";
import thumb1 from ".assets/example/latest/thumb1.png";
import thumb2 from ".assets/example/latest/thumb2.png";
import thumb3 from ".assets/example/latest/thumb3.png";
import thumb4 from ".assets/example/latest/thumb4.png";
import thumb5 from ".assets/example/latest/thumb5.png";
import thumb6 from ".assets/example/latest/thumb6.png";
import thumb7 from ".assets/example/latest/thumb7.png";
import thumb8 from ".assets/example/latest/thumb8.png";
import thumb9 from ".assets/example/latest/thumb9.png";
import thumb10 from ".assets/example/latest/thumb10.png";
import business from ".assets/example/category/business.png";
import hobby from ".assets/example/category/hobby.png";
import etc from ".assets/example/category/etc.png";
import invest from ".assets/example/category/invest.png";
import date from ".assets/example/category/date.png";

export const D_latestPostList: any[] = [
  {
    id: 10,
    replyCount: 0,
    title: "남미여행을 가고 싶은 분들께 | Tip 및 주의사항",
    thumbnailUrl: thumb1,
    categoryImg: hobby,
    category: "취미",
    creatorNickname: "김란의유럽투어",
    createdAt: new Date(new Date().getTime() - 0.25 * hourToSec),
    likeCount: 8,
  },
  {
    id: 9,
    replyCount: 0,
    title: "이집트(Egypt) 여행 전 꼭 읽어야할 주의사항 및 정보 팁 준비물",
    thumbnailUrl: thumb2,
    categoryImg: invest,
    category: "주식/투자",
    creatorNickname: "김란의유럽투어",
    createdAt: new Date(new Date().getTime() - 24 * hourToSec),
    likeCount: 28,
  },
  {
    id: 8,
    replyCount: 0,
    title: "[변호사가 알려주는 생활법률] 바람 핀 남편이 쓴 각서 효력은?",
    thumbnailUrl: thumb3,
    categoryImg: etc,
    category: "기타꿀팁",
    creatorNickname: "법률법인무한",
    createdAt: new Date(new Date().getTime() - 2 * 24 * hourToSec),
    likeCount: 44,
  },
  {
    id: 7,
    replyCount: 3,
    title: "반드시 알아야 할 스타트업 IR 자료 필수 항목 9가지",
    thumbnailUrl: thumb4,
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
    replyCount: 3,
    title: "여행 경비를 줄이는 효과적인 방법 10가지",
    thumbnailUrl: thumb5,
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
    replyCount: 4,
    title: "변호사가 알려주는 전세 사기 방지법 7",
    thumbnailUrl: thumb6,
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
    replyCount: 2,
    title: "첫 유럽 여행을 떠나는 여행자를 위한 팁 7가지",
    thumbnailUrl: thumb7,
    categoryImg: hobby,
    category: "취미",
    creatorNickname: "김란의유럽투어",
    createdAt: new Date(2023, 7, 28),
    percentOfChange: 1,
    amountOfChange: 1,
    point: 101,
  },
  {
    id: 3,
    replyCount: 3,
    title:
      "결혼 준비 체크리스트, 웨딩홀부터 스드메까지(스드메 추천, 준비 비용)",
    thumbnailUrl: thumb8,
    categoryImg: date,
    category: "연애/결혼/육아",
    creatorNickname: "예신모여라",
    createdAt: new Date(2023, 7, 27),
    likeCount: 60,
  },
  {
    id: 2,
    replyCount: 8,
    title: "우리 아이 언제부터 말할 수 있을까?",
    thumbnailUrl: thumb9,
    categoryImg: date,
    category: "연애/결혼/육아",
    creatorNickname: "육아하는엄마",
    createdAt: new Date(2023, 7, 26),
    likeCount: 62,
  },
  {
    id: 1,
    replyCount: 4,
    title: "2023년 주식시장 전망, 경기 침체 우려, 주식 시장 여파는?",
    thumbnailUrl: thumb10,
    categoryImg: invest,
    category: "주식/투자",
    creatorNickname: "머니로그",
    createdAt: new Date(2023, 7, 24),
    likeCount: 89,
  },
];
