import React, { ReactNode, useState } from 'react'
import { Modal, Button } from 'antd';

import { FlowChartList } from './FlowChart';
import classes from './index.less';
import { rules, exampleNodes } from './test';

const Home = (): ReactNode => {
  const [visible, setVisible] = useState<boolean>(true);
  const [ruleData, setRuleData] = useState<any[]>(exampleNodes);

  return (
    <div className={classes.welcome} >
      <Button
        type="primary"
        onClick={() => { setVisible(true) }}
      >一键生成</Button>

      <Modal
        width={1000}
        bodyStyle={{ overflow: 'auto' }}
        title="轮班规则"
        visible={visible}
        onCancel={() => { setVisible(false) }}
      >
        <FlowChartList
          nodes={ruleData}
        />
        <FlowChartList
          nodes={ruleData}
        />
        <FlowChartList
          nodes={ruleData}
        />
      </Modal>
    </div>
  )
}

export default Home;