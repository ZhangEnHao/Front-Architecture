import axios from "axios";
import { BASE_URL } from "./http";

// create an axios instance
const service = axios.create({
  baseURL: BASE_URL, // url = base url + request url
  withCredentials: true, // send cookies when cross-domain requests（是否支持跨域）
  timeout: 5000, // request timeout（超时时间）
});

// request interceptor（请求拦截器）
service.interceptors.request.use(
  (config) => {
    // do something before request is sent
    return config;
  },
  (error) => {
    // do something with request error
    // console.log(error) // for debug
    return Promise.reject(error);
  }
);

// response interceptor（响应拦截器）
service.interceptors.response.use(
  (response) => {
    const res = response.data;
    return res;
  },
  (error) => {
    if (error.response) {
      // console.log('err' + error) // for debug
      switch (error.response.status) {
        // 不同状态码下执行不同操作
        case 401:
          break;
        case 404:
          break;
        case 500:
          break;
        default:
      }
    }
    return Promise.reject(error);
  }
);

export default service;
