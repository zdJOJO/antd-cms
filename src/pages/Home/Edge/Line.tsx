import React, { FC } from 'react'
import './index.less'
import { LineProps } from './index.d';

const Line: FC<LineProps> = ({
  width,
  className,
  style,
  ...restProps
}) => {
  console.log(11111111111);
  console.log(width);
  const newWidth = width || 60;
  console.log(22222222222);
  console.log(newWidth);
  const newClassName = className ? `${className} line` : 'line';
  return (
    <span
      {...restProps}
      style={{
        ...style,
        width: newWidth
      }}
      className={newClassName}
    />
  )
}

export default Line