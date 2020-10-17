import React, { FC, memo } from 'react';
import isEqual from 'lodash/isEqual';

import { ICell } from './index.d';
import styles from './index.less';


const Cell: FC<ICell> = ({
  type,
  renderContent,
  cellClassName,
  ...restProps
}) => {
  const classStr = type === 'th' ? `${styles.tableTdCell} ${styles.tableThCell}` : styles.tableTdCell;
  return (
    <div
      {...restProps}
      className={cellClassName ? `${classStr} ${cellClassName}` : classStr}
    >
      {renderContent && renderContent()}
    </div>
  )
}

function arePropsEqual(prevProps: any, nextProps: any) {
  return isEqual(prevProps, nextProps)
}

export default memo(Cell, arePropsEqual)