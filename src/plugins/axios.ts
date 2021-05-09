import axios from "axios";
import store from "@/store";

const config = {
  //baseURL: /* process.env.baseURL || process.env.apiURL ||  */ "https://api.onlycoders.tech/"
  baseURL: /* process.env.baseURL || process.env.apiURL ||  */ "http://190.135.20.252:9000/"
};
const instance = axios.create(config);

export default instance;
