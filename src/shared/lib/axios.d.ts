import "axios";

declare module "axios" {
  export interface AxiosRequestConfig {
    requireToken?: boolean;
  }
}
