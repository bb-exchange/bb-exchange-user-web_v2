import { ProfitCategoryEventType } from "@const/common";

export type ProfitEventSummary = {
  eventType: ProfitCategoryEventType;
  profitAmount: number;
  profitDate: string;
};

export type ProfitEventResponse = {
  contents: ProfitEventSummary[];
};

export type ProfitSummary = {
  profitDate: string;
  profitAmount: number;
};

export type ProfitResponse = {
  contents: ProfitSummary[];
};
