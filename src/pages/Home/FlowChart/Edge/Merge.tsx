import React, { FC } from 'react'
import Line from './Line';
import './index.less'
import { RightArrowProps } from '../flowChart';

const Merge: FC<RightArrowProps> = ({
  containerWidth,
  containerheight
}) => {
  const halfWidth = containerWidth ? (containerWidth - 2 - 10) / 2 : 26;
  return (
    <div
      className="edge-container"
      style={{
        width: containerWidth || 60,
        height: containerheight || 100
      }}
    >
      <Line
        width={halfWidth}
        style={{
          left: 0,
          top: containerheight ? containerheight * 0.25 : 22
        }}
      />
      <Line
        width={halfWidth}
        style={{
          left: 0,
          top: containerheight ? containerheight * 0.75 - 2 : 69
        }}
      />
      <span
        className="edge-vertical"
        style={{
          height: containerheight ? containerheight * 0.5 : 50,
          left: halfWidth
        }}
      />
      <Line width={halfWidth}
        style={{ left: halfWidth }}
      />
      <span
        className="right-arrow"
        style={{ right: -3 }}
      />
    </div>
  )
}

export default Merge