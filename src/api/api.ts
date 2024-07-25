import axiosInstance from './http';

// 定义接口
export interface rootResponse<T> {
  code: number;
  msg: string;
  data:T
}

export interface loginRes {
  token:string,
  userId:string
}

// 定义接口
export interface Login {
  username: string;
  password: string;
}

// 登录
export const login = async (loginParams:Login): Promise<rootResponse<loginRes>> => {
  return await axiosInstance.post('/auth/login',loginParams);
};

// 注册
export const register = async (loginParams:Login): Promise<rootResponse<loginRes>> => {
  return await axiosInstance.post('/auth/register',loginParams);
};