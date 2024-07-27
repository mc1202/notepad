import axios from "axios";
import { getCache } from '@/utils/cache';
import { TOKEN_KEY } from '@/enums/cacheEnum';
// import {} from 'react-router-dom'
import { useSelector, useDispatch } from "react-redux";
import { rootState } from '@/store/index'
const axiosInstance = axios.create({
    baseURL:'http://127.0.0.1:3002',
    timeout:10000,
    headers:{'Content-Type': 'application/json'}
})


// 请求拦截器
axiosInstance.interceptors.request.use(
  (config) => {
    const token = getCache(TOKEN_KEY);
    if (token) {
      config.headers.token = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 响应拦截器
axiosInstance.interceptors.response.use(
  (response) => {
    // console.log(response)
    return response.data;
  },
  (error) => {
    // console.log(error)
    if (error.response.status == 401) {
        window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default axiosInstance