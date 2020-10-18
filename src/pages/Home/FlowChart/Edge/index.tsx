import React, { FC } from 'react'
import './index.less'
import { EdgeProps } from '../flowChart';

import RightArrow from './RightArrow';
import Diverge from './Diverge';
import Merge from './Merge';

const Edge: FC<EdgeProps> = ({
  type,
  width,
  height
}) => {
  if (type === 'default') {
    return <RightArrow containerWidth={width} containerheight={height} />
  } else if (type === 'diverge') {
    return <Diverge containerWidth={width} containerheight={height} />
  } else if (type === 'merge') {
    return <Merge containerWidth={width} containerheight={height} />
  } else {
    return null
  }
}

export default Edge