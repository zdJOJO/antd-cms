import React, { FC } from 'react'
import './index.less'
import { EdgeProps } from './index.d';

import RightArrow from './RightArrow';
import Diverge from './Diverge';
import Merge from './Merge';

const Edge: FC<EdgeProps> = ({
  type,
  width,
  heigth
}) => {
  if (type === 'default') {
    return <RightArrow containerWidth={width} containerHeigth={heigth} />
  } else if (type === 'diverge') {
    return <Diverge containerWidth={width} containerHeigth={heigth} />
  } else if (type === 'merge') {
    return <Merge containerWidth={width} containerHeigth={heigth} />
  } else {
    return null
  }
}

export default Edge