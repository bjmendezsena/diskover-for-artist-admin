import React, { useState } from "react";
import { Button, Modal, message } from "antd";
import PropTypes from 'prop-types'
import ReactLoading from 'react-loading';


export default ModalPaypalConfirm;

function ModalPaypalConfirm(
    props: {
        isLoading: boolean;
        paymentResponse: any;
        isPaymentResponse: boolean;
        isBtnBlocked: boolean;
        modalTitle: string;
        isModalVisible: boolean;
        onCancel: any;
        onConfirm: any;
        data: { alert: string; rows: Array<string> };
    }) {
    const {
        isLoading,
        paymentResponse,
        isPaymentResponse,
        isBtnBlocked,
        modalTitle = "asda",
        isModalVisible,
        onCancel,
        onConfirm,
        data,
    } = props;



    const [isModalConfirmVisible, setIsModalConfirmVisible] = useState(true);


    const onSuccess = (msg: string) => {
        if (msg === "") {
            message.success("¡Hecho!");
        } else {
            message.error(msg || "Error!");
        }
        onCancel();
    };

    const confirm = () => {
        onConfirm(onSuccess);
    };


    if (!isPaymentResponse) {

        let imgComp;
        if (!isLoading) {
            imgComp = <img
                src="https://d31dn7nfpuwjnm.cloudfront.net/images/valoraciones/0035/2279/Como_comprar_con_Paypal_en_Argentina.png?1569325779"
                alt="new"
                width="200" height="100"
            />
        }
        else {
            imgComp = <ReactLoading type={"bubbles"} color={"#0000FF"} height={200} width={200} />
        }

        return (
            <>
                <Modal
                    title={modalTitle}
                    visible={isModalVisible}
                    onOk={confirm}
                    onCancel={onCancel}
                    footer={[
                        <Button key="submit" onClick={confirm} disabled={isBtnBlocked}>
                            Confirmar
                        </Button>,
                    ]}
                >
                    <div style={{ display: "flex", justifyContent: "center" }}>
                        {imgComp}
                    </div>

                    <div style={{ width: "100%", padding: "1em" }}>
                        <span
                            style={{
                                textAlign: "center",
                                fontSize: "16px",
                                fontWeight: "bolder",
                                fontFamily: "Montserrat",
                                lineHeight: "22px",
                                color: "#1FC1E5",
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
                                    textAlign: "center",
                                    fontSize: "16px",
                                    fontWeight: "normal",
                                    display: "block",
                                    fontFamily: "Montserrat",
                                    lineHeight: "15px",
                                    marginBottom: "15px",
                                    color: "rgba(0, 0, 0, 0.85)",
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
    else {
        const result = paymentResponse.ok;
        const resultMsg = paymentResponse.msg;
        let title;
        let img;
        title = result ? "Pago exitoso" : "Uups!"
        img = result ? "http://i.imgur.com/i7379jf.png" : "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cc/Cross_red_circle.svg/1024px-Cross_red_circle.svg.png"
        return (
            <>
                <Modal
                    title={title}
                    visible={isModalVisible}
                    onOk={confirm}
                    onCancel={onCancel}
                    footer={[
                        <Button key="submit" onClick={onCancel} disabled={isBtnBlocked}>
                            Cerrar
                        </Button>,
                    ]}
                >
                    <div style={{ textAlign: "center" }}>
                        <img
                            src={img}
                            alt="new"
                            width="200" height="200"
                        />
                    </div>

                    <div style={{ width: "100%", padding: "1em" }}>
                        <span
                            style={{
                                textAlign: "center",
                                fontSize: "16px",
                                fontWeight: "bolder",
                                fontFamily: "Montserrat",
                                lineHeight: "22px",
                                color: "#000000",
                                display: "block",
                            }}
                        >
                            {resultMsg}
                        </span>
                    </div>
                    {data.rows.map((row: string, i: number) => {
                        return (
                            <span
                                key={i.toString()}
                                style={{
                                    textAlign: "center",
                                    fontSize: "16px",
                                    fontWeight: "normal",
                                    display: "block",
                                    fontFamily: "Montserrat",
                                    lineHeight: "15px",
                                    marginBottom: "15px",
                                    color: "rgba(0, 0, 0, 0.85)",
                                }}
                            >
                                {row}
                            </span>
                        );
                    })}
                </Modal>
            </>

        )
    }
}

