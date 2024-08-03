import React,{FC,useState} from "react";
import {useNavigate  } from 'react-router-dom'
import {useDispatch } from "react-redux";
import { setLoginState } from "../../store/features/user";
import {register} from '../../api/api'
import MyForm from './Form'
import { LoginParams } from '@/api/api'

 const Register:FC = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const submit = (state:LoginParams) => {
        // console.log(form.getFieldValue('userName'))
        dispatch(setLoginState(true))
        register(state).then(res => {
            console.log(res)
            if (res.code == 200) {
              navigate('/login',{replace:true})
            }
        }).catch(err => {

        })
        // navigate('/form')
    }
    return <MyForm isSHowRegister={false}  onSubmit={submit}/>
}

export default Register