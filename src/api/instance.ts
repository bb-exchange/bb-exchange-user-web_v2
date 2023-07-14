import axios, { HeadersDefaults } from "axios";
import jwtDecode, { JwtPayload } from "jwt-decode";
import { Cookies, useCookies } from "react-cookie";

const baseURL = "https://api.stage-bibubex.com";
const cookie = new Cookies();
let refreshing_token: any = null;

export const basicInstance = axios.create({
  baseURL,
  withCredentials: true,
});

basicInstance.defaults.headers.common["Content-Type"] = "application/json";

basicInstance.interceptors.request.use(
  function (config) {
    const token = cookie.get("accessToken");
    if (token) {
      config.headers.Authorization = `Bearer ${cookie.get("accessToken")}`;
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
  function async(error) {
    const originalConfig = error.config;
    if (error.config.headers.Authorization !== undefined) {
      // Access Token was expired
      if (error.response.status === 401 && !originalConfig._retry) {
        originalConfig._retry = true;
        const isRefreshTokenValid = validateTimeRefreshToken();

        if (isRefreshTokenValid) {
          try {
            refreshing_token = refreshing_token
              ? refreshing_token
              : newRefreshToken();
            refreshing_token = null;
            const res: any = refreshing_token;
            if (res) {
              console.log(res);
              const newAccessToken = res.data.data.accessToken;
              cookie.set("accessToken", res.data.data.accessToken, {
                secure: true,
                path: "/",
              });
              cookie.set("refreshToken", res.data.data.refreshToken, {
                secure: true,
                path: "/",
              });
              error.config.headers.Authorization = "Bearer " + newAccessToken;

              return basicInstance(error.config);
            }
          } catch (err: any) {
            cookie.remove("accessToken");
            cookie.remove("refreshToken");
          }
        }
      }
    }

    return Promise.reject(error);
  }
);

//Return new token
const newRefreshToken = async () => {
  const res: any = await axios.post(baseURL + `/v1/auth/reissue`, {
    refreshToken: cookie.get("refreshToken"),
  });
  return res;
};

//Check refreshToken expiry
const validateTimeRefreshToken = () => {
  const decodeRefreshToken: JwtPayload = jwtDecode(cookie.get("refreshToken"));
  let exp = Number(decodeRefreshToken.exp);
  let timestamp = new Date().getTime();
  let currentTime: number = timestamp / 1000;
  return exp > currentTime;
};
