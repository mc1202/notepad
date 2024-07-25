import { Badge,Button, TabBar,Input,Form } from 'antd-mobile'
import {
  AppOutline,
  MessageOutline,
  MessageFill,
  UnorderedListOutline,
  UserOutline,
} from 'antd-mobile-icons'

import './index.scss'

export default () => {
    const tabs = [
    {
      key: '/home',
      title: '首页',
      icon: <AppOutline />,
      badge: Badge.dot,
    },
    {
      key: '/mine',
      title: '我的',
      icon: <UserOutline />,
    },
  ]

  return <>
    <TabBar>
          {tabs.map(item => (
            <TabBar.Item key={item.key} icon={item.icon} title={item.title} />
          ))}
        </TabBar>
   </>
}