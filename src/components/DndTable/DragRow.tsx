import React, { memo } from 'react';
import { areEqual } from 'react-window';
import { Draggable, DraggableProvided, DraggableStateSnapshot } from 'react-beautiful-dnd';
import DragRowItem from './DragRowItem';
import { IRowData, IEditRow } from './index.d';

interface RowProps extends IEditRow {
  data: IRowData[]
  index: number
  style: any
}

const DragRow = ({
  data: datas,
  index,
  style,
  ...restprops
}: RowProps) => {
  const item: IRowData = datas[index];

  return (
    <Draggable
      draggableId={item.id}
      index={index}
      key={item.id}
    >
      {(provided: DraggableProvided, snapshot: DraggableStateSnapshot) => (
        <DragRowItem
          {...restprops}
          provided={provided}
          rowdata={item}
          isDragging={snapshot.isDragging}
          isGroupedOver={Boolean(snapshot.combineTargetFor)}
          style={{ margin: 0, ...style }}
          _index={index}


        />
      )}
    </Draggable>
  );
};

export default memo(DragRow, areEqual)