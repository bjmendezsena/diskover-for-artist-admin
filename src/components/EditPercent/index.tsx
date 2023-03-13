import React, { useEffect } from 'react';
import { Button, Modal, Form, Input, message } from 'antd';
import { useSelector } from 'react-redux';

function EditPercent(props: {
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
      percent: data.percent
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
        values.email = data.email;
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
            label="Comisión"
            name="percent"
            validateStatus={labelError && 'error'}
            rules={[
              { required: true, message: 'Es necesario que ingreses un valor' },
            ]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}

export default EditPercent;
