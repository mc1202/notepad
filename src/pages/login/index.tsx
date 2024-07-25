import React,{FC,useState} from "react";
import { useNavigate  } from 'react-router-dom'
import { Badge,Button, TabBar,Input,Form } from 'antd-mobile'
import  './index.scss'
import { useSelector, useDispatch } from "react-redux";
import { setLoginState } from "@/store/features/user";
import {login} from '@/api/api'
import { TOKEN_KEY,USER_INFO_KEY } from '@/enums/cacheEnum';
import { setCache } from '@/utils/cache'

const Login:React.FC = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [account,setAccount] = useState('')
    const [form] = Form.useForm()
    const getFooter = () => {
        return <Button onClick={submit} block color='primary' size='large'>
          登录
        </Button>
    }
    const submit = () => {
        // console.log(form.getFieldValue('userName'))

        login({
            username:form.getFieldValue('userName'),
            password:form.getFieldValue('userPwd')
        }).then(res => {
            console.log(res)
            if (res.code == 200) {
                dispatch(setLoginState(true))
                setCache(TOKEN_KEY,res.data.token)
                const {token,...info} = res.data
                setCache(USER_INFO_KEY,info)
                navigate('/form')
            }
        }).catch(err => {

        })
    }
    const navigateRegister = () => {
      navigate('/register',{replace:true})
    }
    return <div className="container">
        <Form form={form} layout='horizontal' footer={getFooter()} >
          <Form.Item name="userName" label='用户名'>
            <Input placeholder='请输入用户名' clearable />
          </Form.Item>
          <Form.Item name="userPwd" label='密码'>
            <Input placeholder='请输入密码' clearable type='password' />
          </Form.Item>
        </Form>
        <div onClick={navigateRegister}>去注册</div>

    </div>
}

export default Login