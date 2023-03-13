import React from "react";
import {
  Button,
  Modal,
  message,
} from "antd";

function UserInfoModalWatch(props: {
  modalTitle: string;
  isModalVisible: boolean;
  onCancel: any;
  onConfirm: any;
  onConfirmVerification: any;
  idSelectedEdit: string;
  data: any;
}) {
  const {
    modalTitle,
    isModalVisible,
    onCancel,
    onConfirm,
    onConfirmVerification,
    data,
  } = props;

  console.log('data: ', data)

  const onSubmit = (msg?: any) => {
    console.log("submit!");
    if (msg == "") {
      message.success("¡Hecho!");
    } else {
      message.error(msg);
    }
    onCancel();
  };
  const onVerificate = () => {
    onConfirmVerification(data.email, onSubmit, "verificate");
  };
  const onStrike = () => {
    onConfirm(data.email, onSubmit, "add");
  };
  const removeStrike = () => {
    onConfirm(data.email, onSubmit, "remove");
  };

  return (
    <>
      <Modal
        title={modalTitle}
        visible={isModalVisible}
        //onOk={handleOk}
        onCancel={onCancel}
        footer={
          [
            data.verifiedAccount === false ? (
              (
                <>
                  <Button key="submitVerification" onClick={onVerificate}>
                    Verificar usuario
                  </Button>
                </>
              )) :
              data.strikes === 0 ? (
                <>
                  <Button key="submit" onClick={onStrike}>
                    Strike!
                  </Button>
                </>
              ) : data.strikes !== 3 ? (
                <>
                  <Button key="remove" onClick={removeStrike}>
                    - Strike
                  </Button>
                  <Button
                    key="submit"
                    onClick={onStrike}
                    danger
                  >
                    + Strike!
                  </Button>
                </>
              ) : (
                <Button key="remove" onClick={removeStrike}>
                  - Strike
                </Button>
              )
          ]}
      >
        <div style={{ width: "80%", padding: "1em", margin: "0 auto" }}>
          <span
            style={{
              fontSize: "14px",
              fontWeight: "bolder",
              fontFamily: "Montserrat",
              lineHeight: "22px",
              color: "rgba(0, 0, 0, 0.65)",
            }}
          >
            PayPal:
            <span
              style={{
                display: "block",
                fontWeight: "lighter",
              }}
            >
              {data.paypal}
            </span>
          </span>
        </div>
        <div style={{ width: "80%", padding: "1em", margin: "0 auto" }}>
          <span
            style={{
              fontSize: "14px",
              fontWeight: "bolder",
              fontFamily: "Montserrat",
              lineHeight: "22px",
              color: "rgba(0, 0, 0, 0.65)",
            }}
          >
            País:
            <span
              style={{
                display: "block",
                fontWeight: "lighter",
              }}
            >
              {data.country}
            </span>
          </span>
        </div>
        <div style={{ width: "80%", padding: "1em", margin: "0 auto" }}>
          <span
            style={{
              fontSize: "14px",
              fontWeight: "bolder",
              fontFamily: "Montserrat",
              lineHeight: "22px",
              color: "rgba(0, 0, 0, 0.65)",
            }}
          >
            Ciudad:
            <span
              style={{
                display: "block",
                fontWeight: "lighter",
              }}
            >
              {data.city}
            </span>
          </span>
        </div>
        <div style={{ width: "80%", padding: "1em", margin: "0 auto" }}>
          <span
            style={{
              fontSize: "14px",
              fontWeight: "bolder",
              fontFamily: "Montserrat",
              lineHeight: "22px",
              color: "rgba(0, 0, 0, 0.65)",
            }}
          >
            Dirección:
            <span
              style={{
                display: "block",
                fontWeight: "lighter",
              }}
            >
              {data.address}
            </span>
          </span>
        </div>
        <div style={{ width: "80%", padding: "1em", margin: "0 auto" }}>
          <span
            style={{
              fontSize: "14px",
              fontWeight: "bolder",
              fontFamily: "Montserrat",
              lineHeight: "22px",
              color: "rgba(0, 0, 0, 0.65)",
            }}
          >
            Código Postal:
            <span
              style={{
                display: "block",
                fontWeight: "lighter",
              }}
            >
              {data.postalCode}
            </span>
          </span>
        </div>
        <div style={{ width: "80%", padding: "1em", margin: "0 auto" }}>
          <span
            style={{
              fontSize: "14px",
              fontWeight: "bolder",
              fontFamily: "Montserrat",
              lineHeight: "22px",
              color: "rgba(0, 0, 0, 0.65)",
            }}
          >
            Teléfono:
            <span
              style={{
                display: "block",
                fontWeight: "lighter",
              }}
            >
              {data.phone}
            </span>
          </span>
        </div>
        <div style={{ width: "80%", padding: "1em", margin: "0 auto" }}>
          <span
            style={{
              fontSize: "14px",
              fontWeight: "bolder",
              fontFamily: "Montserrat",
              lineHeight: "22px",
              color: "rgba(0, 0, 0, 0.65)",
            }}
          >
            Contrato:
            <span
              style={{
                display: "block",
                fontWeight: "lighter",
              }}
            >
              {data.contractUrl}
            </span>
          </span>
        </div>
        {data.strikes === 3 && (
          <div
            style={{
              width: "80%",
              padding: "1em",
              margin: "0 auto",
              borderRadius: "4px",
              backgroundColor: "#ffb4a8",
            }}
          >
            <span
              style={{
                fontSize: "14px",
                fontWeight: "bolder",
                fontFamily: "Montserrat",
                lineHeight: "22px",
                color: "rgba(0, 0, 0, 0.65)",
              }}
            >
              Fecha de eliminación:
              <span
                style={{
                  display: "block",
                  fontWeight: "lighter",
                }}
              >
                {data.delete_date ? data.delete_date.replace(/\s+/g, '/') : <></>}
              </span>
            </span>
          </div>
        )}
      </Modal>
    </>
  );
}

export default UserInfoModalWatch;
