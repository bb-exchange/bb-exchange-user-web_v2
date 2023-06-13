import axios from "axios";

const baseURL = "https://api.stage-bibubex.com";

export const basicInstance = axios.create({
  baseURL,
  withCredentials: true,
});

basicInstance.interceptors.request.use(
  function (config) {
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

basicInstance.interceptors.response.use(
  function (response) {
    return response.data.data;
  },
  function (error) {
    return Promise.reject(error);
  }
);
