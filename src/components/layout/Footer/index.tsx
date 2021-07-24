/*
 * @Description: file content
 * @Autor: zdJOJO
 * @Date: 2020-09-26 20:58:13
 * @LastEditors: zdJOJO
 * @LastEditTime: 2021-07-24 17:25:39
 * @FilePath: \antd-cms\src\components\Layout\Footer\index.tsx
 */

import React, { FC } from 'react'
import { Layout } from 'antd'

import classes from './index.less';

const Footer: FC<any> = () => {
  return (
    <Layout.Footer className={classes.footer}>
      Return Order Splitting System ©2021 Created by 金露婷
    </Layout.Footer>
  )
}

export default Footer