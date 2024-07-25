import {
  useRoutes,
  RouteObject
} from "react-router-dom";
import { useDispatch } from "react-redux";
import React,{FC,useState,useEffect,useCallback} from "react";

import { TOKEN_KEY } from '@/enums/cacheEnum';
import { getCache } from '@/utils/cache'
import { setLoginState } from "@/store/features/user";

import '@/App.css';

import TabBar from '@/components/TabBar';
import routes from './router'
const AppRoutes = () => {
  const myroutes = useRoutes(routes as RouteObject[])
  return myroutes
}
function App() {
  const dispatch = useDispatch()
  useEffect(() => {
      dispatch(setLoginState(getCache(TOKEN_KEY) ? true : false))
  },[])
  return (
      <> {/* 确保 div 标签正确闭合 */}
        {AppRoutes()}
        <TabBar></TabBar>
      </>



  );
}

export default App;
