import React from 'react'
import { Layout } from 'antd'
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined
} from '@utils/antdIcons';

import SignOut from '../SignOut';

import classes from './index.less'

interface IHeader {
  collapsed: boolean,
  toggle: () => void
}

const Header: React.FC<IHeader> = ({
  collapsed,
  toggle
}) => {
  return (
    <Layout.Header
      className={classes.layOutHeader}
      style={{ padding: 0 }}
    >
      {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
        className: classes.trigger,
        onClick: toggle
      })}
      <SignOut />
    </Layout.Header>
  )
}

export default React.memo(Header)