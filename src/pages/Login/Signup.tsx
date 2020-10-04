import React, { FC } from 'react'
import { Avatar, Form, Input, Button, Checkbox } from 'antd';

import { UserOutlined, LockOutlined, MailOutlined } from '@utils/antdIcons';
import classes from './index.less';

interface ISignup {
  layout: {
    labelCol: { span: number },
    wrapperCol: { span: number }
  }
  onFinish: (values: any, type: string) => void
  onFinishFailed: (errorInfo: any) => void
  handleChangeType: (type: string) => void
}


const Signup: FC<ISignup> = ({
  layout,
  onFinish,
  onFinishFailed,
  handleChangeType
}) => {
  const [registForm] = Form.useForm();
  return (
    <div className={classes.loginContainer}>
      <Avatar
        className={`${classes.userImg} ${classes.userImgFoucsed}`}
        icon={<UserOutlined />}
      />
      <Form
        {...layout}
        form={registForm}
        name="login"
        initialValues={{ remember: true }}
        onFinish={(values: any) => { onFinish(values, 'signup') }}
        onFinishFailed={onFinishFailed}
      >

        <Form.Item
          className={classes.formItem}
          name="username"
          rules={[{ required: true, message: 'Please input your username!', whitespace: true }]}
        >
          <Input
            placeholder="Input your username"
            prefix={<UserOutlined />}
          />
        </Form.Item>

        <Form.Item
          className={classes.formItem}
          name="password"
          rules={[
            {
              required: true,
              message: 'Please input your password!'
            }
          ]}
          hasFeedback
        >
          <Input.Password
            placeholder="Input your password"
            prefix={<LockOutlined />}
          />
        </Form.Item>

        <Form.Item
          className={classes.formItem}
          name="confirm"
          dependencies={['password']}
          hasFeedback
          rules={[
            {
              required: true,
              message: 'Please confirm your password!'
            },
            ({ getFieldValue }) => ({
              validator(rule, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve();
                }
                return Promise.reject('The two passwords that you entered do not match!');
              }
            })
          ]}
        >
          <Input.Password
            placeholder="Input your password again"
            prefix={<LockOutlined />}
          />
        </Form.Item>

        <Form.Item
          className={classes.formItem}
          name="email"
          rules={[
            {
              type: 'email',
              message: 'The input is not valid E-mail!'
            },
            {
              required: true,
              message: 'Please input your E-mail!'
            }
          ]}
        >
          <Input
            placeholder="Input your email"
            prefix={<MailOutlined />}
          />
        </Form.Item>

        <Form.Item
          className={classes.formItem}
          name="agreement"
          valuePropName="checked"
          rules={[
            { validator: (_, value) => value ? Promise.resolve() : Promise.reject('Should accept agreement') }
          ]}
        >
          <Checkbox>
            <span className={classes.remember}>I have read the  <a onClick={(e: any) => { e.defaultPrevented() }} href="">agreement</a></span>
          </Checkbox>
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 2, span: 20 }} style={{ marginBottom: 10 }}>
          <Button className={classes.signInBtn} type="primary" htmlType="submit">
            Sign up
          </Button>
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 2, span: 20 }}>
          <Button
            type="link"
            className={classes.createAccountBtn}
            onClick={() => { handleChangeType('signin') }}
          >Login with existing account.</Button>
        </Form.Item>

      </Form>
    </div>
  )
}

export default Signup;