import React,{FC,useState,useEffect,useCallback} from "react";
import { useNavigate  } from 'react-router-dom'
import { Button, DatePicker, Space, Toast } from 'antd-mobile'
import { useSelector, useDispatch } from "react-redux";
import { rootState } from '@/store/index'
import {getCurrentDate} from '@/utils/index'
import './index.scss'
const MyForm:FC = () => {
    const { isLogin } = useSelector((store:rootState) => store.user)
    const navigate = useNavigate()
    const [visible, setVisible] = useState(false)
    const [date,setDate] = useState(['0','0'])
    const [data,setData] = useState({
        income:0,
        expenditure:0
    })
    useEffect(() => {
        console.log(getCurrentDate('yyyy-MM'))
        setDate(getCurrentDate('yyyy-MM').split('-'))

    },[])
    return <div className="">
        <div className="top flex pt-56 padding-horizontal-24 flex-js-betw">
            <div className="date" onClick={() => {setVisible(true)}}>
                <div className="font-small">{date[0]}</div>
                <div className="font-medium">{date[1]}</div>
            </div>
            <div className="">
                <div className="font-small">收入</div>
                <div className="font-medium">{data.income}</div>
            </div>
            <div className="">
                <div className="font-small">支出</div>
                <div className="font-medium">{data.expenditure}</div>
            </div>
        </div>
        <div className="font-small">新建账单</div>
        <DatePicker
          visible={visible}
          onClose={() => {
            setVisible(false)
          }}
          precision='month'
          onConfirm={val => {
            Toast.show(val.toString())
          }}
        />
    </div>
}

export default MyForm