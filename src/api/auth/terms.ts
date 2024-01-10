import { basicInstance } from "../instance";

export interface ITerms {
  oauthType: any;
  oauthId: string;
  agreeToMarketingInfo: boolean;
}

export const postTermsAgreement = async (data: ITerms) => {
  return await basicInstance.post("/v1/auth/agree-to-service-term", {
    ...data,
    agreeToServiceTerm: true,
  });
};
