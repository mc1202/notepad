import React,{FC,useState} from "react";
import { NavLink, Route, Routes, useNavigate  } from 'react-router-dom'
import { Badge,Button, TabBar,Input,Form } from 'antd-mobile'
import style from './index.scss'
import { useSelector, useDispatch } from "react-redux";
import { setLoginState } from "../../store/features/user";
import {login} from '../../api/api'
import {
  AppOutline,
  MessageOutline,
  MessageFill,
  UnorderedListOutline,
  UserOutline,
} from 'antd-mobile-icons'
const Login:React.FC = () => {
    const tabs = [
    {
      key: 'home',
      title: '首页',
      icon: <AppOutline />,
      badge: Badge.dot,
    },
    {
      key: 'todo',
      title: '待办',
      icon: <UnorderedListOutline />,
      badge: '5',
    },
    {
      key: 'message',
      title: '消息',
      icon: (active: boolean) =>
        active ? <MessageFill /> : <MessageOutline />,
      badge: '99+',
    },
    {
      key: 'personalCenter',
      title: '我的',
      icon: <UserOutline />,
    },
  ]
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
            userName:form.getFieldValue('userName'),
            userPwd:form.getFieldValue('userPwd')
        }).then(res => {
            console.log(res)
            if (res.code == 200) {
                dispatch(setLoginState(true))
                navigate('/form')
            }
        }).catch(err => {

        })
    }
    return <div className={style.container}>
        <Form form={form} layout='horizontal' footer={getFooter()} >
          <Form.Item name="userName" label='用户名'>
            <Input placeholder='请输入用户名' clearable />
          </Form.Item>
          <Form.Item name="userPwd" label='密码'>
            <Input placeholder='请输入密码' clearable type='password' />
          </Form.Item>
        </Form>
        {/* <TabBar>
          {tabs.map(item => (
            <TabBar.Item key={item.key} icon={item.icon} title={item.title} />
          ))}
        </TabBar> */}
    </div>
}

export default Login