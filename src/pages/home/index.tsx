import React, { FC, useState, useEffect, useCallback } from "react";
import { useNavigate } from 'react-router-dom';
import { Button, DatePicker, Space, Toast } from 'antd-mobile';
import { useSelector } from "react-redux";
import { rootState } from '@/store/index';
import { getCurrentDate } from '@/utils/index';
import { getBill, BillData } from '@/api/api';
import useLongPress from '@/hooks/useLongPress';
import './index.scss';

const MyForm: FC = () => {
    const { isLogin } = useSelector((store: rootState) => store.user);
    const navigate = useNavigate();
    const [visible, setVisible] = useState(false);
    const [date, setDate] = useState<string[]>([]);
    const [data, setData] = useState<BillData>({
        total_income: 0,
        total_expense: 0,
        record: []
    });

    const checkDate = (v: Date) => {
        setDate(getCurrentDate('yyyy-MM', v).split('-'));
    };
    const handleLongPress = (id?: number) => {
        console.log(id)
        
    };

    const ref = useLongPress(handleLongPress, 500);

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

    return (
        <div>
            <div className="top flex pt-56 padding-horizontal-24 flex-js-betw">
                <div className="date" onClick={() => { setVisible(true); }}>
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
                            <div key={bill.id} className="padding-horizontal-24 font-medium-16" ref={ref} data-id={bill.id} onClick={() => { navigateDetail(bill.id); }}>
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
                visible={visible}
                onClose={() => { setVisible(false); }}
                precision='month'
                onConfirm={checkDate}
            />
        </div>
    );
};

export default MyForm;
