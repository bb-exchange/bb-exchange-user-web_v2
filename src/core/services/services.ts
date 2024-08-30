import { CommonResponse } from "../types/commonType";
import { AxiosRequestConfig, AxiosResponse } from "axios";

import api from "@/shared/lib/api";

export const Get = async <T>(
  url: string,
  config?: AxiosRequestConfig,
): Promise<AxiosResponse<CommonResponse<T>>> => {
  const response = await api.get(url, config);
  return response;
};

export const Post = async <T, D = any>(
  url: string,
  data?: D,
  config?: AxiosRequestConfig,
): Promise<AxiosResponse<T>> => {
  const response = await api.post<T>(url, data, config);
  return response;
};

export const Put = async <T, R>(
  url: string,
  data?: R,
  config?: AxiosRequestConfig,
): Promise<AxiosResponse<T>> => {
  const response = await api.put<T>(url, data, config);
  return response;
};

export const Delete = async <T>(
  url: string,
  config?: AxiosRequestConfig,
): Promise<AxiosResponse<T>> => {
  const response = await api.delete(url, config);
  return response;
};
