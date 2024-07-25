import React,{FC,useState,useEffect,useCallback} from "react";
import { useNavigate  } from 'react-router-dom'
import { useSelector, useDispatch } from "react-redux";
import { rootState } from '../../store/index'
const MyForm:FC = () => {
    const { isLogin } = useSelector((store:rootState) => store.user)
    const navigate = useNavigate()
    useEffect(() => {
        console.log(isLogin)
        // if (!isLogin) {
        //     navigate('/login')
        // }
    },[])

    const route = useCallback(() => {
        navigate('/list',{state:{id:1}})
    },[])
    return <div onClick={route}>
        我是form
    </div>
}

export default MyForm