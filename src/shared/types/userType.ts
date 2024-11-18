export type UserSummary = {
  gradeType: string;
  userId: number;
  nickname: string;
};

export interface MyDataResponse {
  data: {
    id: number;
    nickname: string;
    agreeToGetPushNotification: boolean;
    agreeToMarketingInfo: boolean;
  };
}

export interface UserProfileResponse {
  data: {
    userId: number;
    profileImage: string | null;
    nickname: string;
    gradeType: string;
    recommendCode: string;
    description: string;
    balance: number;
    expectedSettlementAmount: number;
    settlementAmount: number;
    subscribeId: string | null;
    subscriberCount: number;
    subscriptionCount: number;
    subscribeStatus: string | null;
  };
}
