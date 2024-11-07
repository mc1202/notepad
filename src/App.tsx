import {
  useRoutes,
  RouteObject
} from "react-router-dom";
import { useDispatch } from "react-redux";
import React, { useEffect } from "react";
import { AliveScope, KeepAlive } from 'react-activation';
import { TOKEN_KEY } from '@/enums/cacheEnum';
import { getCache } from '@/utils/cache';
import { setLoginState } from "@/store/features/user";
import '@/App.scss';
import WithTabBar from '@/components/WithTabBar';
import { RouteConfig } from '@/router/index';
import routes from './router';

const AppRoutes = () => {
  const renderRoutes = (routes: RouteConfig[]): RouteObject[] => {
    return routes.map((route) => {
      const { path,children = []} = route;

      return {
        path,
        element: renderElement(route),
        children: children.length ? renderRoutes(children) : [],
      };
    });
  };

  const renderElement = (route: RouteConfig) => {
    const { element, showTabBar = false, meta,path } = route;
    const content = (
      <WithTabBar showTabBar={showTabBar}>
        {element}
      </WithTabBar>
    );

    return meta?.keepAlive ? <KeepAlive id={path}>{content}</KeepAlive> : content;
  };

  return useRoutes(renderRoutes(routes));
}

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setLoginState(getCache(TOKEN_KEY) ? true : false));
  }, [dispatch]);

  return (
    <> 
      {AppRoutes()}
    </>
  );
}

export default App;
