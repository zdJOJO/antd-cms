import React, { FC, memo } from 'react'

import classes from './index.less';
import { PageLoading } from '@components';

interface IHome {

}

const Home: FC<IHome> = (props) => {
  return (
    <>
      <div className={classes.welcome} >
        Welcome to Nebula
        <PageLoading />
      </div>
    </>
  )
}

export default memo(Home);