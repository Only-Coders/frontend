import axios from "@/plugins/axios";
import store from "@/store";
import jwtDecode from "jwt-decode";

export async function authenticate(firebaseToken: string): Promise<{ token: string }> {
  const response = await axios.post(`/api/auth/login`, { firebaseToken: firebaseToken });
  return response.data;
}

export async function refreshToken(): Promise<{ token: string }> {
  const { data } = await axios.post(`/api/auth/refresh`);
  return data;
}

/* export async function authenticate(
  user: {
    ci: number;
    password: string;
  },
  universityId: string
): Promise<{ accessToken: string; refreshToken: string }> {
  const response = await axios.post(`/api/Auth/${universityId}/login`, user);
  return response.data;
}
 */
