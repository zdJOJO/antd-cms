import React, { FC } from 'react'
import './index.less'
import { LineProps } from '../flowChart';

const Line: FC<LineProps> = ({
  width,
  className,
  style,
  ...restProps
}) => {
  const newWidth = width || 60;
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