import React,{FC,useState} from "react";
import { Button,Input } from 'antd-mobile'
import { useNavigate  } from 'react-router-dom'
import  useInput  from '@/hooks/useInput'
import { LoginParams } from '@/api/api'

interface params {
    isSHowRegister:boolean,
    onSubmit:(state:LoginParams) => void
}
const MyForm:React.FC<params> = ({isSHowRegister,onSubmit}) => {
    const navigate = useNavigate()
    const initialState = { username: '', password: '' };
    const { state, handleChange } = useInput(initialState);
    const getFooter = () => {
        return <Button onClick={submit} block color='primary' size='large'>
          登录
        </Button>
    }
    const submit = () => {
        // console.log(form.getFieldValue('userName'))
        onSubmit(state)
    }
    const navigateRegister = () => {
      navigate('/register',{replace:true})
    }
    return <div className="container">
        <div className="_item">
          <div>用户名</div>
          <Input placeholder='请输入用户名' clearable type='text' value={state.username}
            onChange={(e) => handleChange(e,'username')} />
        </div>
        <div className="_item">
          <div>密码</div>
          <Input placeholder='请输入密码' clearable type='password' value={state.password} onChange={(e) => handleChange(e,'password')}/>
        </div>
        {isSHowRegister && <div className="navigateText" onClick={navigateRegister}>去注册{'>>>'}</div>}
        {getFooter()}
    </div>
}

export default MyForm