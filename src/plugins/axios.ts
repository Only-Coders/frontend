import axios from "axios";
import { refreshToken } from "@/services/auth";

const config = {
  baseURL: process.env.apiURL
};
const instance = axios.create(config);

export function setHeaders(token: string): void {
  instance.defaults.headers.common["Authorization"] = "Bearer " + token;
}

instance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    if (error.response.status != "401") {
      throw error;
    }
    if (error.config.url == "/api/auth/refresh") {
      localStorage.removeItem("accessToken");
      window.location.reload();
      throw error;
    }

    const data = await refreshToken();
    localStorage.setItem("accessToken", data.token);
    setHeaders(data.token);
    return instance.request(error.config);
  }
);

instance.interceptors.request.use((request) => {
  const token = localStorage.getItem("accessToken");
  if (token) {
    setHeaders(token);
  }
  return request;
});

export default instance;
