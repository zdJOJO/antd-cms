import React, { ReactNode, useState } from 'react'
import { Modal, Button, Row, Col, Input } from 'antd';

import Edge from './Edge';
import classes from './index.less';
import { rules } from './test';



const Home = (): ReactNode => {
  const [visible, setVisible] = useState<boolean>(true);
  const [ruleData, setRuleData] = useState<any[]>(rules);
  return (
    <div className={classes.welcome} >
      <Button
        type="primary"
        onClick={() => { setVisible(true) }}
      >一键生成</Button>

      <Modal
        width={1000}
        title="轮班规则"
        visible={visible}
        onCancel={() => { setVisible(false) }}
      >
        <div style={{ display: 'flex' }} >

          <Row>
            <Col style={{ display: 'flex', alignItems: 'center' }}>
              <div style={{ width: 80 }}>
                <Input size="small" placeholder="线路1" />
              </div>
            </Col>
          </Row>

          <Row>
            <Col style={{ display: 'flex', alignItems: 'center' }}>
              <Edge type="default" width={50} heigth={100} />
            </Col>
            <Col style={{ display: 'flex', alignItems: 'center' }}>
              <div style={{ width: 80 }}>
                <Input size="small" placeholder="线路2" />
              </div>
            </Col>
          </Row>

          {/* 分开 */}
          <Row>
            <Col style={{ display: 'flex', alignItems: 'center' }}>
              <Edge type="diverge" width={60} heigth={100} />
            </Col>
            <Col style={{ display: 'flex', alignItems: 'center' }}>
              <div>
                <div style={{ width: 80, lineHeight: '50px' }} ><Input size="small" placeholder="线路3-1" /></div>
                <div style={{ width: 80, lineHeight: '50px' }} ><Input size="small" placeholder="线路3-2" /></div>
              </div>
            </Col>
          </Row>

          <Row>
            <div>
              <div style={{ display: 'flex' }}>
                <Col style={{ display: 'flex', alignItems: 'center' }}>
                  <Edge type="default" width={50} heigth={50} />
                </Col>
                <Col style={{ display: 'flex', alignItems: 'center' }}>
                  <div style={{ width: 80 }}>
                    <Input size="small" placeholder="线路4-1" />
                  </div>
                </Col>
              </div>
              <div style={{ display: 'flex' }}>
                <Col style={{ display: 'flex', alignItems: 'center' }}>
                  <Edge type="default" width={50} heigth={50} />
                </Col>
                <Col style={{ display: 'flex', alignItems: 'center' }}>
                  <div style={{ width: 80 }}>
                    <Input size="small" placeholder="线路4-2" />
                  </div>
                </Col>
              </div>
            </div>
          </Row>

          {/* 合并 */}
          <Row>
            <Col style={{ display: 'flex', alignItems: 'center' }}>
              <Edge type="merge" width={60} heigth={100} />
            </Col>
            <Col style={{ display: 'flex', alignItems: 'center' }}>
              <div style={{ width: 80 }}>
                <Input size="small" placeholder="线路6" />
              </div>
            </Col>
          </Row>

        </div>
      </Modal>
    </div>
  )
}

export default Home;