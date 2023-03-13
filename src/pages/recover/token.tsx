import React, { useEffect, useState } from 'react';
import { Form, Input, Button, Result, Typography } from 'antd';
import { LockOutlined } from '@ant-design/icons';
import { Link, useParams, useHistory } from 'react-router-dom';

import styles from './styles.module.scss';
import logo from '../../assets/img/logo-waterfamily.png';
import background from '../../assets/img/background.png';
import authServices from '../../redux/auth/services';

const { Text } = Typography;

function RecoverToken() {
  const history = useHistory();

  const { token } = useParams<{ token: string }>();
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function checkToken () {
      try {
        await authServices.checkRecovery(token);
      } catch(err) {
        history.push('/login');
      }
    }

    checkToken()
  }, [token, history])

  const onFinish = async ({ password, repeat }: { password: string, repeat: string}) => {
    if (password === repeat) {
      try {
        setError('');
        setLoading(true);
        await authServices.postRecovery(token, password);
        setSuccess(true);
        setLoading(false);
      } catch (err) {
        if (err?.response?.status === 403) setError('Token déjà utilisé ou expiré')
        else if (err?.response?.status === 404) setError('Token non trouvé')
        else setError(err?.response?.data?.title);
        setLoading(false);
      }
    } else {
      setError('Les mots de passe doivent correspondre')
    }
  };

  if (success) {
    return (
      <div style={{ height: '784px', backgroundImage: `url(${background})` }}>
        <Result
          status="success"
          title="Le mot de passe a été changé avec succès"
          style={{ paddingTop: 100 }}
          extra={[
            <Link to="/login" key='loginLink'>
              <Button type="primary" key="login">
                Retour à la page principale
              </Button>
            </Link>,
          ]}
        />
      </div>
    );
  }

  return (
    <div style={{ height: '784px', backgroundImage: `url(${background})` }}>
      <div className={styles.login_form_container}>
        <img src={logo} alt="Logo" className={styles.login_form_logo} />
        <div className={styles.text}>
          <Text style={{color: '#979797'}}>Si vous modifiez votre ancien mot de passe, vous ne pourrez plus l'utiliser.</Text>
        </div>
        <Form name="post_token" onFinish={onFinish}>
          <Form.Item
            key='password'
            name="password"
            rules={[
              {
                required: true,
                message: 'Veuillez saisir votre nouveau mot de passe',
              },
            ]}
            validateStatus={error && 'error'}
            help={error || null}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Nouveau mot de passe"
              disabled={loading}
              style={{color: '#089EB7'}}
            />
          </Form.Item>
          <Form.Item
            key='repeat'
            name="repeat"
            rules={[
              {
                required: true,
                message: 'Veuillez répéter votre nouveau mot de passe',
              },
            ]}
            validateStatus={error && 'error'}
            help={error || null}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Répété le nouveau mot de passe"
              disabled={loading}
              style={{color: '#089EB7'}}
            />
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="login_form-submit"
              disabled={loading}
              block
            >
              Changer
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}

export default RecoverToken;
