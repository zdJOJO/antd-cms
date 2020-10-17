import React, { ReactNode, useState } from 'react'
import { Modal, Button } from 'antd';

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
        width={700}
        title="轮班规则"
        visible={visible}
        onCancel={() => { setVisible(false) }}
      >
        <div style={{ display: 'flex' }} >
          <Edge type="default" width={50} heigth={100} />
          <Edge type="diverge" width={60} heigth={100} />
          <Edge type="merge" width={60} heigth={100} />
        </div>
      </Modal>
    </div>
  )
}

export default Home;