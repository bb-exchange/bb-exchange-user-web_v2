import { basicInstance } from "../instance";

export const getProfitEvent = async ({ month }: { month: string }) => {
  const { data } = await basicInstance.get(`/v1/profits/event-profit-log/${month}`);
  return data;
};
