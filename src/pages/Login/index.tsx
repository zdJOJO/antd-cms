import React, { FC, memo, useState } from 'react'


import Signin from './Signin';
import Signup from './Signup';

import classes from './index.less';

interface ILogin {

}

const layout = {
  labelCol: { span: 0 },
  wrapperCol: { span: 20 }
};

const Login: FC<ILogin> = () => {

  const [type, setType] = useState<string>('signin'); // signin | signup


  // 登录
  const onFinish = (values: any, type: string) => {
    console.log('type', type);
    console.log('Success:', values);
  };

  // 登录失败
  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  // 切换
  function handleChangeType(type: string) {
    console.log(type);
    setType(type)
  }

  return (
    <div className={classes.bg}>
      {/* 登录 */}
      {type === 'signin' &&
        <Signin
          layout={layout}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          handleChangeType={handleChangeType}
        />
      }

      {/* 注册 */}
      {type === 'signup' &&
        <Signup
          layout={layout}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          handleChangeType={handleChangeType}
        />
      }
    </div>
  )
}

export default memo(Login);