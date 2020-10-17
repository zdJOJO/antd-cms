import React, { FC } from 'react'
import Line from './Line';
import './index.less'
import { RightArrowProps } from './index.d';

const Merge: FC<RightArrowProps> = ({
  containerWidth,
  containerHeigth
}) => {
  const halfWidth = containerWidth ? (containerWidth - 2 - 10) / 2 : 26;
  return (
    <div
      className="edge-container"
      style={{
        width: containerWidth || 60,
        height: containerHeigth || 100
      }}
    >
      <Line
        width={halfWidth}
        style={{
          left: 0,
          top: containerHeigth ? containerHeigth * 0.25 : 22
        }}
      />
      <Line
        width={halfWidth}
        style={{
          left: 0,
          top: containerHeigth ? containerHeigth * 0.75 - 2 : 69
        }}
      />
      <span
        className="edge-vertical"
        style={{
          height: containerHeigth ? containerHeigth * 0.5 : 50,
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