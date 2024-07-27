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

//获取账单类型

export interface BillTypeRes {
  id:number,
  name:string,
  is_income:number
}
export interface BillTypeRes {
  id:number,
  name:string,
  is_income:number
}

export interface BillAdd {
  bill_type_id:number,
  is_income:number,
  total:number
}
export const getBillType = async (): Promise<rootResponse<BillTypeRes[]>> => {
  return await axiosInstance.get('/bill/getBillType');
};

export const addBill = async (addBillParams:BillAdd): Promise<rootResponse<null>> => {
  return await axiosInstance.post('/bill/add',addBillParams);
};