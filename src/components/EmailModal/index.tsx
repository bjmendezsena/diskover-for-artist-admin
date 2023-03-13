import React, { useEffect, useState, useRef } from "react";
import {
    Button,
    Modal,
    message,
    Input
} from "antd";

function EmailModal(props: {
    modalTitle: string;
    isModalVisible: boolean;
    onCancel: any;
    onConfirm: any;
    data: any;
}) {
    const {
        modalTitle,
        isModalVisible,
        onCancel,
        onConfirm,
        data,
    } = props;

    const [email, setEmail] = useState("")

    const onSubmit = (msg?: any) => {
        onCancel();

        console.log("submit!");
        if (msg === "") {
            message.success("¡Hecho!");
        } else {
            message.error(msg);
        }
    };

    const onStrike = () => {
        onConfirm(data.email, onSubmit, "add");
    };
    const removeStrike = () => {
        onConfirm(data.email, onSubmit, "remove");
    };

    const createPaymentRequest = () => {
        onConfirm(email, onSubmit)
    }



    return (
        <>
            <Modal
                title={modalTitle}
                visible={isModalVisible}
                //onOk={handleOk}
                onCancel={onCancel}
                footer={
                    [
                        <Button onClick={createPaymentRequest}>Crear solicitud</Button>
                    ]}
            >

                <div style={{ padding: "1em" }}>
                    Email:<Input onChange={(e) => setEmail(e.target.value)}></Input>
                </div>


            </Modal>
        </>
    );
}

export default EmailModal;
