import { basicInstance } from "../instance";

/**
 * 이벤트 수익금 리스트 조회 API
 */
export const getProfitEventByMonth = async ({ month }: { month: string }) => {
  const { data } = await basicInstance.get(`/v1/profits/event-profit-log/${month}`);
  return data;
};

/**
 * 월별 수익금 리스트 조회 API
 */
export const getProfitByMonth = async ({ month }: { month: string }) => {
  const { data } = await basicInstance.get(`/v1/profits/profit-log/${month}`);
  return data;
};

/**
 * 컨텐츠별 수익금 리스트 조회 API
 */
export const getProfitContentsByMonth = async () => {
  const { data } = await basicInstance.get(`/v1/profits/contents-profit-log`);
  return data;
};

/**
 * 수익금 출금 내역 리스트 조회 API
 */
export const getSettlementWithdrawByMonth = async ({ month }: { month: string }) => {
  const { data } = await basicInstance.get(`/v1/settlement/withdraw-log/${month}`);
  return data;
};
