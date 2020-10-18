import React, { FC, ReactElement, memo } from 'react';
import { Button, Row, Col, Input } from 'antd';
import Edge from './Edge';
import { FlowChartItemProps } from './flowChart';
import './index.less';

const FlowChartItem: FC<FlowChartItemProps> = ({
  node,
  nodeType,
  width,
  height
}) => {
  const newWidth = width || 60;
  const newHeight = height || 100;
  const placeholder = '请填写';

  // nodeType === 'common'
  let child: ReactElement = (
    <Row>
      <Col className="col-flex">
        <Edge type="default" width={newWidth} height={newHeight} />
      </Col>
      <Col className="col-flex">
        <div className="node-input-container">
          <Input size="small" placeholder={placeholder} defaultValue={node.label} />
          <Button className="addBtn" size="small" type="link" >增加班次</Button>
        </div>
      </Col>
    </Row>
  )
  if (nodeType === 'root') {
    child = (
      <Col className="col-flex">
        <div className="node-input-container">
          <Input size="small" placeholder={placeholder} defaultValue={node.label} />
        </div>
      </Col>
    )
  } else if (nodeType === 'diverge') {
    child = (
      <>
        <Col className="col-flex">
          <Edge type="diverge" width={newWidth} height={newHeight} />
        </Col>
        <Col className="col-flex">
          <div>
            {
              node.children && node.children.map(childNode => (
                <div key={childNode.id} style={{ width: 80, lineHeight: `${newHeight / 2}px` }} >
                  <Input size="small" placeholder={placeholder} defaultValue={childNode.label} />
                </div>
              ))
            }
          </div>
        </Col>
      </>
    )
  } else if (nodeType === 'merge') {
    child = (
      <>
        <Col className="col-flex">
          <Edge type="merge" width={newWidth} height={newHeight} />
        </Col>
        <Col className="col-flex">
          <div className="node-input-container">
            <Input size="small" placeholder={placeholder} defaultValue={node.label} />
            <Button className="addBtn" size="small" type="link" >增加班次</Button>
          </div>
        </Col>
      </>
    )
  } else if (nodeType === 'double') {
    child = (
      <div>
        {
          node.children && node.children.map(childNode => (
            <div key={childNode.id} style={{ display: 'flex' }}>
              <Col className="col-flex">
                <Edge type="default" width={50} height={50} />
              </Col>
              <Col className="col-flex">
                <div className="node-input-container">
                  <Input size="small" placeholder={placeholder} defaultValue={childNode.label} />
                </div>
              </Col>
            </div>
          ))
        }
      </div>
    )
  }
  return <Row>{child}</Row>
}

export default memo(FlowChartItem);