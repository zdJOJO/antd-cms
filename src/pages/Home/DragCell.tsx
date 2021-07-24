/*
 * @Description: file content
 * @Autor: zdJOJO
 * @Date: 2021-07-24 14:19:47
 * @LastEditors: zdJOJO
 * @LastEditTime: 2021-07-24 15:44:17
 * @FilePath: \antd-cms\src\pages\Home\DragCell.tsx
 */

/* eslint-disable react/no-multi-comp */
/*
 * @Description: file content
 * @Autor: zdJOJO
 * @Date: 2021-07-24 13:18:16
 * @LastEditors: zdJOJO
 * @LastEditTime: 2021-07-24 14:17:36
 * @FilePath: \antd-cms\src\pages\Home\index.tsx
 */
import React, { FC, memo, ReactNode, useState } from 'react';

import classes from './index.less';

interface DragCellProps {
  dragValue: any
  dragKey: string
  children: ReactNode
}

const DragCell: FC<DragCellProps> = ({
  dragValue,
  dragKey,
  children
}) => {

  const [active, setActive] = useState<boolean>(false);

  const handleDrag = (event: any) => {
    event.dataTransfer.setData(dragKey, JSON.stringify(dragValue));
    setActive(true)
  }

  return (
    <div
      className={active ? `${classes.dragCell} ${classes.active}` : classes.dragCell}
      draggable="true"
      onDragStart={handleDrag}
      onDragEnd={e => setActive(false)}
    >
      {children}
    </div>
  )
}

export default memo(DragCell);