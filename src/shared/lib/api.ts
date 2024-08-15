import axios, { AxiosInstance } from "axios";
import { deleteCookie, getCookie, setCookie } from "cookies-next";

const baseURL = process.env.NEXT_PUBLIC_BASE_URL;

const api: AxiosInstance = axios.create({
  baseURL,
});

// 리프레시 토큰 요청 중인지 추적하기 위한 변수
let isRefreshing = false;
let failedQueue: { resolve: (value?: unknown) => void; reject: (reason?: any) => void }[] = [];

// 요청을 큐에 추가하여, 토큰 갱신 후에 재시도
const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });

  failedQueue = [];
};

api.interceptors.request.use(
  (config) => {
    // 토큰이 필요한지 여부를 요청 별 설정으로 판단
    if (config?.requireToken) {
      const accessToken = getCookie("accessToken");
      if (accessToken) {
        config.headers["Authorization"] = `Bearer ${accessToken}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// 응답 인터셉터 설정
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // 401 Unauthorized 에러 처리
    if (error.response.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        // 이미 토큰을 갱신 중인 경우
        try {
          const token = await new Promise((resolve, reject) => {
            failedQueue.push({ resolve, reject });
          });
          originalRequest.headers["Authorization"] = `Bearer ${token}`;
          return await axios(originalRequest);
        } catch (err) {
          return await Promise.reject(err);
        }
      }

      originalRequest._retry = true;
      isRefreshing = true;

      const refreshToken = getCookie("refreshToken");
      return new Promise((resolve, reject) => {
        api
          .post("/v1/auth/reissue", { refreshToken: refreshToken })
          .then(({ data }) => {
            setCookie("accessToken", data.data.accessToken, {
              path: "/",
            });
            setCookie("refreshToken", data.data.refreshToken, {
              path: "/",
            });
            api.defaults.headers.common["Authorization"] = `Bearer ${data.data.accessToken}`;
            originalRequest.headers["Authorization"] = `Bearer ${data.data.accessToken}`;
            processQueue(null, data.data.accessToken);
            resolve(axios(originalRequest));
          })
          .catch((err) => {
            processQueue(err, null);
            deleteCookie("accessToken", {
              path: "/",
              domain: window.location.origin,
            });
            deleteCookie("refreshToken", {
              path: "/",
              domain: window.location.origin,
            });
            window.location.href = "/auth/signin";
            reject(err);
          })
          .finally(() => {
            isRefreshing = false;
          });
      });
    }

    return Promise.reject(error);
  },
);

export default api;
