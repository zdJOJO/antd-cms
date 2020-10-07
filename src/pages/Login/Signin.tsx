import React, { FC, useState } from 'react'
import { Avatar, Form, Input, Button, Checkbox } from 'antd';

import { UserOutlined, LockOutlined } from '@components/icons/antdIcons';
import { userImg } from '../../../assets/';
import classes from './index.less';

interface ISignin {
  layout: {
    labelCol: { span: number },
    wrapperCol: { span: number }
  }
  onFinish: (values: any, type: string) => void
  onFinishFailed: (errorInfo: any) => void
  handleChangeType: (type: string) => void
}

const Signin: FC<ISignin> = ({
  layout,
  onFinish,
  onFinishFailed,
  handleChangeType
}) => {

  const [loginForm] = Form.useForm();
  const [foucsed, setFoucsed] = useState<boolean>(false);

  // 登录框聚焦
  function onFocus() {
    setFoucsed(true)
  }

  // 失去焦点
  function onBlur() {
    const formValues: any = loginForm.getFieldsValue();
    if (!formValues.username && !formValues.password) {
      setFoucsed(false);
    }
  }

  return (
    <div className={classes.loginContainer}>
      <Avatar
        className={foucsed ? `${classes.userImg} ${classes.userImgFoucsed}` : classes.userImg}
        src={userImg}
      />
      <Form
        {...layout}
        form={loginForm}
        name="login"
        initialValues={{ remember: true }}
        onFinish={(values: any) => { onFinish(values, 'signin') }}
        onFinishFailed={onFinishFailed}
      >
        <Form.Item
          className={classes.formItem}
          name="username"
          rules={[{ required: true, message: 'Please input your username!' }]}
        >
          <Input
            placeholder="Username"
            prefix={<UserOutlined />}
            onFocus={onFocus}
            onBlur={onBlur}
          />
        </Form.Item>

        <Form.Item
          className={classes.formItem}
          name="password"
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input.Password
            placeholder="Password"
            prefix={<LockOutlined />}
            onFocus={onFocus}
            onBlur={onBlur}
          />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 2, span: 20 }} name="remember" valuePropName="checked" style={{ marginBottom: 10 }}>
          <Checkbox>
            <span className={classes.remember}>Remember me</span>
          </Checkbox>
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 2, span: 20 }} style={{ marginBottom: 10 }}>
          <Button className={classes.signInBtn} type="primary" htmlType="submit">
            Sign in
          </Button>
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 2, span: 20 }}>
          <Button
            type="link"
            className={classes.createAccountBtn}
            onClick={() => { handleChangeType('signup') }}
          >Create an account.</Button>
          <Button type="link" className={classes.forgetPwdBtn}>Forgot password?</Button>
        </Form.Item>
      </Form>
    </div>
  )
}

export default Signin;