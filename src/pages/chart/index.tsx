import React,{FC,useState,useEffect,ReactNode} from "react";
// import { NavLink, Route, Routes, useNavigate  } from 'react-router-dom';
import { CapsuleTabs  } from 'antd-mobile'
import EChartsComponent from '@/components/ECharts'
import { EChartsOption } from 'echarts';
import { getBillsByDateType,BillDateRes } from '@/api/api'
const MyChart:FC = () => {
    const [data, setData] = useState<BillDateRes>({
        series:[0],
        xAxis:['']
    })
    const option: EChartsOption = {
        title: {
            text: '',
        },
        tooltip: {},
        xAxis: {
            type: 'category',  // 添加 type 属性
            data: data.xAxis,
        },
        yAxis: {
            type: 'value',  // 添加 type 属性
        },
        series: [
            {
                name: 'Sales',
                type: 'bar',
                data: data.series.map((amount, index) => ({
                    value: amount,
                    itemStyle: {
                        color: getColorByIndex(index) // 设置颜色
                    }
                })),
            },
        ],
    };
    function getColorByIndex(index:number) {
        const colors = ['#5470C6', '#91CC75', '#EE6666', '#FAC858', '#73C0DE', '#3BA272', '#FC8452', '#9A60B4', '#EA7CCC'];
        return colors[index % colors.length];
    }
    useEffect(() => {
        getBillsByDateType({is_income:0,dateType:'month'}).then(res => {
            if (res.code == 200) {
                setData(res.data)
            }
        })
    },[])
    return  <div className="overflow-y-scroll">
        <div className="bg-y flex pt-56 padding-horizontal-24 flex-js-betw">
            <CapsuleTabs>
                <CapsuleTabs.Tab title='支出' key={0}>
                </CapsuleTabs.Tab>
                <CapsuleTabs.Tab title='收入' key={1}>
                </CapsuleTabs.Tab>
            </CapsuleTabs>
            <CapsuleTabs>
                <CapsuleTabs.Tab title='年' key='fruits'>
                </CapsuleTabs.Tab>
                <CapsuleTabs.Tab title='月' key='vegetables'>
                </CapsuleTabs.Tab>
                <CapsuleTabs.Tab title='周' key='animals'>
                </CapsuleTabs.Tab>
            </CapsuleTabs>
        </div>
        <EChartsComponent option={option} style={{ height: '70vh', width: '100%',paddingLeft:'24px',boxSizing:'border-box' }} />

        </div>

}

export default MyChart