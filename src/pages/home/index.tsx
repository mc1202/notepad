import React, { FC, useState, useEffect,useRef, useCallback,useLayoutEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { useActivate, useUnactivate } from 'react-activation';
import { DatePicker, ActionSheet, Toast } from 'antd-mobile';
import type {
    Action,
    ActionSheetShowHandler,
  } from 'antd-mobile/es/components/action-sheet'
import { useSelector } from "react-redux";
import { rootState } from '@/store/index';
import { getCurrentDate } from '@/utils/index';
import { getBill, BillData } from '@/api/api';
import useLongPress from '@/hooks/useLongPress';
import './index.scss';

const MyForm: FC = () => {
    const { isLogin } = useSelector((store: rootState) => store.user);
    const navigate = useNavigate();
    const [DatePickerVisible, setDatePickerVisible] = useState(false);
    const [actionSheetVisible, setactionSheetVisible] = useState(false);
    const [date, setDate] = useState<string[]>([]);
    const [data, setData] = useState<BillData>({
        total_income: 0,
        total_expense: 0,
        record: []
    });
    const selectedBillRef = useRef({ id: '', date: '' });

    const actions: Action[] = [
        { text: '复制', key: 'copy' },
        {
          text: '删除',
          key: 'delete',
          description: '删除后数据不可恢复',
          danger: true,
          bold: true,
        },
      ]

    const checkDate = (v: Date) => {
        setDate(getCurrentDate('yyyy-MM', v).split('-'));
    };
    useActivate(() => {
        console.log('useActivate')
    })
    const handleLongPress = (data?:DOMStringMap) => {
        // console.log(data)
        if (!data) return
        const id = data.id as string
        const date = data.date as string
        selectedBillRef.current = { id, date };
        setactionSheetVisible(true)

    };

    useEffect(() => {
        setDate(getCurrentDate('yyyy-MM').split('-'));
    }, []);

    const fetchBill = useCallback(() => {
        getBill({ year: date[0], month: date[1] })
            .then(res => {
                if (res.code === 200) {
                    setData(res.data);
                }
            })
            .catch(err => {
                console.error("获取账单失败", err);
                Toast.show({ content: '获取账单失败，请重试' });
            });
    }, [date]);
    const ref = useLongPress(handleLongPress, 500);
    // console.log(ref.current)

    // useEffect(() => {
    // },[data])
    useEffect(() => {
        if (date.length > 0) {
            fetchBill();
        }
    }, [date, fetchBill]);

    const navigateForm = () => {
        navigate(isLogin ? '/form' : '/login');
    };

    const navigateDetail = (e: number) => {
        navigate(`/form/${e}`);
    };
    const deleteBill = () => {
        const {id,date} = selectedBillRef.current
        setData((prevData) => {
            const updatedRecords =  prevData.record.map(item => {
                if (item.date == date) {
                    const updatedBills = item.bills.filter(bill => (bill.id) !== Number(id))
                    return {...item,bills:updatedBills}
                }
                return item
            }).filter(item => item.bills.length > 0)
            return {...prevData,record:updatedRecords}
        })
    }
    const action = (e:Action) => {
        console.log(e)
        if (e.key = 'delete') {
            deleteBill()
        }
    }

    return (
        <div>
            <div className="top flex pt-56 padding-horizontal-24 flex-js-betw">
                <div className="date" onClick={() => { setDatePickerVisible(true); }}>
                    <div className="font-small">{date[0]}</div>
                    <div className="font-medium">{date[1]}</div>
                </div>
                <div>
                    <div className="font-small">收入</div>
                    <div className="font-medium">{data.total_income}</div>
                </div>
                <div>
                    <div className="font-small">支出</div>
                    <div className="font-medium">{data.total_expense}</div>
                </div>
            </div>
            <div className="font-small padding-horizontal-18 addBtn" onClick={navigateForm}>新建账单</div>
            {data.record.length === 0 ? (
                <div className="no-record pt-24">暂无账单</div>
            ) : (
                data.record.map(item => (
                    <div key={item.date} className="mb-12">
                        <div className="flex flex-ai-center flex-js-betw padding-horizontal-18 font-mini">
                            <div className="flex flex-ai-center">
                                <div className="mr-8">{item.date}</div>
                                <div>{item.day}</div>
                            </div>
                            <div className="flex flex-ai-center">
                                <div className="mr-8">收入：{item.total_income}</div>
                                <div>支出：{item.total_expense}</div>
                            </div>
                        </div>
                        {item.bills.map(bill => (
                            <div key={bill.id} className="padding-horizontal-24 font-medium-16" ref={el => ref(el)} data-id={bill.id} data-date={item.date} onClick={() => { navigateDetail(bill.id); }}>
                                <div className="flex flex-ai-center flex-js-betw p-vertical-12 border-b-0">
                                    <div className="flex flex-ai-center">
                                        <div className="mr-8">{bill.bill_type}</div>
                                        <div>{bill.title}</div>
                                    </div>
                                    <div>
                                        {bill.is_income === 0 ? `-${bill.total}` : bill.total}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ))
            )}
            <DatePicker
                visible={DatePickerVisible}
                onClose={() => { setDatePickerVisible(false); }}
                precision='month'
                onConfirm={checkDate}
            />
            <ActionSheet
                visible={actionSheetVisible}
                actions={actions}
                cancelText="取消"
                onAction={action}
                closeOnAction={true}
                onClose={() => setactionSheetVisible(false)}
            />
        </div>
    );
};

export default MyForm;
