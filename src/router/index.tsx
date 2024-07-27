import React from "react";
import { Navigate,useRoutes } from "react-router-dom";
import MyHome from '@/pages/home/index'
import MyList from '@/pages/list/index'
import Login from '@/pages/login/index'
import Register from '@/pages/register/index'
import MyForm from '@/pages/form/index'

export interface RouteConfig {
  path: string;
  element: React.ReactNode;
  showTabBar?: boolean;
  children?:RouteConfig[]
}

const routes:RouteConfig[] = [
    {
        path:'/',
        element: <Navigate to='/home' />
    },
    {
        path:'/home',
        element: <MyHome />,
        showTabBar:true
    },
    {
        path:'/form',
        element: <MyForm />,
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