import React, { ReactNode } from 'react'

import classes from './index.less';

function Home(): ReactNode {
  return (
    <div className={classes.welcome} >
      首页
    </div>
  )
}

export default Home;