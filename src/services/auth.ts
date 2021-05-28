import axios from "@/plugins/axios";
import httpClient from "axios";
import { RegisterUser } from "@/models/registerUser";

export async function authenticate(firebaseToken: string): Promise<{ token: string }> {
  const response = await axios.post(`/api/auth/login`, { firebaseToken: firebaseToken });
  return response.data;
}

export async function refreshToken(token: string | null): Promise<{ token: string }> {
  const { data } = await httpClient.post<{ token: string }>(`/api/auth/refresh`, null, {
    headers: { authorization: "Bearer " + token }
  });
  return data;
}

export async function register(user: RegisterUser): Promise<{ token: string }> {
  const { data } = await axios.post(`/api/auth/register`, user);
  return data;
}
