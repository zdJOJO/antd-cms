import React, { useState, useMemo } from 'react'
import { useHistory } from 'react-router-dom'
import { Layout, Menu, Avatar } from 'antd'
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  SettingOutlined,
  LogoutOutlined
} from '@components/icons/antdIcons';

import HeaderDropdown from './HeaderDropdown';
import { userImg } from '../../../../assets';
import { getRandomName } from '@utils';
import { LOGIN, SETTING } from '@route';
import {
  china,
  england,
  japan
} from '../../../../assets/';

import classes from './index.less'
import { IHeadMenu } from '@types';


interface IHeader {
  collapsed: boolean,
  toggle: () => void
}

const userMenus: Array<IHeadMenu> = [
  {
    key: SETTING,
    label: 'Setting',
    icon: <SettingOutlined />
  },
  {
    key: LOGIN,
    label: 'Sign out',
    icon: <LogoutOutlined />
  }
]

const languageMenus: Array<IHeadMenu> = [
  {
    key: '中文',
    label: '中文',
    local: 'cn',
    icon: <span className={classes.localIcon}><img src={china} /></span>
  },
  {
    key: 'English',
    label: 'English',
    local: 'en',
    icon: <span className={classes.localIcon}><img src={england} /></span>
  },
  {
    key: '日本語',
    label: '日本語',
    local: 'jpn',
    icon: <span className={classes.localIcon}><img src={japan} /></span>
  }
]

const Header: React.FC<IHeader> = ({
  collapsed,
  toggle
}) => {

  const history = useHistory()
  const [language, setLanguage] = useState<string>('English');

  function userMenuClick(e: any) {
    history.push(e.key)
  }

  function languageMenuClick(e: any) {
    setLanguage(e.key)
  }

  const userMenu = useMemo(() => {
    return (
      <Menu onClick={userMenuClick}>
        {
          userMenus.map((item: IHeadMenu) => (
            <Menu.Item key={item.key} icon={item.icon}>
              {item.label}
            </Menu.Item>
          ))
        }
      </Menu>
    )
  }, [])

  const languageMenu = (
    <Menu
      selectedKeys={[language]}
      onClick={languageMenuClick}
    >
      {
        languageMenus.map((item: IHeadMenu) => (
          <Menu.Item key={item.key}>
            {item.label}
          </Menu.Item>
        ))
      }
    </Menu>
  )
  const userName = useMemo(() => {
    return getRandomName()
  }, [])
  return (
    <Layout.Header className={classes.layOutHeader} >
      {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
        className: classes.trigger,
        onClick: toggle
      })}

      {/* 语言切换下拉框 */}
      <HeaderDropdown
        overlayStyle={{ top: 50, width: 150 }}
        className={classes.headerMenu}
        overlay={languageMenu}
      >
        <a
          className={classes.drowdownBtn}
          onClick={e => e.preventDefault()}
          style={{ marginRight: 50 }}
        >
          {languageMenus.filter(i => i.key === language)[0].icon}
        </a>
      </HeaderDropdown>

      {/* 登出下拉框 */}
      <HeaderDropdown
        overlayStyle={{ top: 50, width: 150 }}
        className={classes.headerMenu}
        overlay={userMenu}
      >
        <a className={classes.drowdownBtn} onClick={e => e.preventDefault()}>
          <span style={{ color: '#999', paddingRight: 5 }}> Hi </span>
          <span style={{ padding: '0 10px' }}>{userName}</span>
          <Avatar shape="circle" src={userImg} />
        </a>
      </HeaderDropdown>
    </Layout.Header>
  )
}

export default React.memo(Header)