import React,{FC,useState,useEffect,useCallback} from "react";
import { useNavigate  } from 'react-router-dom'
import { Button, DatePicker, Space, Toast } from 'antd-mobile'
import { useSelector, useDispatch } from "react-redux";
import { rootState } from '@/store/index'
import {getCurrentDate} from '@/utils/index'
import { getBill,BillData } from '@/api/api'
import './index.scss'
import { check } from "prettier";
const MyForm:FC = () => {
    const { isLogin } = useSelector((store:rootState) => store.user)
    const navigate = useNavigate()
    const [visible, setVisible] = useState(false)
    const [date,setDate] = useState<string[]>([])
    const [data,setData] = useState<BillData>({
        total_income:0,
        total_expense:0,
        record:[]
    })

    const checkDate = (v:Date) => {
        setDate(getCurrentDate('yyyy-MM',v).split('-'))
    }
    useEffect(() => {
        setDate(getCurrentDate('yyyy-MM').split('-'))
    },[])
    useEffect(() => {
        if (date.length > 0) {
            fetchBill()
        }
    },[date])
    const fetchBill = () => {
        getBill({year:date[0],month:date[1]}).then(res => {
            if (res.code == 200) {
                console.log(res.data)
                setData(res.data)
            }
        })
    }
    return <div className="">
        <div className="top flex pt-56 padding-horizontal-24 flex-js-betw">
            <div className="date" onClick={() => {setVisible(true)}}>
                <div className="font-small">{date[0]}</div>
                <div className="font-medium">{date[1]}</div>
            </div>
            <div className="">
                <div className="font-small">收入</div>
                <div className="font-medium">{data.total_income}</div>
            </div>
            <div className="">
                <div className="font-small">支出</div>
                <div className="font-medium">{data.total_expense}</div>
            </div>
        </div>
        {/* <div className="font-small">新建账单</div> */}
        {
            data.record.map(item => {
                return <div className="mb-12">
                <div className="flex h-30 flex-ai-center flex-js-betw padding-horizontal-18 font-mini">
                    <div className="flex flex-ai-center">
                        <div className="mr-8">{item.date}</div>
                        <div>{item.day}</div>

                    </div>
                    <div className="flex flex-ai-center">
                        <div className="mr-8">收入：{item.total_income}</div>
                        <div>支出：{item.total_expense}</div>
                    </div>
                </div>
                {
                    item.bills.map(bill => {
                        return <div className="flex h-30 flex-ai-center flex-js-betw padding-horizontal-24 font-medium-16 border-b-0">
                            <div className="flex flex-ai-center">
                                <div className="mr-8">{bill.bill_type}</div>
                                <div>{bill.title}</div>
                            </div>
                            <div>
                                {bill.is_income === 0 ? `-${bill.total}` : bill.total}
                            </div>
                        </div>
                    })
                }
                </div>
            })
        }
        <DatePicker
          visible={visible}
          onClose={() => {
            setVisible(false)
          }}
          precision='month'
          onConfirm={val => {
            checkDate(val)
          }}
        />
    </div>
}

export default MyForm