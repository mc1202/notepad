import React,{FC,useState,useEffect,ReactNode} from "react";
import { NavLink, Route, Routes, useNavigate  } from 'react-router-dom'
import { getBillType, BillTypeRes,addBill} from '@/api/api'
import { Input,Radio, Space,Picker,Button,Toast } from 'antd-mobile'
import FormItem from "@/components/FormItem";
import { deepClone } from '@/utils/index'
import './index.scss'
const MyForm:React.FC = () => {
    interface arrType {
      label:string;
      value:number
    }
    const navigate = useNavigate()
    const [inType, setInType] = useState<arrType[]>([]);
    const [outType, setOutType] = useState<arrType[]>([]);
    const [typevisiblees,setVisible] = useState(false)
    const [val,setVal] = useState<(string | number | null)[]>([1])
    const [text,setText] = useState('')
    const [form,setForm] = useState({
      bill_type_id:1,
      is_income:0,
      total:0,
      title:'',
      remarks:''
    })

    useEffect(() => {
        getBillType().then(res => {
          console.log(res)
          if (res.code == 200) {
            setInType(res.data.filter(item => {
              return item.is_income > 0
            }).map(Item => {
              return {
                label:Item.name,
                value:Item.id
              }
            }))
            setOutType(res.data.filter(item => {
              return item.is_income === 0
            }).map(Item => {
              return {
                label:Item.name,
                value:Item.id
              }
            }))

          }
        })
    },[])
    useEffect(() => {
      if (outType.length || inType.length) {
        setVal(form.is_income === 0 ? [outType[0]?.value] : [inType[0]?.value])
      }

    },[form.is_income])
    useEffect(() => {
      let types = form.is_income === 0 ? outType : inType
      console.log(types)
      if (types.length) {
        setText(types.find(item => {
          return item.value == val[0]
        })?.label as string)
      }
    },[val,outType,inType])
    const setFormData = (type:string,val:unknown) => {
      const obj = JSON.parse(JSON.stringify(form));
		  obj[type] = val;
		  setForm(obj);
    }

    const change = (e:(string | number | null)[]) => {
      console.log(e)
      const obj = JSON.parse(JSON.stringify(form));
		  obj['bill_type_id'] = e[0];
      setForm(obj);
      setVal(e)
    }

    const save = () => {
      addBill(form).then(res => {
        Toast.show({
          content: res.msg,
        })
        if (res.code == 200) {
          navigate(-1)
        }
      }).catch(err => {
        console.log(err)
      })
    }
    function ItemNode(type:number):ReactNode {
      if (type == 1) {
        return <Radio.Group defaultValue={form.is_income} onChange={(e) => {setFormData('is_income',e)}}>
              <Space>
                <Radio value={0}>支出</Radio>
                <Radio value={1}>收入</Radio>
              </Space>
            </Radio.Group>
      } else if (type == 2) {
        return <div className="font-medium" onClick={() => {setVisible(true)}}>{text}</div>
      } else if (type == 3) {
        return <Input type="number" onChange={v => {setFormData('total',Number(v))}} value={form.total + ''} placeholder="请输入金额"></Input>
      } else if (type == 4) {
        return <Input type="text" onChange={v => {setFormData('title',v)}} value={form.title} placeholder="请输入标题"></Input>
      }

    }
    return <>
        <FormItem title="账单类别" children={ItemNode(1)} />
        <FormItem title="账单类型" children={ItemNode(2)} />
        <FormItem title="金额" children={ItemNode(3)} />
        <FormItem title="标题" children={ItemNode(4)} />
        <Button block color='primary' size='large' onClick={save}>
          保存
        </Button>
        <Picker
        columns={form.is_income === 0 ? [outType] : [inType]}
        visible={typevisiblees}
        onClose={() => {
          setVisible(false)
        }}
        value={val}
        onConfirm={v => {
          change(v)
        }}
      />
    </>
}

export default MyForm