import React, { FC, memo } from 'react';
import { FlowChartItem } from '.';
import { FlowChartListProps, IFlowChartNode } from './flowChart';
import './index.less';

const FlowChartList: FC<FlowChartListProps> = ({
  nodes,
  width,
  height
}) => {
  const inputWidth = 80;
  const defaultLayout = {
    width: width || 60,
    height: height || 80
  }
  const listPadding = 20;
  const listWidth = inputWidth + (nodes.length - 1) * (inputWidth + defaultLayout.width + 20) + listPadding;
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
        style={{ width: listWidth }}
      >
        {
          nodes.map((node: IFlowChartNode, index: number) => renderNode(node, index))
        }
      </div>
    </div>
  )
}

export default memo(FlowChartList);