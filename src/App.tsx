import {
  useRoutes,
  RouteObject
} from "react-router-dom";
import { useDispatch } from "react-redux";
import React,{FC,useState,useEffect,useCallback} from "react";

import { TOKEN_KEY } from '@/enums/cacheEnum';
import { getCache } from '@/utils/cache'
import { setLoginState } from "@/store/features/user";

import '@/App.scss';
import WithTabBar from '@/components/WithTabBar';
import { RouteConfig } from '@/router/index'
import routes from './router'
const AppRoutes = () => {
  // console.log(process.env,'process.env')
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
      <> 
        {AppRoutes()}
      </>



  );
}

export default App;
