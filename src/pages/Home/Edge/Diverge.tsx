import React, { FC } from 'react'
import Line from './Line';
import './index.less'
import { RightArrowProps } from './index.d';

const Diverge: FC<RightArrowProps> = ({
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
      <Line width={halfWidth} />
      <span
        className="edge-vertical"
        style={{
          height: containerHeigth ? containerHeigth * 0.5 : 50,
          left: halfWidth
        }}
      />
      <Line
        width={halfWidth}
        style={{
          left: halfWidth + 2,
          top: containerHeigth ? containerHeigth * 0.25 : 25
        }}
      />
      <Line
        width={halfWidth}
        style={{
          left: halfWidth + 2,
          top: containerHeigth ? containerHeigth * 0.75 - 2 : 73
        }}
      />
      <span
        className="right-arrow"
        style={{
          right: -5,
          top: containerHeigth ? containerHeigth * 0.25 - 3 : 22
        }}
      />
      <span
        className="right-arrow"
        style={{
          right: -5,
          top: containerHeigth ? containerHeigth * 0.75 - 6 : 69
        }}
      />
    </div>
  )
}
export default Diverge