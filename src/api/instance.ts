import axios from "axios";
import jwtDecode, { JwtPayload } from "jwt-decode";
import { Cookies, useCookies } from "react-cookie";

const baseURL = "https://api.stage-bibubex.com";
const cookie = new Cookies();

export const basicInstance = axios.create({
  baseURL,
  withCredentials: true,
});

basicInstance.interceptors.request.use(
  function (config) {
    config.headers.Authorization = `Bearer ${cookie.get("accessToken")}`;
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
    return Promise.reject(error);
  }
);

//Return new token
const refreshToken = async () => {
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
