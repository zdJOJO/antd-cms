import React, { FC, memo, useState } from 'react'

import classes from './index.less';

interface IHome {

}

const Home: FC<IHome> = (props) => {
  return (
    <>
      <div className={classes.welcome} >
        首页
      </div>
    </>
  )
}

export default memo(Home);