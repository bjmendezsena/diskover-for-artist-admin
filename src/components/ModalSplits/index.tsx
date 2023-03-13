import React, { useEffect, useState, useRef } from "react";
import {
    Button,
    Modal,
    message,
    Input,
    Table
} from "antd";

function ModalSplits(props: {
    modalTitle: string;
    isModalVisible: boolean;
    onCancel: any;
    onConfirm: any;
    data: any;
    invoice: any;
}) {
    const {
        modalTitle,
        isModalVisible,
        onCancel,
        onConfirm,
        data,
        invoice
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

    console.log("invoice");

    console.log(invoice);



    return (
        <>
            <Modal
                title={modalTitle}
                visible={isModalVisible}
                //onOk={handleOk}
                onCancel={onCancel}
                footer={
                    [
                        <Button onClick={() => {
                            onCancel()
                        }}>Cerrar</Button>
                    ]}
            >


                <Table
                    dataSource={data}
                    columns={[
                        {
                            title: "paypal",
                            dataIndex: "paypalInvitated",
                            key: "email_for_requests",
                            fixed: "left",
                            width: 200,
                        },
                        {
                            title: "amount",
                            dataIndex: "amount",
                            key: "email_for_requests",
                            fixed: "left",
                            width: 200,
                            render: (data: any, record: any) => {
                                return <>
                                    {(Number(data) * (1 - Number("0." + invoice.diskover_percent))).toFixed(2)}
                                    {/* {invoice} */}
                                </>
                            }
                        },
                    ]}
                >


                </Table>


            </Modal>
        </>
    );
}

export default ModalSplits;
