
import React, { useState } from 'react'
import { useHistory, useLocation } from 'react-router-dom'

import { Layout, Menu } from 'antd'
import { IMenu } from 'index'

const { SubMenu } = Menu
const MenuItem = Menu.Item

function getDefaultOpenKeys(pathname: string): Array<string> {
  const paths = (pathname || '').split('/')
  const res = [];
  if (paths && paths.length > 3) {
    for (let i = 3; i <= paths.length; i++) {
      const p = paths.slice(0, 3).join('/')
      res.push(p)
    }
  }
  return res
}

interface ISider {
  menus: IMenu[]
  collapsed: boolean
}

const Sider: React.FC<ISider> = ({
  menus,
  collapsed
}) => {

  const history = useHistory();
  const location = useLocation();

  const [selectedKey, setSelectedKey] = useState('');
  const [defaultOpenKeys, setDefaultOpenKeys] = useState(getDefaultOpenKeys(location.pathname));


  const onClick = (item: any) => {
    console.log(item.key);
    history.replace(item.key)
  }

  const generateMenuItem = (menus: IMenu[]) => {
    return menus.map(menu => {
      const { children, path, icon, name = '' } = menu;
      if (children && children.length) {
        return (
          <SubMenu
            key={path}
            icon={icon}
            title={name}
          >
            {generateMenuItem(children)}
          </SubMenu>
        )
      }
      return (
        <MenuItem
          key={path}
          icon={icon}
        >
          {name}
        </MenuItem>
      )
    })
  }

  return (
    <Layout.Sider trigger={null} collapsible collapsed={collapsed}>
      {/* <div >
        <img src='' />
        <span className={collapsed ? styles.hide : ''}>{translateText({ id: 'SystemName' })}</span>
      </div> */}
      <Menu
        theme="dark"
        mode="inline"
        onClick={onClick}
        selectedKeys={[selectedKey]}
        defaultOpenKeys={defaultOpenKeys}
      >
        {generateMenuItem(menus)}
      </Menu>
    </Layout.Sider>
  )
}

export default React.memo(Sider);