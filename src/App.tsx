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
import '@/assets/app.scss'
import WithTabBar from '@/components/WithTabBar';
import { RouteConfig } from '@/router/index'
import routes from './router'
const AppRoutes = () => {
  const renderRoutes = (routes: RouteConfig[]):RouteObject[] => {
    return routes.map((route) => {
      const { path, element, showTabBar = false, children = [] } = route;

      return {
        path,
        element: (
          <WithTabBar showTabBar={showTabBar}>
            {element}
          </WithTabBar>
        ),
        children: children.length ? renderRoutes(children) : [],
      };
    });
  };

  return useRoutes(renderRoutes(routes));
}
function App() {
  const dispatch = useDispatch()
  useEffect(() => {
      dispatch(setLoginState(getCache(TOKEN_KEY) ? true : false))
  },[])
  return (
      <> {/* 确保 div 标签正确闭合 */}
        {AppRoutes()}
      </>



  );
}

export default App;
