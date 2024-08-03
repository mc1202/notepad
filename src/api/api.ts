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
export interface LoginParams {
  username: string;
  password: string;
}

// 登录
export const login = async (loginParams:LoginParams): Promise<rootResponse<loginRes>> => {
  return await axiosInstance.post('/auth/login',loginParams);
};

// 注册
export const register = async (loginParams:LoginParams): Promise<rootResponse<loginRes>> => {
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

export interface Bill {
  id:number,
  user_id:number,
  total:number,
  title:string,
  bill_type_id:number,
  bill_type:string,
  remarks:string | null,
  is_income:number,
  created_at:string,
  updated_at:string
}

export interface BillRecord {
  date: string;
  day:string;
  total_income: number;
  total_expense: number;
  bills: Bill[];
}

export interface BillData {
  total_income: number;
  total_expense: number;
  record: BillRecord[];
}

export interface getBillParams {
  year?:string,
  month?:string
}

export interface BillDate {
  is_income:number,
  dateType:string
}
export interface BillDateRes {
  series:Array<number>,
  xAxis:Array<string>,
}
export const getBillType = async (): Promise<rootResponse<BillTypeRes[]>> => {
  return await axiosInstance.get('/bill/getBillType');
};

export const addBill = async (addBillParams:BillAdd): Promise<rootResponse<null>> => {
  return await axiosInstance.post('/bill/add',addBillParams);
};

export const getBill = async (getBillParams:getBillParams): Promise<rootResponse<BillData>> => {
  return await axiosInstance.post('/bill/getBill',getBillParams);
};

export const getBillsByDateType = async (params:BillDate): Promise<rootResponse<BillDateRes>> => {
  return await axiosInstance.post('/bill/getBillsByDateType',params);
};