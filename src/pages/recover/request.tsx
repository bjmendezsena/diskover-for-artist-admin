import React, { useState } from 'react';
import { Form, Input, Button, Typography, Alert  } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import styles from './styles.module.scss';
import logo from '../../assets/img/diskover-1.png';
import Background from '../login/components/Background';
import authServices from '../../redux/auth/services';

const { Text } = Typography;

function RecoverRequest() {
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [userEmail, setUserEmail] = useState('');

  const onFinish = async ({ email }: { email: string }) => {    
    try {
      setError('');
      setLoading(true);
      setUserEmail(email)
      await authServices.requestRecovery(email);
      setSuccess(true);
      setLoading(false);
    } catch (err) {
      if (err?.response?.status === 404) setError('Utilisateur non trouvé')
      else setError(err?.response?.data?.title);
      setLoading(false);
    }
  };

  const onResend = async () => {
    try {
      setError('');
      setLoading(true);
      await authServices.requestRecovery(userEmail);
      setSuccess(true);
      setLoading(false);
    } catch (err) {
      if (err?.response?.status === 404) setError('Utilisateur non trouvé')
      else setError(err?.response?.data?.title);
      setLoading(false);
    }
  }

  if (success) {
    return (
      <div>
        <Background />
        <div className={styles.login_form_container}>
          <img src={logo} alt="Logo" className={styles.login_form_logo} />
          <div className={styles.check_container}>
            <Text>10 minutes se sont écoulées et vous n'avez pas reçu le message?</Text>
            <Alert message="Email envoyé" type="success" showIcon />
          </div>
          <Button onClick={() => onResend()} style={{border: 'none', boxShadow: 'none'}}>
            <Text style={{textDecoration: 'underline', color: '#089EB7'}}>Renvoyer</Text>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Background />
      <div className={styles.login_form_container}>
        <img src={logo} alt="Logo" className={styles.login_form_logo} />
        <div className={styles.text}>
          <Text>Ingresa tu email para recibir un correo para recuperar tu contraseña.</Text>
        </div>
        <Form name="recovery_request" onFinish={onFinish}>
          <Form.Item
            className={styles.space}
            label=""
            name="email"
            rules={[
              { required: true, message: 'Debes ingresar tu email' },
              { type: 'email', message: 'Ingresa una dirección de email válida' },
            ]}
            validateStatus={error && 'error'}
            help={error || null}
          >
            <Input
              prefix={
                <UserOutlined
                  className="site-form-item-icon"
                  style={{ color: '#0a00ec' }}
                />
              }
              placeholder="Correo electrónico"
              disabled={loading}
            />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className={styles.login_form_submit}
              disabled={loading}
              block
            >
              Enviar
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}

export default RecoverRequest;
