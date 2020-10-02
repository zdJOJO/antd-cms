import React from 'react'
import { Layout } from 'antd'
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined
} from '@utils/antdIcons';

import SignOut from '../SignOut';

import "./index.less"

interface IHeader {
  collapsed: boolean,
  toggle: () => void
}

const Header: React.FC<IHeader> = ({
  collapsed,
  toggle
}) => {
  return (
    <Layout.Header className="layOutHeader" style={{ padding: 0 }}>
      {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
        className: 'trigger',
        onClick: toggle,
      })}
      <SignOut />
    </Layout.Header>
  )
}

export default React.memo(Header)