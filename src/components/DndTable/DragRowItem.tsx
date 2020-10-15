
import React from 'react';
import { DraggableProvided } from 'react-beautiful-dnd';

import EditRow from './EditRow';

import { IEditRow, IRowData } from './index.d';


function getStyle(provided: DraggableProvided, style: any) {
  if (!style) {
    return provided.draggableProps.style;
  }
  return {
    ...provided.draggableProps.style,
    ...style
  };
}

interface DragRowItemProps extends IEditRow {
  rowdata: IRowData
  isDragging: boolean
  provided: DraggableProvided
  isClone?: boolean,
  isGroupedOver?: boolean
  style?: any
  _index?: number,
}

const DragRowItem: React.FC<DragRowItemProps> = ({
  rowdata,
  isDragging,
  provided,
  style,
  _index,
  ...restprops
}) => {
  return (
    <div
      ref={provided.innerRef}
      {...provided.draggableProps}
      {...provided.dragHandleProps}
      style={getStyle(provided, style)}
      data-is-dragging={isDragging}
      data-testid={rowdata.id}
      data-index={_index}
      aria-label={`${rowdata.id} --- ${rowdata.name}`}
    >
      <EditRow
        {...restprops}
      />
    </div>
  );
}

export default React.memo<DragRowItemProps>(DragRowItem);