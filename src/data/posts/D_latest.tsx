import business from ".assets/example/category/business.png";
import date from ".assets/example/category/date.png";
import etc from ".assets/example/category/etc.png";
import hobby from ".assets/example/category/hobby.png";
import invest from ".assets/example/category/invest.png";
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
import { hourToSec } from ".src/utils/dateTime";

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
    replyList: [],
  },
  {
    id: 9,
    replyCount: 0,
    title: "이집트(Egypt) 여행 전 꼭 읽어야할 주의사항 및 정보 팁 준비물",
    thumbnailUrl: thumb2,
    categoryImg: invest,
    category: "취미",
    creatorNickname: "김란의유럽투어",
    createdAt: new Date(new Date().getTime() - 24 * hourToSec),
    likeCount: 28,
    replyList: [],
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
    replyList: [],
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
    replyList: [
      {
        nickname: "wooAng",
        tier: "gold",
        text: "감사합니다! 이 IR 자료로 사용했더니 사업 비용 비딩에 성공했어요~",
        createdAt: new Date(new Date().getTime() - 1 * 24 * hourToSec),
        likeCount: 2,
      },
      {
        nickname: "유니콘가즈아",
        text: "감사합니다~!",
        createdAt: new Date(new Date().getTime() - 2 * 24 * hourToSec),
      },
      {
        nickname: "startupgoing",
        text: "사업 자료 작성이 어려웠는데, 정말 강추합니다",
        createdAt: new Date(new Date().getTime() - 3 * 24 * hourToSec),
      },
    ],
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
    replyList: [
      {
        nickname: "걸어서세계일주",
        text: "여행 이야기가 더 궁금해요 시리즈로 내주세요",
        createdAt: new Date(new Date().getTime() - 1 * 24 * hourToSec),
        likeCount: 8,
      },
      {
        nickname: "qsdfe0013",
        text: "각 나라별로 잘 정리가 되어있어서 좋네요",
        createdAt: new Date(new Date().getTime() - 3 * 24 * hourToSec),
        likeCount: 6,
      },
      {
        nickname: "travellover",
        text: "잘봤습니다 첫 유럽 여행자에게 추천해요",
        createdAt: new Date(new Date().getTime() - 3 * 24 * hourToSec),
      },
    ],
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
    replyList: [
      {
        nickname: "avaedno",
        text: "빌라왕 이후로 전세 너무 불안했는데, 글 보고난 후 더 꼼꼼히 잘 확인해서 집 잘구했습니다.",
        createdAt: new Date(new Date().getTime() - 2 * 24 * hourToSec),
        likeCount: 5,
      },
      {
        nickname: "달팽이가되고파",
        text: "전세사기부터 보증보험까지 정리되어있어 좋네요",
        createdAt: new Date(new Date().getTime() - 3 * 24 * hourToSec),
        likeCount: 2,
      },
      {
        nickname: "신림동다람쥐",
        text: "감사합니다",
        createdAt: new Date(new Date().getTime() - 5 * 24 * hourToSec),
      },
    ],
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
    replyList: [
      {
        nickname: "파리지앵",
        text: "첫 유럽에 대해서 꿀팁들이 많아요",
        createdAt: new Date(new Date().getTime() - 1 * 24 * hourToSec),
        likeCount: 1,
      },
      {
        nickname: "맛집도장깨기",
        text: "유럽여행에 잘 참고했어요! 유럽여행 필독서",
        createdAt: new Date(new Date().getTime() - 3 * 24 * hourToSec),
      },
    ],
  },
  {
    id: 3,
    replyCount: 3,
    title: "결혼 준비 체크리스트, 웨딩홀부터 스드메까지(스드메 추천, 준비 비용)",
    thumbnailUrl: thumb8,
    categoryImg: date,
    category: "연애/결혼/육아",
    creatorNickname: "예신모여라",
    createdAt: new Date(2023, 7, 27),
    likeCount: 60,
    replyList: [
      {
        nickname: "예비신부모모",
        text: "웨딩플래너 끼고 준비하고 있었는데 안읽으면 바가지 씌워질 뻔 했네요 ㅠㅠ",
        createdAt: new Date(2023, 7, 28),
        likeCount: 23,
      },
      {
        nickname: "부부의세계",
        text: "좋은 정보 너무 감사합니다 주변에 결혼한사람이 없었는데 너무 도움이 되었어요",
        createdAt: new Date(2023, 7, 28),
        likeCount: 11,
      },
      {
        nickname: "스드메프로",
        text: "박람회 일정정리까지 있어서 너무 좋았어요 최근에 코엑스에 박람회도 있던데 이 정보 업데이트 부탁해요!",
        createdAt: new Date(2023, 7, 28),
        likeCount: 8,
      },
    ],
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
    replyList: [
      {
        nickname: "지훈맘",
        text: "아이와 힘든 시기 보내고 있는데 항상 도움 많이 받고 있어요~실전에서 바로 써먹을 수 있어서 너무 좋고 어떤 전문가의 영상이나 책보다 더 도움이 많이 되네요~ 덕분에 아이와의 관계도 많이 회복되고 있어요~",
        createdAt: new Date(new Date().getTime() - 1 * 24 * hourToSec),
      },
      {
        nickname: "똑똑한엄마가되기",
        text: "친구같이 가깝지만 좋은 선생님같은 엄마가 되고싶어요. 현실육아에서 도움되는 가르침들에 감사드려요!",
        createdAt: new Date(new Date().getTime() - 2 * 24 * hourToSec),
      },
      {
        nickname: "초보엄마육아",
        text: "육아에 대해서 훈육에 대해서 많이 찾아보고 어떻게 하라는건지 잘 모르겠고 나는 왜 저렇게 안되나 싶어서 좌절 많이 되었었는데 너무 구체적으로 잘 말해주셔서 적용해볼 수 있을 것 같아요",
        createdAt: new Date(new Date().getTime() - 5 * 24 * hourToSec),
        likeCount: 3,
      },
      {
        nickname: "mommyy",
        text: "실질적인 팁을 재밌게 설명해주셔서 감사해요~~ 책도 구입해 읽어야겠다는 생각이 들어요^^",
        createdAt: new Date(new Date().getTime() - 5 * 24 * hourToSec),
        likeCount: 2,
      },
      {
        nickname: "minjunlove",
        text: "오늘도 도움되는 말씀 감사합니다",
        createdAt: new Date(2023, 7, 31),
        likeCount: 8,
      },
      {
        nickname: "user080",
        text: "손주를 몇시간 봐주고 있는데 선생님 말씀 참고하면서 많이 도움받고 있답니다~",
        createdAt: new Date(2023, 7, 27),
        likeCount: 8,
      },
      {
        nickname: "minjiyo",
        text: "우와..아직 아기가 어리지만  너무나 도움 되는 실전 팁 인 것 같아요 감사합니다",
        createdAt: new Date(2023, 7, 27),
        likeCount: 2,
      },
      {
        nickname: "둔촌동마미",
        text: "아이가 중학교3학년 사춘기 절정인데... 이제라도 배워서 마지막 훈육을 해보고 있어요.\n오늘 내용 너무 도움이 되는 꼭필요한 내용이예요. 활용해볼게요~",
        createdAt: new Date(2023, 7, 27),
        likeCount: 2,
      },
    ],
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
    replyList: [
      {
        nickname: "lambo42bil",
        text: "너무 감사합니다! 오늘도 공부하고 갑니다!^^",
        createdAt: new Date(new Date().getTime() - 3 * 60),
      },
      {
        nickname: "경제원탑",
        text: "경제공부해주게 하셔서 감사합니다",
        createdAt: new Date(new Date().getTime() - 2 * 24 * hourToSec),
      },
      {
        nickname: "돈을벌어보자",
        text: "가장 유익한 경제콘텐츠였습니다!! 많은 초보자들을 위해 시리즈로 적어주셨으면 좋겠어요",
        createdAt: new Date(new Date().getTime() - 4 * 24 * hourToSec),
        likeCount: 3,
      },
      {
        nickname: "스마트한",
        text: "사회초년생에게 꼭 추천해주고 싶네요",
        createdAt: new Date(new Date().getTime() - 4 * 24 * hourToSec),
        likeCount: 2,
      },
    ],
  },
];
