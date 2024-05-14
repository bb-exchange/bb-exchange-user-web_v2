import axios, { HeadersDefaults } from "axios";
import jwtDecode, { JwtPayload } from "jwt-decode";
import { getCookie, setCookie, deleteCookie } from "cookies-next";

const baseURL = process.env.NEXT_PUBLIC_BASE_URL;

let refreshing_token: any = null;

export const basicInstance = axios.create({
  baseURL,
  withCredentials: true,
});

basicInstance.defaults.headers.common["Access-Control-Allow-Origin"] = "*";
basicInstance.defaults.headers.common["Content-Type"] = "application/json";

basicInstance.interceptors.request.use(
  function (config) {
    const token = getCookie("accessToken");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

basicInstance.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    const originalConfig = error.config;
    if (!error.config.headers.Authorization?.includes(undefined)) {
      // Access Token was expired
      if (error.response?.status === 401 && !originalConfig._retry) {
        originalConfig._retry = true;
        const isRefreshTokenValid = validateTimeRefreshToken();

        if (isRefreshTokenValid) {
          return (async () => {
            try {
              refreshing_token = refreshing_token
                ? refreshing_token
                : newRefreshToken();

              let res: any = await refreshing_token;
              refreshing_token = null;

              if (res) {
                const newAccessToken = res.data.data.accessToken;

                setCookie("accessToken", res.data.data.accessToken, {
                  path: "/",
                });
                setCookie("refreshToken", res.data.data.refreshToken, {
                  path: "/",
                });

                error.config.headers.Authorization = "Bearer " + newAccessToken;

                return basicInstance(error.config);
              }
            } catch (err: any) {
              deleteCookie("accessToken", {
                path: "/",
                domain: window.location.origin,
              });
              deleteCookie("refreshToken", {
                path: "/",
                domain: window.location.origin,
              });
              window.location.href = "/auth/signin";
            }
          })();
        }
      }
      return Promise.reject(error);
    } else {
      //로그인해야 진입가능한 페이지에서 token 없는 경우 (잘못된 접근)
      // [10.03]index페이지 접근 시, 무한 redirect문제 발생
      // if (error.response.status === 401) {
      //   location.href = "/";
      // }
    }
  }
);

//Return new token
const newRefreshToken = async () => {
  const res: any = await axios.post(
    baseURL + `/v1/auth/reissue`,
    {
      refreshToken: getCookie("refreshToken"),
    },
    {
      withCredentials: true,
    }
  );
  return res;
};

//Check refreshToken expiry
const validateTimeRefreshToken = () => {
  const decodeRefreshToken: JwtPayload = jwtDecode(
    String(getCookie("refreshToken"))
  );
  let exp = Number(decodeRefreshToken.exp);
  let timestamp = new Date().getTime();
  let currentTime: number = timestamp / 1000;
  return exp > currentTime;
};
