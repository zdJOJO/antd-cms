import React from 'react';

import './index.less';

export default () => (
  <div
    className="myLoading"
    style={{
      color: 'red',
      fontSize: 12,
      textAlign: 'center',
      margin: '.1rem 0'
    }}
  >
    <div className="k-line k-line11-1" />
    <div className="k-line k-line11-2" />
    <div className="k-line k-line11-3" />
    <div className="k-line k-line11-4" />
  </div>
)