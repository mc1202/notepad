import { Badge,Button, TabBar,Input,Form } from 'antd-mobile'
import {
  AppOutline,
  ReceivePaymentOutline,
  UserOutline,
} from 'antd-mobile-icons'
import path from 'path/posix'
import { useNavigate,useLocation  } from 'react-router-dom'

import './index.scss'

export default () => {
    const location = useLocation()
    const navigate = useNavigate()
    console.log(location.pathname)
    const { pathname } = location
    const tabs = [
    {
      key: '/home',
      title: '首页',
      icon: <AppOutline />,
      badge: Badge.dot,
    },
     {
      key: '/chart',
      title: '图表',
      icon: <ReceivePaymentOutline />,
      badge: Badge.dot,
    },
    {
      key: '/mine',
      title: '我的',
      icon: <UserOutline />,
    },
  ]
  const setRouteActive = (value: string) => {
    navigate(value)
  }

  return <>
    <TabBar activeKey={pathname} onChange={value => setRouteActive(value)}>
          {tabs.map(item => (
            <TabBar.Item key={item.key} icon={item.icon} title={item.title} />
          ))}
        </TabBar>
   </>
}