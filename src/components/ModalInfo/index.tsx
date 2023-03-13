import React from "react";
import { Button, Modal, message } from "antd";

function ModalInfo(props: {
  modalTitle: string;
  isModalVisible: boolean;
  onCancel: any;
  onConfirm: any;
  data: { alert: string; rows: Array<string> };
}) {
  const {
    modalTitle,
    isModalVisible,
    onCancel,
    data,
  } = props;

  return (
    <>
      <Modal
        title={modalTitle}
        visible={isModalVisible}
        onCancel={onCancel}
        footer={[
          <Button key="back" onClick={onCancel}>
            Entendido
          </Button>,
        ]}
      >
        <div style={{ width: "100%", padding: "1em" }}>
          <span
            style={{
              textAlign: "center",
              fontSize: "16px",
              fontWeight: "bolder",
              fontFamily: "Montserrat",
              lineHeight: "22px",
              color: "#7d0800",
              display: "block",
            }}
          >
            {data.alert}
          </span>
        </div>
        {data.rows.map((row: string, i: number) => {
          return (
            <span
              key={i.toString()}
              style={{
                fontSize: "14px",
                fontWeight: "normal",
                display: "block",
                fontFamily: "Montserrat",
                lineHeight: "15px",
                marginBottom: "15px",
                color: "rgba(2, 2, 2, 0.85)",
              }}
            >
              {row}
            </span>
          );
        })}
      </Modal>
    </>
  );
}

export default ModalInfo;
