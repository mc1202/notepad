import { createSlice } from "@reduxjs/toolkit";

export interface userState {
    name:string,
    sex:number,
    age:number,
    isLogin:boolean
}

const initialState : userState = {
    name:'meihao',
    sex:1,
    age:26,
    isLogin:false
}

export const userSlice = createSlice({
    name:'user',
    initialState,
    reducers: {
        setUserState:(state:Pick<userState,'name'>) => {
            state.name = state.name
        },
        setLoginState:(state:userState,{payload}) => {
            state.isLogin = payload
        }
    }
})

export const { setUserState,setLoginState } = userSlice.actions

export default userSlice.reducer