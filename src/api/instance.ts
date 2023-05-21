import axios from "axios";

const baseURL = "https://api.stage-bibubex.com";

export const basicInstance = axios.create({
  baseURL,
});
