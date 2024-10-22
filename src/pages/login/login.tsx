import React,{FC,useState} from "react";
import { useNavigate  } from 'react-router-dom'
import { Badge,Button, TabBar,Input } from 'antd-mobile'
import  './index.scss'
import { useSelector, useDispatch } from "react-redux";
import { setLoginState } from "@/store/features/user";
import {login} from '@/api/api'
import { TOKEN_KEY,USER_INFO_KEY } from '@/enums/cacheEnum';
import { setCache } from '@/utils/cache'
import MyForm from './Form'
import { LoginParams } from '@/api/api'

const Login:React.FC = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const submit = (state:LoginParams) => {
        // console.log(form.getFieldValue('userName'))

        login(state).then(res => {
            console.log(res)
            if (res.code == 200) {
                dispatch(setLoginState(true))
                setCache(TOKEN_KEY,res.data.token)
                const {token,...info} = res.data
                setCache(USER_INFO_KEY,info)
                navigate('/home')
            }
        }).catch(err => {

        })
    }
    return <MyForm isRegister={false}  onSubmit={submit}/>
}

export default Login