import { basicInstance } from "../instance";

export const getProfitEventByMonth = async ({ month }: { month: string }) => {
  const { data } = await basicInstance.get(`/v1/profits/event-profit-log/${month}`);
  return data;
};

export const getProfitByMonth = async ({ month }: { month: string }) => {
  const { data } = await basicInstance.get(`/v1/profits/profit-log/${month}`);
  return data;
};
