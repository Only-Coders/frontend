import axios from "axios";
import { refreshToken } from "@/services/auth";
import store from "@/store/index";
import Router from "@/router/index";

const config = {
  baseURL: process.env.apiURL
};
const instance = axios.create(config);

export function setHeaders(token: string): void {
  instance.defaults.headers.common["Authorization"] = "Bearer " + token;
  instance.defaults.headers.common["Accept-Language"] = store.state.lang;
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
      // localStorage.removeItem("accessToken"); // esto va a servir para luego hacer la feat de logout
      // window.location.reload();
      Router.push("/login");
      throw error;
    }

    const data = await refreshToken();
    localStorage.setItem("accessToken", data.token);
    setHeaders(data.token);
    return instance.request(error.config);
  }
);

instance.interceptors.request.use((request) => {
  if (!request.headers.common["Authorization"]) {
    const token = localStorage.getItem("accessToken");
    if (token) {
      setHeaders(token);
    }
  }
  return request;
});

export default instance;
