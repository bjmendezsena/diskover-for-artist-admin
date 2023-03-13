import React, { useEffect, useState } from "react";
import { Button, Modal, Input, Select, Typography, Row } from "antd";
import { USER_APPLICATION_STATUS } from "../../constants/constants";
import { BASE_URL } from "../../helpers/api";
import { useDispatch, useSelector } from "react-redux";
import { doResendContract } from "redux/applications/actions";

const { Link } = Typography;
const { TextArea } = Input;

function UserApplicationModal(props: {
  modalTitle: string;
  isModalVisible: boolean;
  onCancel: any;
  onReject: (id: string, reason: string) => void;
  onConfirm: any;
  idSelectedEdit: string;
  data: any;
  aproveApplication: (id: string) => void;
  approveAccount: (id: string, data: any) => void;
}) {
  const dispatch = useDispatch();

  const { sendContractLoading } = useSelector(
    (state: any) => state.applications
  );
  const {
    modalTitle,
    isModalVisible,
    onCancel,
    onReject,
    data,
    aproveApplication,
    approveAccount,
  } = props;

  const [showRejectReasonInput, setShowRejectReasonInput] = useState(false);

  const { Option } = Select;

  const [accountType, setAccountType] = useState("");
  const [rejectReason, setRejectReason] = useState("");

  const [labelId, setLabelId] = useState("");

  const [isSelectEnabled, setIsSelectEnabled] = useState(false);

  const onAccountTypeChange = (e: any) => {
    setAccountType(e);
  };

  const changeAccountType = () => {
    setIsSelectEnabled((prevValue) => !prevValue);
  };

  const saveAccountType = () => {
    data.accountType = accountType;
    setIsSelectEnabled((prevValue) => !prevValue);
  };

  const aproveUserApplication = () => {
    aproveApplication(data._id);
  };

  useEffect(() => {
    const { labelId = null } = data;
    if (labelId) {
      setLabelId(labelId);
    }
  }, [data]);

  let option;
  option = !isSelectEnabled ? (
    <Button onClick={changeAccountType}>Cambiar tipo de cuenta</Button>
  ) : (
    <Button onClick={saveAccountType}>Guardar</Button>
  );

  const onClickRejectButton = () => {
    setShowRejectReasonInput(true);
  };

  const onConfirmReject = () => {
    hideShowRejectReasonInput();
    onReject(data._id, rejectReason);
  };

  const hideShowRejectReasonInput = () => {
    setShowRejectReasonInput(false);
  };

  const aproveInvitationDisabled =
    data?.status !== USER_APPLICATION_STATUS.REQUESTED;

  const inputDisabled = data?.status !== USER_APPLICATION_STATUS.SIGNED;
  const acceptAccountDisabled = inputDisabled || labelId === "";

  const rejectedDisabled =
    data?.status !== USER_APPLICATION_STATUS.PENDING &&
    data?.status !== USER_APPLICATION_STATUS.REQUESTED;

  const hasContract =
    data?.status !== USER_APPLICATION_STATUS.PENDING &&
    data?.status !== USER_APPLICATION_STATUS.REQUESTED &&
    data?.status !== USER_APPLICATION_STATUS.REJECTED;

  const hasContractSigned =
    hasContract && (data?.contractUrl || data?.contractId);

  return (
    <>
      <Modal
        title={modalTitle}
        visible={isModalVisible}
        //onOk={handleOk}
        onCancel={onCancel}
        width='800px'
        footer={
          <Row>
            <Button
              danger
              disabled={rejectedDisabled}
              onClick={onClickRejectButton}
            >
              Rechazar
            </Button>
            <Button
              disabled={aproveInvitationDisabled}
              onClick={aproveUserApplication}
            >
              Aprobar petición
            </Button>
            <Button
              disabled={acceptAccountDisabled}
              onClick={() =>
                approveAccount(data._id, {
                  labelId,
                })
              }
            >
              Activar cuenta
            </Button>
            <Button
              disabled={!hasContract}
              onClick={() =>
                hasContract && dispatch(doResendContract(data.contractId))
              }
              loading={sendContractLoading}
            >
              Reenviar contrato
            </Button>
          </Row>
        }
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
            Tipo de cuenta:
            <span
              style={{
                display: "block",
                fontWeight: "lighter",
              }}
            >
              <Select
                defaultValue={data.accountType}
                onChange={onAccountTypeChange}
                disabled={!isSelectEnabled}
              >
                <Option value='starter'>Starter</Option>
                <Option value='pro'>Pro</Option>
                <Option value='local'>Local</Option>
              </Select>
              {/* {data.accountType} */}
              {option}
              {/* <Button onClick={changeAccountType}>Cambiar tipo de cuenta</Button> */}
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
            {data?.audioUrl && (
              <span
                style={{
                  display: "block",
                  fontWeight: "normal",
                }}
              >
                <Link target='_blank' href={data.audioUrl} rel='noreferrer'>
                  Escuchar audio
                </Link>
              </span>
            )}
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
            Estado:
            <span
              style={{
                display: "block",
                fontWeight: "lighter",
              }}
            >
              {data.status}
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
            Label:
            <span
              style={{
                display: "block",
                fontWeight: "lighter",
              }}
            >
              {data.label}
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
            Label ID:
            <span
              style={{
                display: "block",
                fontWeight: "lighter",
              }}
            >
              <Input
                name='label'
                onChange={(e) => setLabelId(e.target.value)}
                value={labelId}
                disabled={inputDisabled}
              ></Input>
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
            Nombre completo:
            <span
              style={{
                display: "block",
                fontWeight: "lighter",
              }}
            >
              {data.name}
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
            Email:
            <span
              style={{
                display: "block",
                fontWeight: "lighter",
              }}
            >
              {data.email}
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
            ¿Controlas los derechos de la música que vas a distribuir?
            <span
              style={{
                display: "block",
                fontWeight: "lighter",
              }}
            >
              {data.rightsHolder ? "Sí" : "No"}
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
            Si tu respuesta es Si, cuál es tu distribuidor actual?
            <span
              style={{
                display: "block",
                fontWeight: "lighter",
              }}
            >
              {data.currentDistributor ? data.currentDistributor : ""}
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
            ¿Como nos has conocido?
            <span
              style={{
                display: "block",
                fontWeight: "lighter",
              }}
            >
              {data.contactSource ? data.contactSource : ""}
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
            ¿Qué servicios adicionales le interesa utilizar en Diskover Co.?
            <span
              style={{
                display: "block",
                fontWeight: "normal",
              }}
            >
              <div>
                Distribucion de videos musicales:
                {data.videosDistribution ? "Sí" : "No"}
              </div>
              <div>
                Publishing administration:
                {data.publishingAdministration ? "Sí" : "No"}
              </div>
              <div>Ninguno:{data.none ? "Sí" : "No"}</div>
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
            Acepto recibir comunicaciones relacionadas con mi solicitud,
            productos, servicios o información general sobre Diskover Co.
            <span
              style={{
                display: "block",
                fontWeight: "normal",
              }}
            >
              <div>{data.wantNews ? "Sí" : "No"}</div>
            </span>
          </span>
        </div>
        <div style={{ width: "80%", padding: "1em", margin: "0 auto" }}>
          {hasContractSigned && (
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
                  fontWeight: "normal",
                }}
              >
                <div>
                  {/* <Button>Subir</Button> */}

                  <Button
                    onClick={() => {
                      //http://localhost:9005/api/uploads/contracts/aa929e15-764b-41fa-8c4f-a0555d256a61.pdf
                      window.open(
                        data.contractUrl
                          ? data.contractUrl
                          : `${BASE_URL}/api/uploads/contracts/${data.contractId}.pdf`,
                        "_blank"
                      );
                    }}
                  >
                    Ver contrato
                  </Button>
                </div>
              </span>
            </span>
          )}
        </div>
      </Modal>
      <Modal
        title='Indique el motivio'
        visible={showRejectReasonInput}
        onOk={onConfirmReject}
        onCancel={hideShowRejectReasonInput}
        okButtonProps={{ disabled: rejectReason.length === 0 }}
      >
        <TextArea onChange={(e) => setRejectReason(e.target.value)} />
      </Modal>
    </>
  );
}

export default UserApplicationModal;
