import React from 'react';
import { Form, Input, Checkbox, Button } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { Link, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import styles from './styles.module.scss';
import logo from '../../assets/img/diskover-1.png';
import Background from './components/Background';
import { loginUser } from '../../redux/user/actions';

function Login() {
  const { loggingIn, loginError } = useSelector((state: any) => state.user);
  const dispatch = useDispatch();
  const history = useHistory();

  const onLoginSuccess = () => {
    console.log("aaaa");

    // history.push('/users/info');
  };

  const onFinish = (values: {
    email: string;
    password: string;
    remember: boolean;
  }) => {
    const { email, password, remember } = values;
    const data = { email, password };
    dispatch(loginUser(data, remember, onLoginSuccess));
  };

  return (
    <div className='background_1_login'>
      <Background />
      <div className={styles.login_form_container}>
        <img src={logo} alt="Logo" className={styles.login_form_logo} />
        <Form
          name="normal_login"
          onFinish={onFinish}
        >
          <Form.Item
            className={styles.space}
            name="email"
            rules={[
              { required: true, message: 'Debes ingresar un email' },
              { type: 'email', message: 'Ingresa una dirección de email válida' },
            ]}
            validateStatus={loginError && 'error'}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="Tu email"
              disabled={loggingIn}
              style={{ color: '#0a00ec' }}
            />
          </Form.Item>
          <Form.Item
            className={styles.space}
            name="password"
            rules={[
              { required: true, message: 'Debes ingresar tu contraseña' },
            ]}
            validateStatus={loginError && 'error'}
            help={loginError || null}
          >
            <Input
              style={{ color: '#0a00ec' }}
              prefix={
                <LockOutlined
                  className="site-form-item-icon"

                />
              }
              type="password"
              placeholder="Tu contraseña"
              disabled={loggingIn}
            />
          </Form.Item>
          <Form.Item className={styles.space}>
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox disabled={loggingIn} style={{ float: 'left' }}>
                Recordarme
              </Checkbox>
            </Form.Item>
          </Form.Item>
          <Form.Item className={styles.space}>
            <Link className={styles.login_form_forgot} to="/recover/request">
              ¿Olvidaste la contraseña?
            </Link>
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="login_form-submit"
              disabled={loggingIn}
              block
            >
              Entrar
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}

export default Login;
