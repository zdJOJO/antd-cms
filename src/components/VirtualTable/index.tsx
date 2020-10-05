
import React, { useState, useEffect, useRef, FC } from 'react';
import { VariableSizeGrid as Grid } from 'react-window';
import ResizeObserver from 'rc-resize-observer';
import classNames from 'classnames';
import { Table } from 'antd';
import { TableProps } from 'antd/lib/table';

import './index.less';

interface IVirtualTable<RecordType> extends TableProps<RecordType> {
  columns: any[]
  scroll: {
    x?: number,
    y: number
  }
  rowHeight: number
}

const VirtualTable: FC<IVirtualTable<any>> = ({
  columns,
  scroll,
  rowHeight,
  ...props
}) => {
  const [tableWidth, setTableWidth] = useState(0);

  const widthColumnCount = columns.filter(({ width }) => !width).length;
  const mergedColumns = columns.map(column => {
    if (column.width) {
      return column;
    }
    return {
      ...column,
      width: Math.floor(tableWidth / widthColumnCount)
    };
  });

  const gridRef = useRef<any>();
  const [connectObject] = useState<any>(() => {
    const obj = {};
    Object.defineProperty(obj, 'scrollLeft', {
      get: () => null,
      set: (scrollLeft: number) => {
        if (gridRef.current) {
          gridRef.current.scrollTo({ scrollLeft });
        }
      }
    });

    return obj;
  });

  const resetVirtualGrid = () => {
    if (!!gridRef.current) {
      gridRef.current.resetAfterIndices({
        columnIndex: 0,
        shouldForceUpdate: false
      });
    }
  };

  useEffect(() => resetVirtualGrid, [tableWidth]);

  const renderVirtualList = (rawData: any[], { scrollbarSize, ref, onScroll }: any) => {
    ref.current = connectObject;
    const totalHeight = rawData.length * rowHeight;
    const getColumnWidth = (index: number) => {
      const { width } = mergedColumns[index];
      return totalHeight > scroll.y && index === mergedColumns.length - 1
        ? (width as number) - scrollbarSize - 1
        : width as number;
    }

    return (
      <Grid
        ref={gridRef}
        className="virtual-grid"
        columnCount={mergedColumns.length}
        columnWidth={getColumnWidth}
        height={scroll.y}
        rowCount={rawData.length}
        rowHeight={() => rowHeight}
        width={tableWidth}
        onScroll={({ scrollLeft }) => {
          onScroll({ scrollLeft });
        }}
      >
        {({ columnIndex, rowIndex, style }) => {
          const text = rawData[rowIndex][mergedColumns[columnIndex].dataIndex];
          return (
            <div
              className={classNames('virtual-table-cell', {
                'virtual-table-cell-last': columnIndex === mergedColumns.length - 1
              })}
              style={style}
            >
              {text}
            </div>
          )
        }}
      </Grid>
    );
  };
  return (
    <ResizeObserver
      onResize={({ width }) => {
        setTableWidth(width);
      }}
    >
      <Table
        {...props}
        columns={mergedColumns}
        pagination={false}
        scroll={{
          y: props.dataSource?.length === 0 ? undefined : scroll.y,
          x: props.dataSource?.length === 0 ? undefined : scroll.x
        }}
        components={props.dataSource?.length === 0 ? undefined : {
          body: renderVirtualList
        }}
      />
    </ResizeObserver>
  );
}

export default VirtualTable;