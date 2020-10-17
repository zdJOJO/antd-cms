import React, { FC } from 'react'
import Line from './Line';
import './index.less'
import { RightArrowProps } from './index.d';

const RightArrow: FC<RightArrowProps> = ({
  containerWidth
}) => {
  return (
    <div className="edge-container" >
      <Line width={containerWidth ? containerWidth : 55} />
      <span
        className="right-arrow"
        style={{ right: -5 }}
      />
    </div>
  )
}
export default RightArrow