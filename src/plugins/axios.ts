import axios from "axios";
import store from "@/store";

const config = {
  baseURL: process.env.apiURL
};
const instance = axios.create(config);

export default instance;
