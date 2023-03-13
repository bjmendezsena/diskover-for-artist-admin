import React, { useEffect } from 'react';
import { Button, Modal, Form, Input, message } from 'antd';

function EditAdminForm(props: {
  modalTitle: string;
  onConfirm: any;
  confirmLoading: boolean;
  successMessage?: string;
  isVisible: boolean;
  onCancel: any;
  data: any;
}) {
  const {
    modalTitle,
    isVisible,
    onConfirm,
    onCancel,
    confirmLoading,
    successMessage,
    data
  } = props;

  const [form] = Form.useForm();

  useEffect(()=>{
    form.setFieldsValue({
      name: data.name,
      last_name: data.lastName,
      email: data.email,
    })
  }, [data]);
  const onSuccess = (msg: string) => {
    if (msg==="") {
      form.resetFields();
      message.success(successMessage || '¡Hecho!');
    } else {
      message.error(msg || 'Error!');
    }
    onCancel();
  };

  const onOk = () => {
    form
      .validateFields()
      .then((values) => {
        onConfirm({
          id: data.id,
          name: values.name,
          last_name: values.last_name,
          email: values.email,
         }, onSuccess);
      })
      .catch((info) => {
        console.log('Validate Failed:', info);
      });
  };

  return (
    <>
      <Modal
        title={modalTitle}
        visible={isVisible}
        onOk={onOk}
        onCancel={onCancel}
        footer={[
          <Button key="back" onClick={onCancel}>
            Cancelar
          </Button>,
          <Button key="submit" type="primary" onClick={onOk} loading={confirmLoading}>
            Editar
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
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Apellido"
            name="last_name"
            rules={[
              { required: true, message: `Ingrese el apellido del administrador` }
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="E-mail"
            name="email"
            rules={[
              { required: true, message: 'Ingrese un email' },
              { type: 'email', message: 'Debe ingresar un email válido' },
            ]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}

export default EditAdminForm;
