import React, { FC, memo } from 'react'

import {
  DatePicker
} from 'antd';

import classes from './index.less';

interface IHome {

}

const Home: FC<IHome> = (props) => {
  return (
    <>
      <div className={classes.welcome} >
        首页
        <DatePicker />
      </div>
    </>
  )
}

export default memo(Home);