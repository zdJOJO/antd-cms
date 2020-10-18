import React, { FC, memo } from 'react';
import { FlowChartItem } from '.';
import { FlowChartListProps, IFlowChartNode } from './flowChart';
import './index.less';

const defaultLayout = {
  width: 60,
  height: 100
}
const FlowChartList: FC<FlowChartListProps> = ({
  nodes
}) => {
  const newWidth = 80 + (nodes.length - 1) * 150 + 20;

  const renderNode = (node: IFlowChartNode, index: number) => (
    <FlowChartItem
      {...defaultLayout}
      key={`${node.label}-${index}`}
      node={node}
      nodeType={node.nodeType || 'common'}
    />
  )
  return (
    <div className="flow-chart-list-container">
      <div
        className="flow-chart-list"
        style={{ width: newWidth }}
      >
        {
          nodes.map((node: IFlowChartNode, index: number) => renderNode(node, index))
        }
      </div>
    </div>
  )
}

export default memo(FlowChartList);