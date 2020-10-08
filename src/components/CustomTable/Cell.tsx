import React, { FC } from 'react';

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

export default Cell