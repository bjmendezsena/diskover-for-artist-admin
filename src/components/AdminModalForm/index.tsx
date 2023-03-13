import React, { useState } from 'react';
import { Button, Modal, Form, Input, message } from 'antd';
import { useSelector } from 'react-redux';

function AdminModalForm(props: {
  modalTitle: string;
  openButtonText: string;
  onConfirm: any;
  confirmLoading: boolean;
  successMessage?: string;
}) {
  const {
    modalTitle,
    openButtonText,
    onConfirm,
    confirmLoading,
    successMessage,
  } = props;

  const [visible, setVisible] = useState(false);
  const [form] = Form.useForm();
  const { logUpAdminError } = useSelector((state: any) => state.auth);

  const openModal = () => setVisible(true);
  const onCancel = () => setVisible(false);

  const onSuccess = () => {
    setVisible(false);
    form.resetFields();
    message.success(successMessage || 'Succès');
  };

  const onOk = () => {
    form
      .validateFields()
      .then((values) => {
        onConfirm(values, onSuccess);
      })
      .catch((info) => {
        console.log('Validate Failed:', info);
      });
  };

  return (
    <>
      <Button
        onClick={openModal}
        style={{
          width: '97px',
          height: '40px',
          backgroundColor: 'white',
          borderRadius: '4px',
          position: 'absolute',
          right: '1.6%',
        }}>
        + {openButtonText}
      </Button>
      <Modal
        title={modalTitle}
        visible={visible}
        onOk={onOk}
        onCancel={onCancel}
        confirmLoading={confirmLoading}
        footer={[
          <Button key="back" onClick={onCancel}>
            Cancelar
          </Button>,
          <Button key="submit" type="primary" onClick={onOk}>
            Crear
          </Button>,
        ]}
      >
        <Form layout="vertical" form={form}>
          <Form.Item
            label="Nombre"
            name="name"
            rules={[
              { required: true, message: `Ingrese el nombre del administrador` }
            ]}
            validateStatus={logUpAdminError && 'error'}
            help={logUpAdminError || null}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Apellido"
            name="last_name"
            rules={[
              { required: true, message: `Ingrese el apellido del administrador` }
            ]}
            validateStatus={logUpAdminError && 'error'}
            help={logUpAdminError || null}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="E-mail"
            name="email"
            validateStatus={logUpAdminError && 'error'}
            rules={[
              { required: true, message: 'Ingrese un email' },
              { type: 'email', message: 'Debe ingresar un email válido' },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Contraseña"
            name="password"
            validateStatus={logUpAdminError && 'error'}
            rules={[
              { required: true, message: `Ingrese una contraseña` },
            ]}
          >
            <Input type="password" />
          </Form.Item>

          <Form.Item
            label="Confirme la contraseña"
            name="repeat"
            validateStatus={logUpAdminError && 'error'}
            rules={[
              { required: true, message: 'Debe volver a ingresar la contraseña' },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                  }

                  return Promise.reject(new Error('Las contraseñas no coinciden'));
                },
              }),
            ]}
          >
            <Input type="password" />
          </Form.Item>

        </Form>
      </Modal>
    </>
  );
}

export default AdminModalForm;
