import React from "react";
import { Navigate,useRoutes } from "react-router-dom";
import MyForm from '../pages/form/index'
import MyList from '../pages/list/index'
import Login from '../pages/login/index'
import Register from '../pages/register/index'


const routes = [
    {
        path:'/',
        element: <Navigate to='/form' />
    },
    {
        path:'/form',
        element: <MyForm />,
        children:[

        ]
    },
    {
        path:'/list',
        element: <MyList />,
        children:[

        ]
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
        children:[

        ]
    }
]

export default routes