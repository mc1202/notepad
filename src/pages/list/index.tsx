import React,{FC,useState} from "react";
import { NavLink, Route, Routes, useNavigate  } from 'react-router-dom'

const MyList:React.FC = () => {
    const navigate = useNavigate()
    const routeBack = () => {
        navigate(-1)
    }
    return <div onClick={routeBack}>
        我是list
    </div>
}

export default MyList