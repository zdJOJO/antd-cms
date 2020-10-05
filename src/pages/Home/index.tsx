import React, { FC, memo } from 'react'

import classes from './index.less';

interface IHome {

}

const Home: FC<IHome> = (props) => {
  return (
    <>
      <div className={classes.welcome} >
        Welcome to Nebula
      </div>
    </>
  )
}

export default memo(Home);