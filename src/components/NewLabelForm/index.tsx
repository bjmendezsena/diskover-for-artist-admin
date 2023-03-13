import React, { useEffect, useState } from 'react';
import { Button, Modal, Form, Input, message } from 'antd';
import { useSelector } from 'react-redux';

function NewLabelForm(props: {
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
  const { labelError } = useSelector((state: any) => state.users);
  const openModal = () => setVisible(true);
  const onCancel = () => setVisible(false);

  useEffect(() => {
    form.setFieldsValue({ label_percent: "25" })
  })
  const onSuccess = (msg: string) => {
    if (msg === "") {
      setVisible(false);
      form.resetFields();
      message.success(successMessage || '¡Hecho!');
    } else {
      message.error(msg || 'Error!');
    }
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
            label="ID"
            name="label_id"
            validateStatus={labelError && 'error'}
            rules={[
              { required: true, message: 'Es necesario que ingreses un label id válido' },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Name"
            name="label_name"
            validateStatus={labelError && 'error'}
            rules={[
              { required: true, message: `Debes ingresar el label name relacionado al label id` },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Email de registro"
            name="label_email"
            validateStatus={labelError && 'error'}
            rules={[
              { required: true, message: 'Ingresa el email del usuario que solicitó cuenta de artista en Diskover' },
            ]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}

export default NewLabelForm;
