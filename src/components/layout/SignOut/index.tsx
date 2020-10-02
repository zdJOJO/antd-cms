import React, { useState, useMemo } from 'react'
import { useHistory } from 'react-router-dom';
import { Layout, Menu, Avatar } from 'antd'

import { userImg } from '../../../../assets';
import { getRandomName } from '@utils';
import { LOGIN } from '@route';

import './index.less';

const { SubMenu } = Menu

interface Ilanguage {
  key: string
  title: string
  flag?: any
}

const languages = [
  {
    key: "cn",
    title: "中文"
  },
  {
    key: "en",
    title: "English"
  }
]

interface ISignout { }

const SignOut: React.FC<ISignout> = ({
  ...props
}) => {

  const history = useHistory();

  const [language, setLanguage] = useState<string>('cn');

  const userName = useMemo(() => {
    return getRandomName()
  }, [])

  // 退出登录
  function signout(e: any) {
    if (e.key === 'signOut') {
      history.push(LOGIN)
    }
  }

  //选择语言
  function hangleChangeLanguage({ item, key, keyPath, domEvent }: any) {
    setLanguage(key)
  }

  const languageTitle = languages.filter(i => i.key === language)[0].title
  return (
    <span className="signout">
      {/* 语言菜单 */}
      <Menu
        selectedKeys={[language]}
        onClick={hangleChangeLanguage}
        mode="horizontal"
      >
        <SubMenu
          title={languageTitle}
        >
          {languages.map((lan: Ilanguage) => (
            <Menu.Item key={lan.key}>
              {lan.title}
            </Menu.Item>
          ))}
        </SubMenu>
      </Menu>
      {/* 登陆用户问候语 */}
      <Menu key="user" mode="horizontal" onClick={signout}>
        <SubMenu
          title={
            <>
              <span style={{ color: '#999', paddingRight: 5 }}> Hi </span>
              <span style={{ paddingRight: 5 }}>{userName}</span>
              <Avatar src={userImg} />
            </>
          }
        >
          <Menu.Item key="signOut">Sign out</Menu.Item>
        </SubMenu>
      </Menu>
    </span>
  )
}

export default React.memo(SignOut)