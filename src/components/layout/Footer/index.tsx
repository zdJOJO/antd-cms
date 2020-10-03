
import React, { FC } from 'react'
import { Layout } from 'antd'

import classes from './index.less';

const Footer: FC<any> = () => {
  return (
    <Layout.Footer className={classes.footer}>
      solar system ©2020 Created by zdjojo
    </Layout.Footer>
  )
}

export default Footer