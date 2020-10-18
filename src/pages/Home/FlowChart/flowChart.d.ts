/*
 * @Description: file content
 * @Autor: zdJOJO
 * @Date: 2020-10-17 19:47:54
 * @LastEditors: zdJOJO
 * @LastEditTime: 2020-10-18 14:36:11
 * @FilePath: \antd-cms\src\pages\Home\FlowChart\flowChart.d.ts
 */
import { type } from 'os';
import * as React from 'react';

type EdgeType = 'default' | 'diverge' | 'merge';
type NodeType = 'root' | 'common' | 'diverge' | 'merge' | 'double';

export interface BaseProps extends React.HTMLAttributes<HTMLDivElement> {
  height?: number
  width?: number
}

export interface LineProps extends BaseProps {
  containerWidth?: number
  containerheight?: number
}

export interface RightArrowProps extends BaseProps {
  containerWidth?: number
  containerheight?: number
}

export interface EdgeProps extends React.HTMLAttributes<HTMLDivElement> {
  height: number
  width: number
  type: EdgeType
}

export interface FlowChartItemProps extends BaseProps {
  node: IFlowChartNode
  nodeType?: NodeType
}

export interface FlowChartListProps {
  nodes: any[]
}

export interface IFlowChartNode {
  id: number
  label: string
  from: number | number[]
  to: number | number[]
  children?: IFlowChartNode[]
  nodeType?: NodeType
}


// declare const Edge: React.ForwardRefExoticComponent<EdgeProps & React.RefAttributes<HTMLDivElement>>;
// export default Edge;