export type CodeType<T extends string> = Record<T, { label: string; value: T }>;

export type NotificationInteraction =
  | "ARTICLE_STOCK_LISTED"
  | "ARTICLE_STOCK_DELISTED"
  | "ARTICLE_NEW_COMMENT"
  | "ARTICLE_SALE_SUSPENDED_TEMP"
  | "ARTICLE_SALE_SUSPENDED"
  | "ARTICLE_REJECTED"
  | "PROFIT_SETTLEMENT_REQUEST_DONE"
  | "PROFIT_SETTLEMENT_DONE"
  | "TAX_INVOICE_ISSUE_DONE"
  | "ARTICLE_LIKED"
  | "COMMENT_LIKED";
export const NotificationTypeCode: CodeType<NotificationInteraction> = {
  ARTICLE_STOCK_LISTED: {
    label: "게시글 상장",
    value: "ARTICLE_STOCK_LISTED",
  },
  ARTICLE_STOCK_DELISTED: {
    label: "게시글 상장 취소",
    value: "ARTICLE_STOCK_DELISTED",
  },
  ARTICLE_NEW_COMMENT: {
    label: "새로운 댓글",
    value: "ARTICLE_NEW_COMMENT",
  },
  ARTICLE_SALE_SUSPENDED_TEMP: {
    label: "판매 일시 중지",
    value: "ARTICLE_SALE_SUSPENDED_TEMP",
  },
  ARTICLE_SALE_SUSPENDED: {
    label: "판매 중지",
    value: "ARTICLE_SALE_SUSPENDED",
  },
  ARTICLE_REJECTED: {
    label: "게시글 거절",
    value: "ARTICLE_REJECTED",
  },
  PROFIT_SETTLEMENT_REQUEST_DONE: {
    label: "수익 정산 요청 완료",
    value: "PROFIT_SETTLEMENT_REQUEST_DONE",
  },
  PROFIT_SETTLEMENT_DONE: {
    label: "수익 정산 완료",
    value: "PROFIT_SETTLEMENT_DONE",
  },
  TAX_INVOICE_ISSUE_DONE: {
    label: "세금계산서 발행 완료",
    value: "TAX_INVOICE_ISSUE_DONE",
  },
  ARTICLE_LIKED: {
    label: "게시글 좋아요",
    value: "ARTICLE_LIKED",
  },
  COMMENT_LIKED: {
    label: "댓글 좋아요",
    value: "COMMENT_LIKED",
  },
};

export const EVENT = "EVENT";
export const MONTHLY = "MONTHLY";
export const BY_CONTENT = "BY_CONTENT";
export const WITHDRAWAL = "WITHDRAWAL";
export type ProfitCategory = typeof EVENT | typeof MONTHLY | typeof BY_CONTENT | typeof WITHDRAWAL;
export const ProfitCategoryTypeCode: CodeType<ProfitCategory> = {
  [EVENT]: {
    label: "이벤트 수익금",
    value: EVENT,
  },
  [MONTHLY]: {
    label: "월별 수익금",
    value: MONTHLY,
  },
  [BY_CONTENT]: {
    label: "콘텐츠별 수익금",
    value: BY_CONTENT,
  },
  [WITHDRAWAL]: {
    label: "출금내역",
    value: WITHDRAWAL,
  },
};

export type ProfitCategoryEventType =
  | "ATTENDANCE"
  | "ARTICLE_LIKE"
  | "ARTICLE_COMMENT"
  | "COMMENT_LIKE"
  | "WRITE_ARTICLE_WITH_LIKES"
  | "INVITE"
  | "ALL_DONE";

export const ProfitCategoryEventTypeCode: CodeType<ProfitCategoryEventType> = {
  ATTENDANCE: {
    label: "출석",
    value: "ATTENDANCE",
  },
  ARTICLE_LIKE: {
    label: "게시글 좋아요",
    value: "ARTICLE_LIKE",
  },
  ARTICLE_COMMENT: {
    label: "게시글 댓글",
    value: "ARTICLE_COMMENT",
  },
  COMMENT_LIKE: {
    label: "댓글 좋아요",
    value: "COMMENT_LIKE",
  },
  WRITE_ARTICLE_WITH_LIKES: {
    label: "게시글 작성 후 좋아요받기",
    value: "WRITE_ARTICLE_WITH_LIKES",
  },
  INVITE: {
    label: "친구초대",
    value: "INVITE",
  },
  ALL_DONE: {
    label: "전체완료",
    value: "ALL_DONE",
  },
};
