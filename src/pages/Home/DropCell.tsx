/*
 * @Description: file content
 * @Autor: zdJOJO
 * @Date: 2021-07-24 14:46:11
 * @LastEditors: zdJOJO
 * @LastEditTime: 2021-07-24 16:24:19
 * @FilePath: \antd-cms\src\pages\Home\DropCell.tsx
 */
import React, { FC, memo, ReactNode, useState } from 'react';

import classes from './index.less';

interface DropCellProps {
  dropKey: string
  finishDrop: (dropValue: any) => void
  children: ReactNode
}

const DropCell: FC<DropCellProps> = ({
  dropKey,
  finishDrop,
  children
}) => {

  const [isIn, setIsIn] = useState<boolean>(false);

  const handleDrop = (event: any) => {
    const dropValueStr = event.dataTransfer.getData(dropKey);
    if (!!dropValueStr) {
      const dropValue = JSON.parse(dropValueStr);
      finishDrop(dropValue)
    }
    setIsIn(false)
  }

  const handleDragEnter = (event: any) => {
    event.preventDefault();
    setIsIn(true)
  }

  return (
    <div
      className={isIn ? `${classes.dropCell} ${classes.active}` : classes.dropCell}
      onDragEnter={handleDragEnter}
      onDragOver={handleDragEnter}
      onDragLeave={e => setIsIn(false)}
      onDrop={handleDrop}
    >
      {children}
    </div>
  )
}

export default memo(DropCell);