import React, { useEffect } from "react";
import { Button, Modal, Form, Input, message } from "antd";
import { useSelector } from "react-redux";

function ManualRoyaltyModal(props: {
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
    data,
  } = props;

  const [form] = Form.useForm();
  const { labelError } = useSelector((state: any) => state.users);

  const onSuccess = (msg: string) => {
    if (msg === "") {
      form.resetFields();
      message.success(successMessage || "¡Hecho!");
    } else {
      message.error(msg || "Error!");
    }
    onCancel();
  };

  const onOk = () => {
    form
      .validateFields()
      .then((values) => {
        onConfirm({ isrc: values.isrc, id: data.id }, onSuccess);
      })
      .catch((info) => {
        console.log("Validate Failed:", info);
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
          <Button
            key="submit"
            type="primary"
            onClick={onOk}
            loading={confirmLoading}
          >
            Subir
          </Button>,
        ]}
      >
        <Form layout="vertical" form={form}>
          <span>
            <b>Plataforma</b>
          </span>
          <br></br>
          <span>{data.platform}</span>
          <hr></hr>
          <span>
            <b>Artista</b>
          </span>
          <br></br>
          <span>{data.artist_name}</span>
          <hr></hr>
          <span>
            <b>Album/Release</b>
          </span>
          <br></br>
          <span>{data.album_name}</span>
          <hr></hr>
          <span>
            <b>Track</b>
          </span>
          <br></br>
          <span>{data.track_title}</span>
          <hr></hr>
          <span>
            <b>Monto</b>
          </span>
          <br></br>
          <span>{data.payable}</span>
          <hr></hr>
          <span>
            <b>ISRC</b>
          </span>
          <Form.Item label="ISRC" name="isrc">
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}

export default ManualRoyaltyModal;
