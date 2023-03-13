import React, { useEffect, useState } from "react";
import { Button, Modal, message, Select, Row, Col } from "antd";
import PropTypes from 'prop-types'

const { Option } = Select;


function DateSelectorModal(
    props: {
        modalTitle: string;
        isModalVisible: boolean;
        onCancel: any;
        onConfirm: any;
    }) {
    const {
        modalTitle,
        isModalVisible,
        onCancel,
        onConfirm,
    } = props;

    console.log("ASD");

    const [selected, setSelected] = useState({
        fromMonth: "1",
        toMonth: "1",
        fromYear: "2021",
        toYear: "2021"
    })


    const onSuccess = (msg: string) => {
        if (msg === "") {
            message.success("¡Hecho!");
        } else {
            message.error(msg || "Error!");
        }
        onCancel();
    };

    const confirm = () => {
        onConfirm(selected, onSuccess);
    };

    function setFromMonth(value: string) {
        selected.fromMonth = value
    }

    function setToMonth(value: string) {
        console.log(`selected ${value}`);
        selected.toMonth = value

    }

    function setFromYear(value: string) {
        console.log(`selected ${value}`);
        selected.fromYear = value

    }

    function setToYear(value: string) {
        console.log(`selected ${value}`);
        selected.toYear = value
    }




    return (
        <>
            <Modal
                title={modalTitle}
                visible={isModalVisible}
                onOk={confirm}
                onCancel={onCancel}
                footer={[
                    <Button key="back" onClick={onCancel} danger>
                        Cancelar
                    </Button>,
                    <Button key="submit" onClick={confirm}>
                        Descargar
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
                    </span>
                    <Row justify="start">
                        <Col>
                            <Row>
                                Desde:
                            </Row>
                            <Row>
                                Mes:
                            </Row>
                            <Row>
                                <Select defaultValue="1" style={{ width: 50 }} onChange={setFromMonth}>
                                    <Option value="1">1</Option>
                                    <Option value="2">2</Option>
                                    <Option value="3">3</Option>
                                    <Option value="4">4</Option>
                                    <Option value="5">5</Option>
                                    <Option value="6">6</Option>
                                    <Option value="7">7</Option>
                                    <Option value="8">8</Option>
                                    <Option value="9">9</Option>
                                    <Option value="10">10</Option>
                                    <Option value="11">11</Option>
                                    <Option value="12">12</Option>
                                </Select>
                            </Row>
                        </Col>
                        <Col>
                            <Row>
                                .
                            </Row>
                            <Row>
                                Año:
                            </Row>
                            <Row>
                                <Select defaultValue="2021" style={{ width: 100 }} onChange={setFromYear}>
                                    <Option value="2020">2020</Option>
                                    <Option value="2021">2021</Option>
                                    <Option value="2022">2022</Option>
                                </Select>
                            </Row>
                        </Col>
                    </Row>
                    <Row justify="start">
                        <Col>
                            <Row>
                                Hasta:
                            </Row>
                            <Row>
                                Mes:
                            </Row>
                            <Row>
                                <Select defaultValue="1" style={{ width: 50 }} onChange={setToMonth}>
                                    <Option value="1">1</Option>
                                    <Option value="2">2</Option>
                                    <Option value="3">3</Option>
                                    <Option value="4">4</Option>
                                    <Option value="5">5</Option>
                                    <Option value="6">6</Option>
                                    <Option value="7">7</Option>
                                    <Option value="8">8</Option>
                                    <Option value="9">9</Option>
                                    <Option value="10">10</Option>
                                    <Option value="11">11</Option>
                                    <Option value="12">12</Option>
                                </Select>
                            </Row>
                        </Col>
                        <Col>
                            <Row>
                                .
                            </Row>
                            <Row>
                                Año:
                            </Row>
                            <Row>
                                <Select defaultValue="2021" style={{ width: 100 }} onChange={setToYear}>
                                    <Option value="2020">2020</Option>
                                    <Option value="2021">2021</Option>
                                    <Option value="2022">2022</Option>
                                </Select>
                            </Row>
                        </Col>
                    </Row>


                </div>
            </Modal>
        </>
    );
}


export default DateSelectorModal;
