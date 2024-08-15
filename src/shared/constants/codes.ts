export type CodeType<T extends string> = Record<T, { label: string; value: T }>;

export type NotificationType =
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
  | "COMMENT_LIKED"
  | "DAILY_EVENT_WRITE_ARTICLE_WITH_LIKES_DONE"
  | "DAILY_EVENT_INVITE_DONE"
  | "DAILY_EVENT_ALL_DONE";
export const NotificationTypeCode: CodeType<NotificationType> = {
  ARTICLE_STOCK_LISTED: {
    label: "내 글 상장",
    value: "ARTICLE_STOCK_LISTED",
  },
  ARTICLE_STOCK_DELISTED: {
    label: "내 글 상장 폐지",
    value: "ARTICLE_STOCK_DELISTED",
  },
  ARTICLE_NEW_COMMENT: {
    label: "댓글",
    value: "ARTICLE_NEW_COMMENT",
  },
  ARTICLE_SALE_SUSPENDED_TEMP: {
    label: "일시 판매 중지",
    value: "ARTICLE_SALE_SUSPENDED_TEMP",
  },
  ARTICLE_SALE_SUSPENDED: {
    label: "영구 판매 중지",
    value: "ARTICLE_SALE_SUSPENDED",
  },
  ARTICLE_REJECTED: {
    label: "비공개 처리",
    value: "ARTICLE_REJECTED",
  },
  PROFIT_SETTLEMENT_REQUEST_DONE: {
    label: "출금신청",
    value: "PROFIT_SETTLEMENT_REQUEST_DONE",
  },
  PROFIT_SETTLEMENT_DONE: {
    label: "출금완료",
    value: "PROFIT_SETTLEMENT_DONE",
  },
  TAX_INVOICE_ISSUE_DONE: {
    label: "세금계산서 발행",
    value: "TAX_INVOICE_ISSUE_DONE",
  },
  ARTICLE_LIKED: {
    label: "좋아요",
    value: "ARTICLE_LIKED",
  },
  COMMENT_LIKED: {
    label: "좋아요",
    value: "COMMENT_LIKED",
  },
  DAILY_EVENT_WRITE_ARTICLE_WITH_LIKES_DONE: {
    label: "일일보상",
    value: "DAILY_EVENT_WRITE_ARTICLE_WITH_LIKES_DONE",
  },
  DAILY_EVENT_INVITE_DONE: {
    label: "일일보상",
    value: "DAILY_EVENT_INVITE_DONE",
  },
  DAILY_EVENT_ALL_DONE: {
    label: "일일보상",
    value: "DAILY_EVENT_ALL_DONE",
  },
};
