import { useLogin, useRegister } from '@/shared/reactQueries';
import { useState } from 'react';
import { Button, Form, Input, notification } from 'antd';
import clsx from 'clsx';
import { useRouter } from 'next/router';

import { GoogleAuthButton } from '@/features';

import s from './styles.module.scss';

type TAuthTabs = 'login' | 'register';

export default function Auth() {
  const router = useRouter();
  const [tab, setTab] = useState<TAuthTabs>('login');

  const { login } = useLogin({
    onSuccess: () => {
      router.push('/chat');
    },
  });
  const { register } = useRegister({
    onSuccess: () => {
      notification.success({ message: 'Register success', description: 'Please login' });
    },
  });

  return (
    <div className={s.app}>
      <div className={s.content}>
        <h3>{tab === 'login' ? 'Sign in' : 'Sign Up'}</h3>
        <div className={s.tabs}>
          <div onClick={() => setTab('login')} className={clsx(s.tab, { [s.active]: tab === 'login' })}>
            login
          </div>
          <div onClick={() => setTab('register')} className={clsx(s.tab, { [s.active]: tab === 'register' })}>
            register
          </div>
        </div>

        <div className={s.form}>
          {tab === 'login' ? (
            <Form
              name='basic'
              labelCol={{ span: 8 }}
              wrapperCol={{ span: 16 }}
              initialValues={{ remember: true }}
              onFinish={(data) => login(data)}
              autoComplete='off'
            >
              <Form.Item label='Email' name='email' rules={[{ required: true, message: 'Please input your email!' }]}>
                <Input />
              </Form.Item>

              <Form.Item
                label='Password'
                name='password'
                rules={[{ required: true, message: 'Please input your password!' }]}
              >
                <Input.Password />
              </Form.Item>

              <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                <Button type='primary' htmlType='submit'>
                  Submit
                </Button>
              </Form.Item>
            </Form>
          ) : (
            <Form
              name='basic'
              labelCol={{ span: 8 }}
              wrapperCol={{ span: 16 }}
              initialValues={{ remember: true }}
              onFinish={(data) => register(data, { onSuccess: () => setTab('login') })}
              autoComplete='off'
            >
              <Form.Item label='Email' name='email' rules={[{ required: true, message: 'Please input your email!' }]}>
                <Input />
              </Form.Item>
              <Form.Item
                label='First name'
                name='firstName'
                rules={[{ required: true, message: 'Please input your first name!' }]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label='Last name'
                name='lastName'
                rules={[{ required: true, message: 'Please input your last name!' }]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label='Password'
                name='password'
                rules={[{ required: true, message: 'Please input your password!' }]}
              >
                <Input.Password />
              </Form.Item>

              <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                <Button type='primary' htmlType='submit'>
                  Submit
                </Button>
              </Form.Item>
            </Form>
          )}
          <GoogleAuthButton />
        </div>
      </div>
    </div>
  );
}
