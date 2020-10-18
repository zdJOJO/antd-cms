import React, { FC } from 'react'
import Line from './Line';
import './index.less'
import { RightArrowProps } from '../flowChart';

const RightArrow: FC<RightArrowProps> = ({
  containerheight,
  containerWidth
}) => {
  return (
    <div
      className="edge-container"
      style={{
        width: containerWidth + 10,
        height: containerheight
      }}
    >
      <Line width={containerWidth} />
      <span
        className="right-arrow"
        style={{ right: -5 }}
      />
    </div >
  )
}
export default RightArrow