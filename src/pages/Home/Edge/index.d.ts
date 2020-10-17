import * as React from 'react';

type EdgeType = 'default' | 'diverge' | 'merge';

export interface BaseEdgeProps extends React.HTMLAttributes<HTMLDivElement> {
  heigth?: number
  width?: number

}

export interface EdgeProps extends React.HTMLAttributes<HTMLDivElement> {
  heigth: number
  width: number
  type: EdgeType
}

export interface LineProps extends BaseEdgeProps {
  containerWidth?: number
  containerHeigth?: number
}

export interface RightArrowProps extends BaseEdgeProps {
  containerWidth?: number
  containerHeigth?: number
}