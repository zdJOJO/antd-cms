import React from 'react';
import classes from './index.less';
export default () => {
  return (
    <div className={classes.pageLoading}>
      <span className={classes.loadingStr} >loading</span>
      <span className={classes.spinner}>
        <span className={classes.bounce1}></span>
        <span className={classes.bounce2}></span>
        <span className={classes.bounce3}></span>
      </span>
    </div>
  )
}