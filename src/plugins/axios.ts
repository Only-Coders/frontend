import axios, { AxiosError, AxiosRequestConfig } from "axios";
import { refreshToken } from "@/services/auth";
import store from "@/store/index";
import Router from "@/router/index";

const config = {
  baseURL: process.env.VUE_APP_API_URI
};
const instance = axios.create(config);

export function setHeaders(token: string): void {
  localStorage.setItem("accessToken", token);
  instance.defaults.headers.common["Authorization"] = "Bearer " + token;
  instance.defaults.headers.common["Accept-Language"] = store.state.userModule?.user?.language;
}

type Callback = (token: string) => void;

let isRefreshing = false;
let subscribers: Callback[] = [];

function subscribeTokenRefresh(cb: Callback): void {
  subscribers.push(cb);
}

function requestNewToken(): void {
  isRefreshing = true;
  const token = localStorage.getItem("accessToken");
  refreshToken(token)
    .then(({ token }) => {
      isRefreshing = false;
      onRefreshed(token);
      setHeaders(token);
      subscribers = [];
    })
    .catch(() => {
      window.localStorage.clear();
      Router.push("/login");
    });
}

function enqueueRequest(originalRequest: AxiosRequestConfig): Promise<unknown> {
  return new Promise((resolve) => {
    subscribeTokenRefresh((token) => {
      originalRequest.headers.Authorization = `Bearer ${token}`;
      resolve(axios(originalRequest));
    });
  });
}

function onRefreshed(token: string): void {
  subscribers.map((cb) => cb(token));
}

instance.interceptors.response.use(undefined, async (error: AxiosError) => {
  const { config } = error;

  const originalRequest = config;

  if (error.response?.status != 401) {
    throw error;
  }

  if (!isRefreshing) {
    requestNewToken();
  }
  return enqueueRequest(originalRequest);
});

instance.interceptors.request.use((request) => {
  if (!request.headers.common["Authorization"]) {
    const token = localStorage.getItem("accessToken");
    if (token) {
      setHeaders(token);
      request.headers.Authorization = "Bearer " + token;
      request.headers["Accept-Language"] = store.state.userModule?.user?.language;
      //TODO: revisar codigo lenguaje/idioma
    }
  }
  return request;
});

export default instance;
