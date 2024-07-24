import React,{FC,useState} from "react";
import { NavLink, Route, Routes, useNavigate  } from 'react-router-dom'
import { Badge,Button, TabBar,Input,Form } from 'antd-mobile'
import style from './index.scss'
import { useSelector, useDispatch } from "react-redux";
import { setLoginState } from "../../store/features/user";
import {register} from '../../api/api'

 const Register:React.FC = () => {
    const dispatch = useDispatch()
    const [form] = Form.useForm()
    const getFooter = () => {
        return <Button onClick={submit} block color='primary' size='large'>
          注册
        </Button>
    }
     const submit = () => {
        // console.log(form.getFieldValue('userName'))
        dispatch(setLoginState(true))
        register({
            userName:form.getFieldValue('userName'),
            userPwd:form.getFieldValue('userPwd')
        }).then(res => {
            console.log(res)
            if (res.code == 200) {
            }
        }).catch(err => {

        })
        // navigate('/form')
    }
    return <Form form={form} layout='horizontal' footer={getFooter()} >
          <Form.Item name="userName" label='用户名'>
            <Input placeholder='请输入用户名' clearable />
          </Form.Item>
          <Form.Item name="userPwd" label='密码'>
            <Input placeholder='请输入密码' clearable type='password' />
          </Form.Item>
        </Form>
}

export default Register