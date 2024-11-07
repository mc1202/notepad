import React from "react";
import { Navigate,useRoutes } from "react-router-dom";
import MyHome from '@/pages/home/index'
import MyList from '@/pages/list/index'
import Login from '@/pages/login/login'
import Register from '@/pages/login/register'
import MyForm from '@/pages/form/index'
import MyChart from '@/pages/chart/index'
import Mine from '@/pages/mine/index'


export interface RouteConfig {
  path: string;
  element: React.ReactNode;
  showTabBar?: boolean;
  children?:RouteConfig[];
  meta?:{
    keepAlive:Boolean
  }
}

const routes:RouteConfig[] = [
    {
        path:'/',
        element: <Navigate to='/home' />
    },
    {
        path:'/home',
        element: <MyHome />,
        showTabBar:true,
        meta:{
            keepAlive:true
        }
    },
    {
        path:'/form/:id?',
        element: <MyForm />,
        meta:{
            keepAlive:true
        }
    },
    {
        path:'/chart',
        element: <MyChart />,
        showTabBar:true,
        meta:{
            keepAlive:true
        }
    },
     {
        path:'/mine',
        element: <Mine />,
        showTabBar:true
    },
    {
        path:'/list',
        element: <MyList />,
    },
    {
        path:'/login',
        element: <Login />,
        children:[

        ]
    },
    {
        path:'/register',
        element: <Register />,
    }
]

export default routes