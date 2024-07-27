import React,{ReactNode} from 'react'
import './index.scss'
interface Props {
  title: string;
  children: ReactNode;
}
const FormItem: React.FC<Props> = ({ title, children }) => {


  return <>
    <div className="flex flex-ai-center padding-horizontal-24 pt-24">
            <div className="font-medium pr-12 title">{title}</div>
            {children}
        </div>
   </>
}

export default FormItem