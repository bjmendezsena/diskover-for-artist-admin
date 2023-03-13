import React from "react";
import {
    Button,
    Modal,
    message,
} from "antd";

function UserInfoPaymentsModal(props: {
    modalTitle: string;
    isModalVisible: boolean;
    onCancel: any;
    data: any;
}) {
    const {
        modalTitle,
        isModalVisible,
        onCancel,
        data,
    } = props;


    console.log(data);


    return (
        <>
            <Modal
                title={modalTitle}
                visible={isModalVisible}
                onCancel={onCancel}
                footer={[
                    <Button key="back" onClick={onCancel}>
                        Cerrar
                    </Button>,
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
                        Nombre completo:
                        <span
                            style={{
                                display: "block",
                                fontWeight: "lighter",
                            }}
                        >
                            {data?.fullName}
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
                        Documento:
                        <span
                            style={{
                                display: "block",
                                fontWeight: "lighter",
                            }}
                        >
                            {data?.documentNumber}
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
                            {data?.email}
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
                        PayPal:
                        <span
                            style={{
                                display: "block",
                                fontWeight: "lighter",
                            }}
                        >
                            {data?.contactInfo?.paypal}
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
                            {data?.country}
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
                            {data?.contactInfo?.city}
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
                            {data?.contactInfo?.address}
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
                            {data?.contactInfo?.postalCode}
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
                            {data?.contactInfo?.phone}
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
                            {data?.contractUrl}
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
                                {data.delete_date.replace(/\s+/g, '/')}
                            </span>
                        </span>
                    </div>
                )}
            </Modal>
        </>
    );
}

export default UserInfoPaymentsModal;
