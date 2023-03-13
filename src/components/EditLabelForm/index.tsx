import React, { useEffect } from 'react';
import { Button, Modal, Form, Input, message } from 'antd';
import { useSelector } from 'react-redux';

function EditLabelForm(props: {
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
  const { labelError } = useSelector((state: any) => state.users);

  useEffect(()=>{
    form.setFieldsValue({
      label_id: data.id,
      label_name: data.name,
      label_email: data.email
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
        onConfirm(values, onSuccess);
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

export default EditLabelForm;
